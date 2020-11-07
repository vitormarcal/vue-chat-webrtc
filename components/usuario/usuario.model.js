class UsuarioModel {
  constructor(data) {
    this.email = data?.email;
    this.username = data?.username;
    this.tipo = data?.tipo;
    this.password = data?.password;

    if (data?.roles.includes('admin')) {
      this.tipo = 'A'
    } else if (data?.roles.includes('medico')) {
      this.tipo = 'M'
    } else {
      this.tipo = 'U'
    }

  }

  get roles() {
    if (this.tipo === 'A') {
      return ['admin']
    } else if (this.tipo === 'M') {
      return ['medico']
    } else {
      return ['user']
    }
  }
}

export default UsuarioModel;
