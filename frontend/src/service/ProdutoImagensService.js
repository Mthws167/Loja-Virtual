import axios from 'axios';
import {LoginService} from "./LoginService";

export class ProdutoImagensService {
    url = 'http://localhost:8080/api/imagem';

    constructor() {
        this.inicializarAxios();
        this.tratamentoErro401();
    }

    inicializarAxios() {
        this.axiosInstance = axios.create({
            baseURL: this.url,
        });

        this.axiosInstance.interceptors.request.use((config) => {
                const token = new LoginService().getToken();
                const authRequestToken = token ? `Bearer ${token}` : '';
                config.headers.common['Authorization'] = authRequestToken;
                return config;
            },
            (error) => Promise.reject(error)
        );
    }

    tratamentoErro401() {
        this.axiosInstance.interceptors.response.use((response) => {
            return response;
        }, (erro) => {
            console.log(erro.response.status);
            if (erro.response.status === 401) {
                if (!erro.request.response.includes("gerenciamento/login")) {
                    new LoginService().sair();
                    window.location.href = "/";
                }
            }
            return Promise.reject(erro);
        });
    }

    salvarImagem(obj) {
        const formData = new FormData();

        formData.append('idProduto', obj.idProduto);
        formData.append('arquivo', obj.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return this.axiosInstance.post(this.url + "/cadastrar", formData, config);
    }

    buscarPorProdutoId(idProduto) {
        return this.axiosInstance.get(this.url + "/produto/" + idProduto);
    }

    excluir(idProduto) {
        return this.axiosInstance.delete(this.url + "/deletar/" + idProduto);
    }
}
