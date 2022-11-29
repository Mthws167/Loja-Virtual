import axios from "axios";

export class RecuperarSenhaService {
    url = 'http://localhost:8080/api/gerenciamento';

    telaLogin() {
        window.location.href = "/login";
    }

    recuperarSenha(objeto, mensagemErro, mostrarMensagemSucesso) {
        return axios.post(this.url + '/senha-alterar', objeto).then(res => {
            if (res.data) {

            }
            mostrarMensagemSucesso();
        }).catch(error => {
            mensagemErro();
        });
    }
}
