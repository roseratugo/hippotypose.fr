import type { HttpContext } from '@adonisjs/core/http'
import { storeDemonstration } from '#validators/demonstration'
import mail from '@adonisjs/mail/services/main'
import logger from '@adonisjs/core/services/logger'

export default class DemonstrationsController {
  async store({ request, response, session, i18n }: HttpContext) {
    try {
        const payload = await request.validateUsing(storeDemonstration)
        const { nom, prenom, status, email, telephone, disponibility } = payload

        await mail.send((message) => {
            message
                .to('ugo@ac-concepts.com')
                .from('hippotypose@corona-formation.fr')
                .replyTo(email)
                .subject('Nouvelle demande de démonstration')
                .html(this.generateEmailContent({ nom, prenom, status, email, telephone, disponibility }))
        })

        session.flash('success', i18n.t('flash.demonstration.store.success'))

        return response.redirect().back()
    } catch (error) {
        logger.error('Erreur lors de l\'envoi de la demande de démonstration:', error)

        session.flash('error', i18n.t('flash.demonstration.store.error'))
    }
  }

  private generateEmailContent(data: {
    nom: string,
    prenom: string,
    status: string,
    email: string,
    telephone: string | null,
    disponibility: string
  }): string {
    return `
    <html>
      <head>
        <meta charset="utf-8">
        <style type="text/css">
          body, p, div { font-family: Arial, sans-serif; font-size: 14px; }
          body { color: #727272; }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f6f6f6;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="padding: 20px 0 30px 0;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; border: 1px solid #cccccc;">
                <tr>
                  <td align="center" bgcolor="#1A3B6F" style="padding: 40px 0 30px 0; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
                    Nouvelle demande de demonstration Hippotypose
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 20px 0 30px 0; color: #727272; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                          <p><strong>Nom :</strong> ${data.nom}</p>
                          <p><strong>Prénom :</strong> ${data.prenom}</p>
                          <p><strong>Status :</strong> ${data.status}</p>
                          <p><strong>Email :</strong> ${data.email}</p>
                          <p><strong>Téléphone :</strong> ${data.telephone || 'Non renseigné'}</p>
                          <p><strong>Disponibilités :</strong></p>
                          <p>${data.disponibility}</p>
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
                          &copy; 2024 Hippotypose. Tous droits réservés.
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