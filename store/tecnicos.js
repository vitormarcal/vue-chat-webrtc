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
        return Promise.reject(error)
      }
    )
  },
  editar({commit}, payload) {
    return TecnicosService.editar(payload).then(
      tecnicoSalvo => {
        commit('SET_TECNICO', tecnicoSalvo);
        return Promise.resolve(tecnicoSalvo);
      }
    ).catch(
      error => {
        return Promise.reject(error)
      }
    )
  },
  buscar({commit}, payload) {
    return TecnicosService.buscar(payload).then(
      tecnicoSalvo => {
        commit('SET_TECNICO', tecnicoSalvo);
        return Promise.resolve(tecnicoSalvo);
      }
    ).catch(
      error => {
        return Promise.reject(error)
      }
    )
  },

};
