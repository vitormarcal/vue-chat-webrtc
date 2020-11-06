class MedicoModel {
  constructor(data) {
    this.id = data?.id;
    this.nome = data?.nome;
    this.especialidade = null;
    this.diasQueAtende = data?.diasQueAtende?.split(',');
    this.inicioAtendimento = data?.inicioAtendimento;
    this.saidaDescanso = data?.saidaDescanso;
    this.voltaDescanso = data?.voltaDescanso;
    this.fimAtendimento = data?.fimAtendimento;
  }
}

export default MedicoModel;
