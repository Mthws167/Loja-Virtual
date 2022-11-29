import axios from "axios";

export class LoginService {
    url = 'http://localhost:8080/api/gerenciamento';
    CHAVE_TOKEN = "@token_loja";

    constructor() {
        this.inicializarAxios();
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

    login(email, senha, mensagemErro) {
        this.axiosInstance.post(this.url + "/login", {'email': email, 'senha': senha}).then(res => {
            localStorage.setItem(this.CHAVE_TOKEN, res.data.token);
            window.location.href = "/";
        }).catch(error => {
            mensagemErro(error.response.data.message);
        });
    }

    autenticado() {
        return this.getToken() != null;
    }

    sair() {
        localStorage.removeItem(this.CHAVE_TOKEN);
        document.location.reload(true);
    }

    getToken() {
        return localStorage.getItem(this.CHAVE_TOKEN);
    }
}
