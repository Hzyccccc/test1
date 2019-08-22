import Cookies from 'js-cookie'

const InfoKey = 'jxcLoginInfo'

export function getUser() {
  if (Cookies.get(InfoKey)) {
    return JSON.parse(Cookies.get(InfoKey))
  } else {
    return Cookies.get(InfoKey)
  }

}

export function setUser(data) {
  return Cookies.set(InfoKey, JSON.stringify(data))
}

export function removeUser() {
  return Cookies.remove(InfoKey)
}
