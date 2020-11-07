class UsuarioModel {
  constructor(data) {
    this.nome = data?.nome;
    this.telefone = data?.nome;
    this.email = data?.email;
    this.username = data?.username;
    this.tipo = data?.tipo;
    this.password = data?.password;
    this.roles = data?.roles;
    this.accessToken = data?.accessToken;

    if (data?.roles?.includes('ROLE_ADMIN')) {
      this.tipo = 'A'
    } else if (data?.roles.includes('ROLE_TECNICO')) {
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
