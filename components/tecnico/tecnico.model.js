class TecnicoModel {
  constructor(data) {
    this.id = data?.id;
    this.especialidades = data?.especialidades?.map(e => e) || []
    this.idEspecialidade = this.especialidades?.filter(e => !!e?.id).map(e => e.id)
    this.duracaoAtendimento = data?.duracaoAtendimento;

    if (data?.diasQueAtende instanceof Array) {
      this.diasQueAtende = data?.diasQueAtende || [];
    } else {
      this.diasQueAtende = data?.diasQueAtende?.split(',');
    }

    this.inicioAtendimento = data?.inicioAtendimento;
    this.saidaDescanso = data?.saidaDescanso;
    this.voltaDescanso = data?.voltaDescanso;
    this.fimAtendimento = data?.fimAtendimento;
  }

  adicionarEspecialidades(especialidades) {
    this.especialidades.splice(0, this.especialidades.length)
    especialidades.forEach(e => this.especialidades.push(e))
    this.idEspecialidade = this.especialidades?.filter(e => !!e?.id).map(e => e.id)

  }

  horariosValidos() {
    const inicio = Date.parse(`Thu, 01 Jan 2020 ${this.inicioAtendimento} GMT-0400`);
    const saida = Date.parse(`Thu, 01 Jan 2020 ${this.saidaDescanso} GMT-0400`);
    const volta = Date.parse(`Thu, 01 Jan 2020 ${this.voltaDescanso} GMT-0400`);
    const fim = Date.parse(`Thu, 01 Jan 2020 ${this.fimAtendimento} GMT-0400`);
    return inicio < saida && saida < volta && volta < fim
  }
}

export default TecnicoModel;
