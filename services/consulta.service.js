import axios from 'axios';
import authHeader from "./auth.header";

const API_URL = `${process.env.backendApi}/consultas`;

class ConsultaService {
  buscarTodasDisponiveis(filtro) {
    const data = filtro?.data || '';
    const idEspecialidade = filtro?.idEspecialidade || '';

    let url = `${API_URL}/disponiveis?data=${data}&idEspecialidade=${idEspecialidade}`;

    return axios
      .get(url,
        {headers: authHeader()}
      )
      .then(response => {
        return response.data;
      });
  };

  agendarParaUsuario(idConsulta) {

    let url = `${API_URL}/disponiveis/${idConsulta}`;

    return axios
      .put(url,
        {},
        {headers: authHeader()}
      )
      .then(response => {
        return response.data;
      });
  }

  buscarConsulta(idConsulta) {
    let url = `${API_URL}/${idConsulta}`;
    return axios
      .get(url ,
        {headers: authHeader()}
      )
      .then(response => {
        return response.data;
      });
  }

}

export default new ConsultaService();