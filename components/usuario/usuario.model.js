class UsuarioModel {
  constructor(data) {
    this.email = data?.email;
    this.tipo = data?.tipo;
    this.senha = data?.senha;
  }
}

export default UsuarioModel;