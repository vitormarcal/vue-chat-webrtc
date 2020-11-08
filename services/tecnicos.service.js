import axios from 'axios';
import authHeader from "./auth.header";

const API_URL = `${process.env.backendApi}/tecnicos/`;

class TecnicosService {
  criar(tecnico) {
    return axios
      .post(API_URL,
        tecnico,
        {
          headers: authHeader(),
        },
      )
      .then(response => {
        return response.data;
      });
  };

  editar(tecnico) {
    return axios
      .put(API_URL + tecnico.id,
        tecnico,
        {
          headers: authHeader(),
        },
      )
      .then(response => {
        return response.data;
      });
  };

  buscar(id) {
    return axios
      .get(API_URL + id,
        {
          headers: authHeader(),
        },
      )
      .then(response => {
        return response.data;
      });
  };
}

export default new TecnicosService();
