import axios from 'axios';
import authHeader from "./auth.header";

const API_URL = `${process.env.backendApi}/consultas/disponiveis`;

class ConsultaService {
  buscarTodasDisponiveis(filtro) {
   const data = filtro?.data || '';
   const idEspecialidade = filtro?.idEspecialidade || '';

    let url = `${API_URL}?data=${data}&idEspecialidade=${idEspecialidade}`;

    return axios
      .get(url,
        { headers: authHeader() }
      )
      .then(response => {
        return response.data;
      });
  }

}

export default new ConsultaService();
