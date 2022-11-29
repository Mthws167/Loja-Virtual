import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Toast} from 'primereact/toast';
import React, {useRef, useState} from 'react';
import {LoginService} from "../service/LoginService";
import {SolicitarCodigoService} from "../service/SolicitarCodigoService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const loginService = new LoginService();
    const solicitarCodigoService = new SolicitarCodigoService();
    const toast = useRef(null);

    const fazerLogin = () => {
        loginService.login(email, senha, mostrarMensagemErro);
    }

    const telaSolicitarCodigo = () => {
        solicitarCodigoService.telaSolicitarCodigo();
    }

    const mostrarMensagemErro = (erro) => {
        toast.current.show({severity: 'error', summary: 'Erro', detail: erro, life: 3000});
    }

    return (
        <div className="surface-ground px-4 py-8 md:px-6 lg:px-8 flex align-items-center justify-content-center">
            <Toast ref={toast}/>
            <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                <div className="text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">Bem Vindo de volta!</div>
                </div>

                <div>
                    <label htmlFor="email1" className="block text-900 font-medium mb-2">Email</label>
                    <InputText id="email1" type="text" className="w-full mb-3" onChange={(e) => setEmail(e.target.value)}/>

                    <label htmlFor="password1" className="block text-900 font-medium mb-2">Senha</label>
                    <InputText id="password1" type="password" className="w-full mb-3" onChange={(e) => setSenha(e.target.value)}/>

                    <div className="flex align-items-center justify-content-between mb-6">
                        <button className="p-link font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer" onClick={() => telaSolicitarCodigo()}>Recuperar senha</button>
                    </div>

                    <Button onClick={() => fazerLogin()} label="Sign In" icon="pi pi-user" className="w-full"/>
                </div>
            </div>
        </div>
    );
}

export default Login;
