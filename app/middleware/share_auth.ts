import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ShareAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    // Assurez-vous que l'authentification est initialisée
    await ctx.auth.check()

    const user = ctx.auth.user

    if (ctx.view) {
      ctx.view.share({
        auth: {
          user: user
            ? {
                id: user.id,
                name: user.fullName,
                email: user.email,
              }
            : null,
        },
      })
    } else {
    }

    await next()
  }
}
