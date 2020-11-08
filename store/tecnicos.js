import TecnicosService from '../services/tecnicos.service'
import TecnicoModel from "../components/tecnico/tecnico.model";

export const state = () => ({
  tecnico: new TecnicoModel(),
});

export const mutations = {
  SET_TECNICO(state, tecnicoSalvo) {
    if (tecnicoSalvo) {
      state.tecnico = new TecnicoModel(tecnicoSalvo);
    }
  },
};


export const actions = {
  criar({commit}, payload) {

    return TecnicosService.criar(payload).then(
      tecnicoSalvo => {
        commit('SET_TECNICO', tecnicoSalvo);
        return Promise.resolve(tecnicoSalvo);
      }
    ).catch(
      error => {
        debugger
        return Promise.reject(error)
      }
    )
  },
};
