import Cookies from 'js-cookie'

const InfoKey = 'city_sale_userInfo'

export function getUser() {
  return Cookies.get(InfoKey)
}

export function setUser(data) {
  return Cookies.set(InfoKey, data)
}

export function removeUser() {
  return Cookies.remove(InfoKey)
}
