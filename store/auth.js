import AuthService from '../services/auth.service';

let user;
if (process.browser) {
  user = JSON.parse(localStorage.getItem('user'));
}

export const state = () => ({
  user: user,
  accessToken: user?.accessToken ? `Bearer ${user.accessToken}` : undefined,
  logado: !!user
});

export const mutations = {
  loginSuccess(state, user) {
    state.logado = true;
    state.user = user;
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
  }
};
