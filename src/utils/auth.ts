import Cookies from 'js-cookie'
const tokenKey = 'HZXUser-Token'
const userName = 'HZXUser-Name'
export function getToken() {
  return Cookies.get(tokenKey)
}

export function setToken(token: string) {
  return Cookies.set(tokenKey, token)
}

export function removeToken() {
  return Cookies.remove(tokenKey)
}

export function getUserName() {
  return Cookies.get(userName)
}

export function setUserName(name: string) {
  return Cookies.set(userName, name)
}
