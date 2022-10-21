import axios from 'axios';

export class EstadoService{

    url = process.env.REAC_APP_URL_API;

    estados(){
        return axios.get(this.url+'/estados/');
    }

    inserir(estado){
        return axios.post(this.get+'/estado/',estado);
    }

    alterar(estado){
        return axios.put(this.get+'/estado/',estado);
    }

    excluir(id){
        return axios.delete(this.get+'/estado/',id);
    }
}