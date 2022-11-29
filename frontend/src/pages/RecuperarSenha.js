import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Toast} from 'primereact/toast';
import React, {useRef, useState} from 'react';
import {RecuperarSenhaService} from "../service/RecuperarSenhaService";

const RecuperarSenha = () => {
    let objetoNovo = {
        email: '',
        codigoRecuperacaoSenha: '',
        senha: '',
    };

    const [objeto, setObjeto] = useState(objetoNovo);
    const [email, setEmail] = useState(objetoNovo);
    const [senha, setSenha] = useState(objetoNovo);
    const [codigoRecuperacaoSenha, setCodigoRecuperacaoSenha] = useState(objetoNovo);
    const recuperarSenhaService = new RecuperarSenhaService();
    const toast = useRef(null);

    const recuperarSenha = () => {
        let _objeto = {...objeto};
        _objeto.email = email;
        _objeto.codigoRecuperacaoSenha = codigoRecuperacaoSenha;
        _objeto.senha = senha;

        recuperarSenhaService.recuperarSenha(_objeto, mostrarMensagemErro, mostrarMensagemSucesso).then(r => {
            setObjeto(null);
        });
    }

    const voltarInicio = () => {
        recuperarSenhaService.telaLogin();
    }

    const mostrarMensagemErro = () => {
        toast.current.show({severity: 'error', summary: 'Erro', detail: 'Verifique se o email e o código estão corretos.', life: 5000});
    }

    const mostrarMensagemSucesso = () => {
        toast.current.show({severity: 'success', summary: 'Sucesso', detail: 'Sehna alterada com sucesso.', life: 3000});
    }

    return (
        <div className="surface-ground px-4 py-8 md:px-6 lg:px-8 flex align-items-center justify-content-center">
            <Toast ref={toast}/>
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <img src="images/reset-password-cuate.svg" alt="hyper" height="160" className="mb-3"/>
                    <div className="text-900 text-3xl font-medium mb-3">Recuperação de senha.</div>
                </div>

                <div>
                    <label htmlFor="codigo" className="block text-900 font-medium mb-2">Código de Recuperação</label>
                    <InputText id="codigo" type="text" className="w-full mb-3" onChange={(e) => setCodigoRecuperacaoSenha(e.target.value)}/>

                    <label htmlFor="email1" className="block text-900 font-medium mb-2">Email</label>
                    <InputText id="email1" type="text" className="w-full mb-3" onChange={(e) => setEmail(e.target.value)}/>

                    <label htmlFor="password1" className="block text-900 font-medium mb-2">Senha</label>
                    <InputText id="password1" type="password" className="w-full mb-3" onChange={(e) => setSenha(e.target.value)}/>

                    <Button onClick={() => recuperarSenha()} label="Salvar nova Senha" className="w-full mb-3"/>
                    <Button onClick={() => voltarInicio()} label="Voltar ao Login" className="w-full"/>
                </div>
            </div>
        </div>
    );
}

export default RecuperarSenha;
