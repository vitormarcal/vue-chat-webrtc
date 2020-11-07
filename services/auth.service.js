import axios from 'axios';

const API_URL = process.env.backendApi + '/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        password: user.password,
        username: user.username
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      password: user.password,
      email: user.email,
      role: user.role
    });
  }
}

export default new AuthService();
