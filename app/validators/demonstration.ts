import vine from '@vinejs/vine'

export const storeDemonstration = vine.compile(
    vine.object({
        nom: vine.string().minLength(3),
        prenom: vine.string().minLength(3),
        status: vine.string(),
        email: vine.string().email(),
        telephone: vine.string().mobile().nullable(),
        disponibility: vine.string().minLength(10).maxLength(1000),
    })
)