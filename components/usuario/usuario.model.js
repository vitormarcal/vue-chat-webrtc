class UsuarioModel {
  constructor(data) {
    this.nome = data?.nome;
    this.id = data?.id;
    this.telefone = data?.nome;
    this.email = data?.email;
    this.username = data?.username;
    this.tipo = data?.tipo;
    this.password = data?.password;
    this.roles = data?.roles;
    this.accessToken = data?.accessToken;
    this.cadastroCompleto = data?.cadastroCompleto;

    if (data?.roles?.includes('ROLE_ADMIN')) {
      this.tipo = 'A'
    } else if (data?.roles.includes('ROLE_TECNICO')) {
      this.tipo = 'T'
    } else {
      this.tipo = 'U'
    }

  }
  includes(tipo) {
    if (tipo === 'A') {
      return this.roles?.includes('ROLE_ADMIN')
    } else if (this.tipo === 'T') {
      return this.roles?.includes('ROLE_TECNICO')
    } else if('U') {
      return this.roles?.includes('ROLE_USER')
    }
    return this.roles?.includes('ROLE_USER')
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
