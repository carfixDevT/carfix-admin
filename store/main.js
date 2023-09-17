import decode from 'jwt-decode'

export const state = () => ({
  token: '',
  user: '',
  userRole: 0,
  email: '',
  completeName: '',
  userId: 0,
  personId: 0,
  authenticated: false,
  displaySidebar: false.valueOf,
})

function setCookie(cname, cvalue, exdays) {
  const d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  let expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

function deleteCookie(cname) {
  document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

export const mutations = {
  login(state, payload) {
    state.token = payload.token
    if (payload === '') {
      state.user = ''
      state.userRole = 0
      state.email = ''
      state.completeName = ''
      state.userId = 0
      state.personId = 0
    } else {
      state.user = decode(payload.token)
      state.userRole = payload.userRole
      state.email = payload.userEmail
      state.completeName = payload.completeName
      state.userId = payload.userId
      state.personId = payload.personId
      setCookie('token', payload.token, 365)
      setCookie('userRole', payload.userRole, 365)
      setCookie('email', payload.userEmail, 365)
      setCookie('completeName', payload.completeName, 365)
      setCookie('userId', payload.userId, 365)
      setCookie('personId', payload.personId, 365)
      state.authenticated = true
      $nuxt.$router.push('/')
    }
  },
  logout(state) {
    deleteCookie('token')
    deleteCookie('userRole')
    deleteCookie('personId')
    deleteCookie('userId')
    deleteCookie('email')
    deleteCookie('completeName')
    state.token = ''
    state.user = ''
    state.userRole = 0
    state.email = ''
    state.personId = 0
    state.authenticated = false
    $nuxt.$router.push('/auth/login')
  },
  sidebar(state) {
    state.displaySidebar = !state.displaySidebar
  },
  reloadPage(state, payload) {
    state.token = payload.token
    state.userRole = payload.userRole
    state.completeName = payload.completeName
    state.userId = payload.userId
    state.personId = payload.personId
    state.email = payload.email
    state.authenticated = true
    state.user = decode(payload.token)
  },
}
