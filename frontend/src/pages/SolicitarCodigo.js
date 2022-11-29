import {InputText} from 'primereact/inputtext';
import {Toast} from 'primereact/toast';
import React, {useRef, useState} from 'react';
import {SolicitarCodigoService} from "../service/SolicitarCodigoService";
import {Button} from "primereact/button";

const SolicitarCodigo = () => {
    let objetoNovo = {
        email: ''
    };

    const [objeto, setObjeto] = useState(objetoNovo);
    const [email, setEmail] = useState(objetoNovo);
    const solicitarCodigoService = new SolicitarCodigoService();
    const toast = useRef(null);

    const enviarCodigo = () => {
        let _objeto = {...objeto};
        _objeto.email = email;

        solicitarCodigoService.solicitarCodigo(_objeto, mostrarMensagemAviso, mostrarMensagemErro, mostrarMensagemSucesso).then(r => {
            setObjeto(null);
        });
    }

    const recuperarSenha = () => {
        solicitarCodigoService.telaResetarSenha();
    }

    const mostrarMensagemAviso = () => {
        toast.current.show({severity: 'warn', summary: 'Aviso', detail: 'Enviando email, aguarde um instante...', life: 15000});
    }

    const mostrarMensagemSucesso = () => {
        toast.current.show({severity: 'success', summary: 'Sucesso', detail: 'Email enviado com sucesso.', life: 3000});
    }

    const mostrarMensagemErro = () => {
        toast.current.show({severity: 'error', summary: 'Erro', detail: 'Verifique se o email está correto ou cadastrado.', life: 5000});
    }

    return (
        <div className="surface-ground px-4 py-8 md:px-6 lg:px-8 flex align-items-center justify-content-center">
            <Toast ref={toast}/>
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img src="images/digital-nomad-rafiki.svg" alt="hyper" height="160" className="mb-3"/>
                    <div className="text-900 text-3xl font-medium mb-3">Código para recuperação de senha.</div>
                </div>

                <div>
                    <label htmlFor="email1" className="block text-900 font-medium mb-2">Email</label>
                    <InputText id="email1" type="text" className="w-full mb-3" onChange={(e) => setEmail(e.target.value)}/>

                    <Button onClick={() => enviarCodigo()} label="Enviar Código" className="w-full mb-3"/>
                </div>
                <div>
                    <Button onClick={() => recuperarSenha()} label="Recebi meu código, próximo passo." className="w-full mb-3"/>
                </div>
            </div>
        </div>
    );
}

export default SolicitarCodigo;
