class UsuarioModel {
  constructor(data) {
    this.email = data?.email;
    this.username = data?.username;
    this.tipo = data?.tipo;
    this.password = data?.password;

    if (data?.role.includes('admin')) {
      this.tipo = 'A'
    } else if (data?.role.includes('tecnico')) {
      this.tipo = 'T'
    } else {
      this.tipo = 'U'
    }

  }

  get role() {
    if (this.tipo === 'A') {
      return ['admin']
    } else if (this.tipo === 'T') {
      return ['tecnico']
    } else {
      return ['user']
    }
  }
}

export default UsuarioModel;
