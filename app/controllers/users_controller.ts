import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginUsers, storeUsers } from '#validators/user'
import logger from '@adonisjs/core/services/logger'

export default class UsersController {

  async loginPage({ view }: HttpContext) {
    return view.render('pages/login')
  }
  
  async registerPage({ view }: HttpContext) {
    return view.render('pages/register')
  }

  async login({ request, auth, response, session, i18n }: HttpContext) {
    try{
      const payload = await request.validateUsing(loginUsers)
      const { email, password } = payload

      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user)

      session.flash('success', i18n.t('flash.users.login.success'))

      response.redirect('/')
    } catch(error) {
      logger.error(`Une erreur est survenu lors de la connexion`, error)
      session.flash('error', i18n.t('flash.users.login.error'))

      response.redirect().back()
    }
  }
  
  async store({ request, auth, response, session, i18n }: HttpContext) {
    try{
      const payload = await request.validateUsing(storeUsers)
      const { fullName, email, password } = payload

      const user = await User.create({
        fullName: fullName,
        email: email,
        password: password
      })

      await auth.use('web').login(user)

      session.flash('success', i18n.t('flash.users.store.success'))
      
      response.redirect().back()
    } catch(error) {
      logger.error(`Une erreur est survenu lors de la création du compte:`, error)
      session.flash('error', i18n.t('flash.users.store.error'))

      response.redirect().back()
    }
  }
  
  async edit({}: HttpContext) {}
  
  async update({}: HttpContext) {}
  
}