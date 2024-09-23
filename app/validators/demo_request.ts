import vine from '@vinejs/vine'

export const storeDemoRequestsValidator = vine.compile(
  vine.object({
    telephoneCode: vine.string(),
    phoneNumber: vine.string().minLength(8).maxLength(12)
  })
)