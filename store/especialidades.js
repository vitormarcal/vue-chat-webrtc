import EspecialidadesService from '../services/especialidades.service'

export const state = () => ({
  lista: [],
});

export const mutations = {
  SET_ESPECIALIDADES(state, especialidades) {
    state.lista = especialidades || [];
  },
};


export const actions = {
  setEspecialidades({commit}) {

    EspecialidadesService.buscarTodas().then(
      especialidades => {
        commit('SET_ESPECIALIDADES', especialidades);
        return Promise.resolve(especialidades);
      }
    )
  },
};
