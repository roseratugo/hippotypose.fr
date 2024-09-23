import type { HttpContext } from '@adonisjs/core/http'
import { storeBlog } from '#validators/blog'
import Blog from '#models/blog'
import logger from '@adonisjs/core/services/logger'
import markdownit from 'markdown-it'

export default class BlogController {
  async index({ view }: HttpContext) {
    const blogs = await Blog.all()
    return view.render('pages/blog/index', { blogs })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/blog/create')
  }

  async show({ view, params }: HttpContext) {
    const blog = await Blog.findByOrFail('slug', params.slug)
    const md = new markdownit()
    const formattedContent = md.render(blog.content)
    return view.render('pages/blog/show', { 
      title: blog.title, 
      createdAt: blog.createdAt, 
      formattedContent 
    })
  }

  async store({ request, response, session, i18n }: HttpContext) {
    try {
      const payload = await request.validateUsing(storeBlog)

      const { title, slug, description, content } = payload

      await Blog.create({
        title,
        slug,
        description,
        content
      })

      session.flash('success', i18n.t('flash.blog.created.success'))
      return response.redirect('/blog')
    } catch (error) {
      logger.error('Erreur lors de la création de l\'article', error)
      session.flash('error', i18n.t('flash.blog.created.error'))

      return response.redirect().back()
    }
  }

}