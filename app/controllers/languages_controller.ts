import { HttpContext } from '@adonisjs/core/http'
import i18nManager from '@adonisjs/i18n/services/main'

export default class LanguageController {
  public async switchLanguage({ request, response, session, i18n }: HttpContext) {
    const locale = request.input('locale')
    const supportedLocales = i18nManager.supportedLocales()

    if (supportedLocales.includes(locale)) {
      i18n.switchLocale(locale)
      session.put('locale', locale)
      response.cookie('locale', locale, {
        httpOnly: true,
        sameSite: true,
        maxAge: 365 * 24 * 60 * 60 // 1 year
      })
      
    } else {
      session.flash('error', i18n.t('flash.languages-error'))
    }
    
    return response.redirect().back()
  }
}