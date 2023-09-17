export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.main.authenticated || store.state.main.userRole !== 1) {
    return redirect('/login')
  }
}