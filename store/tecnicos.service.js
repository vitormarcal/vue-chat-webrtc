import TecnicosService from '../services/tecnicos.service'

export const state = () => ({
  tecnico: undefined,
});

export const mutations = {
  SET_TECNICO(state, tecnico) {
    state.tecnico = tecnico;
  },
};


export const actions = {
  setTecnico({commit}, payload) {

    TecnicosService.criar(payload).then(
      tecnico => {
        commit('SET_TECNICO', tecnico);
        return Promise.resolve(tecnico);
      }
    ).catch(
      error => {
        return Promise.reject(error)
      }
    )
  },
};
