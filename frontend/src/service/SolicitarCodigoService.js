import axios from "axios";

export class SolicitarCodigoService {
    url = 'http://localhost:8080/api/gerenciamento';

    telaSolicitarCodigo() {
        window.location.href = "/solicitar-codigo";
    }

    telaResetarSenha() {
        window.location.href = "/alterar-senha";
    }

    solicitarCodigo(objeto, mostrarMensagemAviso, mensagemErro, mostrarMensagemSucesso) {
        mostrarMensagemAviso();
        return axios.post(this.url + '/senha-codigo', objeto).then(res => {
            mostrarMensagemSucesso();
        }).catch(error => {
            mensagemErro();
        });
    }
}
