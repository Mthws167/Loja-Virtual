import classNames from 'classnames';
import {useFormik} from 'formik';
import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import {Dialog} from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {InputMask} from 'primereact/inputmask';
import {InputText} from 'primereact/inputtext';
import {MultiSelect} from 'primereact/multiselect';
import {Toast} from 'primereact/toast';
import {Toolbar} from 'primereact/toolbar';
import React, {useEffect, useRef, useState} from 'react';
import {CidadeService} from '../service/CidadeService';
import {PermissaoService} from '../service/PermissaoService';
import {PessoaService} from '../service/PessoaService';
import ColunaOpcoes from "../components/ColunaOpcoes";

const Pessoa = () => {
    let objetoNovo = {
        nome: '',
        cidade: null,
        cpf: '',
        email: '',
        endereco: '',
        cep: '',
        permissaoPessoas: []
    };

    const [objetos, setObjetos] = useState(null);
    const [cidades, setCidades] = useState(null);
    const [permissoes, setPermissoes] = useState(null);
    const [objetoDialog, setObjetoDialog] = useState(false);
    const [objetoDeleteDialog, setObjetoDeleteDialog] = useState(false);
    const [objeto, setObjeto] = useState(objetoNovo);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const objetoService = new PessoaService();
    const cidadeService = new CidadeService();
    const permissaoService = new PermissaoService();


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: objeto,
        validate: (data) => {
            let errors = {};

            if (!data.nome) {
                errors.nome = 'Nome é obrigatório';
            }

            if (!data.email) {
                errors.email = 'Email é obrigatório';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Email é inválido. Exemplo: jose@gmail.com';
            }

            if (!data.cpf) {
                errors.cpf = 'CPF é obrigatório';
            }

            return errors;
        },
        onSubmit: (data) => {
            setObjeto(data);
            saveObjeto();
            formik.resetForm();
        }
    });

    useEffect(() => {
        cidadeService.listarTodos().then(res => {
            setCidades(res.data)
        });

        permissaoService.listarTodos().then(res => {
            let permissoesTemporarias = [];
            res.data.forEach(element => {
                permissoesTemporarias.push({permissao: element});
            });
            setPermissoes(permissoesTemporarias);
        });
    }, []);

    useEffect(() => {
        if (objetos == null) {
            objetoService.listarTodos().then(res => {
                setObjetos(res.data)
            });
        }
    }, [objetos]);

    const openNew = () => {
        setObjeto(objetoNovo);
        setSubmitted(false);
        setObjetoDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setObjetoDialog(false);
    }

    const hideDeleteObjetoDialog = () => {
        setObjetoDeleteDialog(false);
    }

    const saveObjeto = () => {
        setSubmitted(true);

        if (objeto.nome.trim()) {
            let _objeto = formik.values;
            if (objeto.id) {
                objetoService.alterar(_objeto).then(data => {
                    toast.current.show({severity: 'success', summary: 'Sucesso', detail: 'Alterado com Sucesso', life: 3000});
                    setObjetos(null);
                });
            } else {
                objetoService.inserir(_objeto).then(data => {
                    toast.current.show({severity: 'success', summary: 'Sucesso', detail: 'Inserido com Sucesso', life: 3000});
                    setObjetos(null);
                });
            }
            setObjetoDialog(false);
            setObjeto(objetoNovo);
        }
    }

    const editObjeto = (objeto) => {
        setObjeto({...objeto});
        setObjetoDialog(true);
    }

    const confirmDeleteObjeto = (objeto) => {
        setObjeto(objeto);
        setObjetoDeleteDialog(true);
    }

    const deleteObjeto = () => {
        objetoService.excluir(objeto.id).then(data => {
            toast.current.show({severity: 'success', summary: 'Sucesso', detail: 'Removido', life: 3000});

            setObjetos(null);
            setObjetoDeleteDialog(false);
        });
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _objeto = {...objeto};
        _objeto[`${name}`] = val;

        setObjeto(_objeto);
    }

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nova" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew}/>
                </div>
            </React.Fragment>
        )
    }

    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">ID</span>
                {rowData.id}
            </>
        );
    }

    const nomeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nome</span>
                {rowData.nome}
            </>
        );
    }

    const emailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                {rowData.email}
            </>
        );
    }

    const documentoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Documento</span>
                {rowData.cpf}
            </>
        );
    }

    const enderecoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Endereço</span>
                {rowData.endereco}
            </>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Registros Cadastrados</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search"/>
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..."/>
            </span>
        </div>
    );

    const objetoDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
            <Button type="submit" form="formularioPessoa" label="Salvar" icon="pi pi-check" className="p-button-text"/>
        </>
    );

    const deleteObjetoDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteObjetoDialog}/>
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteObjeto}/>
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast}/>
                    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                    <DataTable ref={dt} value={objetos}
                               dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                               currentPageReportTemplate="Mostrando {first} de {last}. Total de {totalRecords}"
                               globalFilter={globalFilter} emptyMessage="Sem objetos cadastrados." header={header} responsiveLayout="scroll">
                        <Column field="id" header="ID" sortable body={idBodyTemplate} headerStyle={{width: '14%', minWidth: '10rem'}}></Column>
                        <Column field="nome" header="Nome" sortable body={nomeBodyTemplate} headerStyle={{width: '14%', minWidth: '10rem'}}></Column>
                        <Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{width: '14%', minWidth: '10rem'}}></Column>
                        <Column field="cpf" header="Documento" sortable body={documentoBodyTemplate} headerStyle={{width: '14%', minWidth: '10rem'}}></Column>
                        <Column field="endereco" header="Endereço" sortable body={enderecoBodyTemplate} headerStyle={{width: '14%', minWidth: '10rem'}}></Column>
                        <Column body={rowData => {
                            return <ColunaOpcoes rowData={rowData} editObjeto={editObjeto} confirmDeleteObjeto={confirmDeleteObjeto}/>
                        }}></Column>
                    </DataTable>

                    <Dialog visible={objetoDialog} style={{width: '450px'}} header="Cadastrar/Editar" modal className="p-fluid" footer={objetoDialogFooter} onHide={hideDialog}>
                        <form id="formularioPessoa" onSubmit={formik.handleSubmit}>
                            <div className="field">
                                <label htmlFor="nome">Nome*</label>
                                <InputText id="nome" value={formik.values.nome} onChange={formik.handleChange} autoFocus className={classNames({'p-invalid': isFormFieldValid('nome')})}/>
                                {getFormErrorMessage('nome')}
                            </div>

                            <div className="field">
                                <label htmlFor="cpf">CPF*</label>
                                <InputMask mask="999.999.999-99" id="cpf" value={formik.values.cpf} onChange={formik.handleChange} className={classNames({'p-invalid': isFormFieldValid('cpf')})}/>
                                {getFormErrorMessage('cpf')}
                            </div>

                            <div className="field">
                                <label htmlFor="email">E-mail*</label>
                                <InputText id="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({'p-invalid': isFormFieldValid('email')})}/>
                                {getFormErrorMessage('email')}
                            </div>

                            <div className="field">
                                <label htmlFor="cep">CEP</label>
                                <InputMask mask="99999-999" id="cep" value={formik.values.cep} onChange={formik.handleChange}/>
                            </div>

                            <div className="field">
                                <label htmlFor="endereco">Endereço</label>
                                <InputText id="endereco" value={formik.values.endereco} onChange={formik.handleChange}/>
                            </div>

                            <div className="field">
                                <label htmlFor="cidade">Cidade</label>
                                <Dropdown id="cidade" name="cidade" optionLabel="nome" value={formik.values.cidade} options={cidades} filter onChange={formik.handleChange} placeholder="Selecione uma Cidade"/>
                            </div>

                            <div className="field">
                                <label htmlFor="permissaoPessoas">Permissões</label>
                                <MultiSelect dataKey="permissao.id" id="permissaoPessoas" value={formik.values.permissaoPessoas} options={permissoes} onChange={formik.handleChange} optionLabel="permissao.nome" placeholder="Selecione as Permissões"/>
                            </div>
                        </form>
                    </Dialog>

                    <Dialog visible={objetoDeleteDialog} style={{width: '450px'}} header="Confirmação" modal footer={deleteObjetoDialogFooter} onHide={hideDeleteObjetoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                            {objeto && <span>Deseja Excluir?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Pessoa, comparisonFn);
