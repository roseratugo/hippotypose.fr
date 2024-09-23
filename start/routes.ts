/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import BlogController from '#controllers/blog_controller'
import ContactsController from '#controllers/contacts_controller'
import DemoRequestsController from '#controllers/demo_requests_controller'
import DemonstrationsController from '#controllers/demonstrations_controller'
import LanguageController from '#controllers/languages_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'

import { middleware } from './kernel.js'

router.on('/').render('pages/home')
router.on('/nos-offres').render('pages/offers')
router.on('/temoignages').render('pages/testimonials')
router.on('/contact').render('pages/contact')
router.on('/demonstration').render('pages/demonstration')

router.post('/demo', [DemoRequestsController, 'store'])
router.post('/contact', [ContactsController, 'store'])
router.post('/demonstration', [DemonstrationsController, 'store'])

router.post('/switch-language', [LanguageController, 'switchLanguage'])

router.get('/login', [UsersController, 'loginPage'])
router.post('/login', [UsersController, 'login'])
router.get('/register', [UsersController, 'registerPage'])
router.post('/register', [UsersController, 'store'])

router.get('/blog', [BlogController, 'index']).use(middleware.share())
router.get('/blog/create', [BlogController, 'create']).use(middleware.auth())
router.get('/blog/:slug', [BlogController, 'show']).use(middleware.share())
router.post('/blog/create', [BlogController, 'store']).use(middleware.auth())