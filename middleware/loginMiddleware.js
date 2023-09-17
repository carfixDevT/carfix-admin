import Cookie from 'cookie'

export default function ({ req, redirect }) {
  // Get cookies
  const cookies =
    req !== undefined && req.headers.cookie !== undefined
      ? Cookie.parse(req.headers.cookie)
      : ''
  if (cookies['userRole'] !== undefined && cookies['token'] !== undefined) {
    return redirect('/')
  }
}
