import axios from 'axios';
import authHeader from "./auth.header";

const API_URL = `${process.env.backendApi}/tecnicos/`;

class TecnicosService {
  criar(tecnico) {
    debugger
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
}

export default new TecnicosService();
