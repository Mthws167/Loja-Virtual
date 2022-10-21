import Axios from "axios";

export class CidadeService {
    url = process.env.REACT_APP_URI_API;

    cidades(){
        return Axios.get(this.url+"/cidade/");
    }

    inserir(objeto){
        return Axios.get(this.url+"/cidade/", objeto);
    }

    alterar(objeto){
        return Axios.get(this.url+"/cidade/", objeto);
    }

    excluir(id){
        return Axios.get(this.url+"/cidade/"+id);
    }
}