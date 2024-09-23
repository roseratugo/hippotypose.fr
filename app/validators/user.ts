import vine from '@vinejs/vine'

export const loginUsers = vine.compile(
    vine.object({
        email: vine.string().email(),
        password: vine.string().minLength(8)
    })
)

export const storeUsers = vine.compile(
    vine.object({
        fullName: vine.string().minLength(6),
        email: vine.string().email(),
        password: vine.string().confirmed().minLength(8)
    })
)