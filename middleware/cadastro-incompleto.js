export default function ({store, redirect}) {
  const logado = store.state.auth.logado;
  const tecnico = store.state.auth.user.roles.includes('ROLE_TECNICO');
  const cadastroIncompleto = !store.state.auth.user.cadastroCompleto;
  if (logado && tecnico && cadastroIncompleto) {
    return redirect('/tecnicos');
  }
}
