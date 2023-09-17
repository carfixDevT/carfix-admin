import Cookie from 'cookie'

export default function ({ store, req }) {
  // Get cookies
  const cookies =
    req !== undefined && req.headers.cookie !== undefined
      ? Cookie.parse(req.headers.cookie)
      : ''
  if (cookies['userRole'] !== undefined && cookies['token'] !== undefined) {
    const userRole = parseInt(cookies['userRole'])
    const token = cookies['token']
    const completeName = cookies['completeName']
    const userId = parseInt(cookies['userId'])
    const personId = parseInt(cookies['personId'])
    const email = cookies['email']
    const payload = {
      token: token,
      userRole: userRole,
      completeName: completeName,
      userId: userId,
      personId: personId,
      email: email,
    }
    store.commit('main/reloadPage', payload)
  }
}
