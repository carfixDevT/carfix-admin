/**
 * Middleware to validate user rol authenticated
 * @returns
 */
export default function ({ store, redirect }) {
  if (!store.state.main.authenticated || store.state.main.userRole === 3) {
    return redirect('/')
  }
}
