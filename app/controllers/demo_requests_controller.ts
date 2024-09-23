import type { HttpContext } from '@adonisjs/core/http'
import DemoRequest from '#models/demo_request'
import { storeDemoRequestsValidator } from '#validators/demo_request'
import mail from '@adonisjs/mail/services/main'
import logger from '@adonisjs/core/services/logger'

export default class DemoRequestsController {
  async store({ request, response, session, i18n }: HttpContext) {
    try {
      const payload = await request.validateUsing(storeDemoRequestsValidator)
      const { telephoneCode, phoneNumber } = payload

      await DemoRequest.create({ telephoneCode, phoneNumber })

      await mail.send((message) => {
        message
          .to('ugo@ac-concepts.com')
          .from('hippotypose@corona-formation.fr')
          .subject('Nouvelle demande de démonstration Hippotypose')
          .html(this.generateEmailContent(telephoneCode, phoneNumber))
      })

      session.flash('success', i18n.t('flash.demo-requests.store.success'))

      return response.redirect().back()
    } catch (error) {
      logger.error('Erreur dans la méthode store:', error)
      
      session.flash('error', i18n.t('flash.demo-requests.store.error'))
      
      return response.redirect().back()
    }
  }

  private generateEmailContent(telephoneCode: string, phoneNumber: string): string {
    return `
      <html>
      <head>
        <meta charset="utf-8">
        <style type="text/css">
          body, p, div { font-family: Arial, sans-serif; font-size: 14px; }
          body { color: #727272; }
          .highlight { background-color: #f1c40f; padding: 5px; }
          .button { background-color: #0EAAE8; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f6f6f6;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="padding: 20px 0 30px 0;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
                <tr>
                  <td align="center" bgcolor="#1A3B6F" style="padding: 40px 0 30px 0; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
                    Nouvelle demande de démonstration Hippotypose
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 20px 0 30px 0; color: #727272; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                          Bonjour,<br><br>
                          Une nouvelle demande de démonstration a été reçue pour Hippotypose.<br><br>
                          Numéro de téléphone du demandeur : <span class="highlight">${telephoneCode}${phoneNumber}</span><br><br>
                          Veuillez contacter cette personne dans les plus brefs délais pour organiser une démonstration de notre solution.
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="padding: 20px 0 30px 0;">
                          <a href="tel:${telephoneCode}${phoneNumber}" class="button" style="font-family: Arial, sans-serif; font-size: 16px; font-weight: bold;">Appeler maintenant</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#1A3B6F" style="padding: 30px 30px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;">
                          Cordialement,<br>
                          L'équipe Hippotypose
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  }
}