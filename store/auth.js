import AuthService from '../services/auth.service';
import UsuarioModel from "../components/usuario/usuario.model";

let user;
if (process.browser) {
  user = new UsuarioModel(JSON.parse(localStorage.getItem('user')))
}

export const state = () => ({
  user: user,
  accessToken: user?.accessToken ? `Bearer ${user.accessToken}` : undefined,
  logado: !!user?.accessToken
});

export const mutations = {
  loginSuccess(state, user) {
    state.logado = true;
    state.user = new UsuarioModel(user);
  },
  loginFailure(state) {
    state.logado = false;
    state.user = null;
  },
  logout(state) {
    state.logado = false;
    state.user = null;
  },
  registerSuccess(state) {
    state.logado = false;
  },
  registerFailure(state) {
    state.logado = false;
  },
  SET_CADASTRO_COMPLETO(state, tecnicoId) {
    if (process.browser) {
      let user = JSON.parse(localStorage.getItem('user'));
      user.cadastroCompleto = true;
      user.tecnicoId = tecnicoId;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = new UsuarioModel(user);
    }
  }
};


export const actions = {
  login({commit}, user) {
    return AuthService.login(user).then(
      user => {
        commit('loginSuccess', user);
        return Promise.resolve(user);
      },
      error => {
        commit('loginFailure');
        return Promise.reject(error);
      }
    );
  },
  logout({commit}) {
    AuthService.logout();
    commit('logout');
  },
  register({commit}, user) {
    return AuthService.register(user).then(
      response => {
        commit('registerSuccess');
        return Promise.resolve(response.data);
      },
      error => {
        commit('registerFailure');
        return Promise.reject(error);
      }
    );
  },
  setCadastroCompleto({commit}, tecnicoId) {
    commit('SET_CADASTRO_COMPLETO', tecnicoId)
  }
};
