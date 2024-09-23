import vine from '@vinejs/vine'

export const storeBlog = vine.compile(
    vine.object({
        title: vine.string().minLength(8),
        slug: vine.string().minLength(3),
        description: vine.string().minLength(10),
        content: vine.string().minLength(10)
    })
)