class TecnicoModel {
  constructor(data) {
    this.id = data?.id;
    this.especialidade = data?.especialidade
    this.idEspecialidade = data?.especialidade?.id;
    this.duracaoAtendimento = data?.duracaoAtendimento;
    this.diasQueAtende = data?.diasQueAtende?.split(',');
    this.inicioAtendimento = data?.inicioAtendimento;
    this.saidaDescanso = data?.saidaDescanso;
    this.voltaDescanso = data?.voltaDescanso;
    this.fimAtendimento = data?.fimAtendimento;
  }
}

export default TecnicoModel;
