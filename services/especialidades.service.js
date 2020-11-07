import axios from 'axios';
import authHeader from "./auth.header";

const API_URL = `${process.env.backendApi}/especialidades/`;

class EspecialidadesService {
  buscarTodas() {
    return axios
      .get(API_URL,
        { headers: authHeader() }
      )
      .then(response => {
        return response.data;
      });
  }

}

export default new EspecialidadesService();
