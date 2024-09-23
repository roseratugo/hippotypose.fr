import { I18n } from '@adonisjs/i18n'
import i18nManager from '@adonisjs/i18n/services/main'
import type { NextFn } from '@adonisjs/core/types/http'
import { type HttpContext, RequestValidator } from '@adonisjs/core/http'

export default class DetectUserLocaleMiddleware {
  static {
    RequestValidator.messagesProvider = (ctx) => {
      return ctx.i18n.createMessagesProvider()
    }
  }

  protected getRequestLocale(ctx: HttpContext) {
    // Priorité : 1. Session, 2. Cookie, 3. Accept-Language header, 4. Default locale
    const sessionLocale = ctx.session.get('locale')
    const cookieLocale = ctx.request.cookie('locale')
    const headerLocale = i18nManager.getSupportedLocaleFor(ctx.request.languages())

    return sessionLocale || cookieLocale || headerLocale || i18nManager.defaultLocale
  }

  async handle(ctx: HttpContext, next: NextFn) {
    const locale = this.getRequestLocale(ctx)

    ctx.i18n = i18nManager.locale(locale)
    ctx.containerResolver.bindValue(I18n, ctx.i18n)

    // Persister la locale dans la session et le cookie
    ctx.session.put('locale', locale)
    ctx.response.cookie('locale', locale, {
      httpOnly: true,
      sameSite: true,
      maxAge: 365 * 24 * 60 * 60 // 1 year
    })

    if ('view' in ctx) {
      ctx.view.share({ i18n: ctx.i18n })
    }

    return next()
  }
}

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    i18n: I18n
  }
}