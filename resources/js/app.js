import 'bootstrap-icons/font/bootstrap-icons.css'
//import "unpoly/unpoly.css"
//import "unpoly/unpoly.js"

import Cookies from 'js-cookie'

function setCookie(name, value, options = {}) {
  Cookies.set(name, value, options)
}

function getCookie(name) {
  return Cookies.get(name)
}

function removeCookie(name, options = {}) {
  Cookies.remove(name, options)
}

window.setCookie = setCookie
window.getCookie = getCookie
window.removeCookie = removeCookie

setCookie('monCookie', 'valeur', { expires: 7 }) // Expire dans 7 jours
const valeur = getCookie('monCookie')
console.log(valeur) // Affiche: 'valeur'
removeCookie('monCookie')


up.log.enable()