export default function ({ store, redirect }) {
  if (!store.state.auth.logado) {
    return redirect('/')
  }
}
