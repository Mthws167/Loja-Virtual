import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
<<<<<<< HEAD:frontend/sakai-react/src/pages/cadastros/Marca.js
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { MarcaService } from '../../service/cadastros/MarcaService';

const Marca = () => {
    let objetoNovo = {
        nome: ''
    };

    const [objetos, setObjetos] = useState(null);
    const [objetoDialog, setObjetoDialog] = useState(false);
    const [objetoDeleteDialog, setObjetoDeleteDialog] = useState(false);
    const [objeto, setObjeto] = useState(objetoNovo);
    const [submitted, setSubmitted] = useState(false);
=======
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import {Dropdown, DropDown} from 'primereact/dropdown';
import { MarcaService } from '../../service/cadastros/MarcaService';

import Axios from 'axios';

const Marca = () => {

    let objetoNovo = {
        nome: '',
    };

    const [objetos, setObjetos] = useState(null);
    const [objeto, setObjeto] = useState(objetoNovo);
    const [objetoDialog, setObjetoDialog] = useState(false);
    const [objetoDeleteDialog, setObjetoDeleteDialog] = useState(false);
    const [atualizar, setAtualizar] = useState({});
    const [submitted, setSubmitted] = useState(false);

>>>>>>> da8f6a8bba64be4a6007e6d2e8a18d2af30a3b0b:frontend/src/pages/cadastros/Marca.js
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const objetoService = new MarcaService();

    useEffect(() => {
<<<<<<< HEAD:frontend/sakai-react/src/pages/cadastros/Marca.js
        if (objetos == null) {
            objetoService.listarTodos().then(res => {
                setObjetos(res.data)

            });
        }
    }, [objetos]);

=======
        if(objetos == null){
            objetoService.marcas().then(res =>{
                setObjetos(res.data);
            })
        }
    }, [objetos]);

    function listarMarcas() {
        Axios.get("http://localhost:8080/api/marca/").then(result => {
            setObjetos(result.data);
        });
    }

>>>>>>> da8f6a8bba64be4a6007e6d2e8a18d2af30a3b0b:frontend/src/pages/cadastros/Marca.js
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

<<<<<<< HEAD:frontend/sakai-react/src/pages/cadastros/Marca.js


    const saveObjeto = () => {
        setSubmitted(true);

        if (objeto.nome.trim()) {
            let _objeto = { ...objeto };
            if (objeto.id) {
                objetoService.alterar(_objeto).then(data => {
                    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Alterado com Sucesso', life: 3000 });
                    setObjetos(null);
                });
            }
            else {
                objetoService.inserir(_objeto).then(data => {
                    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Inserido com Sucesso', life: 3000 });
                    setObjetos(null);
                });

=======
    const saveObjeto = () => {
        setSubmitted(true);

        if(objeto.nome.trim()){
            let _objeto = {...objeto};
            if(objeto.id){
                objetoService.alterar(_objeto).then(data => {
                    toast.current.show({severity: 'success', summary: 'Sucesso', detail: "Alterado"});
                    setObjetos(null);
                })
            }else{
                objetoService.inserir(_objeto).then(data => {
                    toast.current.show({severity: 'success', summary: 'Sucesso', detail: "Cadastrado"});
                    setObjetos(null);
                })
>>>>>>> da8f6a8bba64be4a6007e6d2e8a18d2af30a3b0b:frontend/src/pages/cadastros/Marca.js
            }
            setObjetoDialog(false);
            setObjeto(objetoNovo);
        }
    }

<<<<<<< HEAD:frontend/sakai-react/src/pages/cadastros/Marca.js
    const editObjeto = (objeto) => {
        setObjeto({ ...objeto });
=======
    const editObjeto = (objeto) =>{
        setObjeto({...objeto});
>>>>>>> da8f6a8bba64be4a6007e6d2e8a18d2af30a3b0b:frontend/src/pages/cadastros/Marca.js
        setObjetoDialog(true);
    }

    const confirmDeleteObjeto = (objeto) => {
<<<<<<< HEAD:frontend/sakai-react/src/pages/cadastros/Marca.js
        setObjeto(objeto);
        setObjetoDeleteDialog(true);
    }

    const deleteObjeto = () => {
    
        objetoService.excluir(objeto.id).then(data => {
            toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Removido', life: 3000 });

            setObjetos(null);
            setObjetoDeleteDialog(false);
         
        });
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _objeto = { ...objeto };
        _objeto[`${name}`] = val;
=======
        objetoService.excluir(objeto.id).then(data => {
            toast.current.show({severity: 'success', summary: 'Sucesso', detail: "Removido"});

            setObjetos(null);
            setObjetoDeleteDialog(false);
        })
    }

    const onInputChange = (e, nome) => {
        const val = (e.target && e.target.value) || '';
        let _objeto = {...objeto};
        _objeto[`${nome}`] = val;
>>>>>>> da8f6a8bba64be4a6007e6d2e8a18d2af30a3b0b:frontend/src/pages/cadastros/Marca.js

        setObjeto(_objeto);
    }

<<<<<<< HEAD:frontend/sakai-react/src/pages/cadastros/Marca.js
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Nova" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />

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


=======
>>>>>>> da8f6a8bba64be4a6007e6d2e8a18d2af30a3b0b:frontend/src/pages/cadastros/Marca.js
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editObjeto(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteObjeto(rowData)} />
            </div>
        );
    }

<<<<<<< HEAD:frontend/sakai-react/src/pages/cadastros/Marca.js

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Registros Cadastrados</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const objetoDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={saveObjeto} />
=======
    const leftToolbarTemplate = () => {
        return (
        <React.Fragment>
            <div className='my-2'>
                <Button label="Nova Pessoa" icon="pi pi-plus" className='p-button-success' onClick={openNew}/>
            </div>
        </React.Fragment>
        );
    }

    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'>ID</span>
                {rowData.id}
            </>
        );
    }

    const nomeBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'>nome</span>
                {rowData.nome}
            </>
        );
    }

    const header = (
        <div className='flex flex-column md:flex-row md:justify-content-between md:align-items-center'>
            <h5 className='m-0'>Marca Cadastradas</h5>
            <span className='block mt-2 md:mt-0 p-input-icon-left'>
                <i className='pi pi-search'/>
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} />
            </span>
        </div>
    )

    const objetoDialogFooter = (
        <>
            <Button label='Cancelar' icon="pi pi-times" className='p-button-text' onClick={hideDialog}/>
            <Button label='Salvar' icon='pi pi-checks' className='p-button-text' onClick={saveObjeto}/>
>>>>>>> da8f6a8bba64be4a6007e6d2e8a18d2af30a3b0b:frontend/src/pages/cadastros/Marca.js
        </>
    );

    const deleteObjetoDialogFooter = (
        <>
<<<<<<< HEAD:frontend/sakai-react/src/pages/cadastros/Marca.js
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteObjetoDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteObjeto} />
        </>
    ); 

=======
            <Button label='Não' icon="pi pi-times" className='p-button-text' onClick={hideDeleteObjetoDialog}/>
            <Button label='Salvar' icon='pi pi-checks' className='p-button-text' onClick={confirmDeleteObjeto}/>
        </>
    )
>>>>>>> da8f6a8bba64be4a6007e6d2e8a18d2af30a3b0b:frontend/src/pages/cadastros/Marca.js
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

<<<<<<< HEAD:frontend/sakai-react/src/pages/cadastros/Marca.js
                    <DataTable ref={dt} value={objetos}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} de {last}. Total de {totalRecords}"
                        globalFilter={globalFilter} emptyMessage="Sem objetos cadastrados." header={header} responsiveLayout="scroll">                        
                        <Column field="id" header="ID" sortable body={idBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="nome" header="Nome" sortable body={nomeBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={objetoDialog} style={{ width: '450px' }} header="Cadastrar/Editar" modal className="p-fluid" footer={objetoDialogFooter} onHide={hideDialog}>

                        <div className="field">
                            <label htmlFor="nome">Nome</label>
                            <InputText id="nome" value={objeto.nome} onChange={(e) => onInputChange(e, 'nome')} required autoFocus className={classNames({ 'p-invalid': submitted && !objeto.nome })} />
                            {submitted && !objeto.name && <small className="p-invalid">Nome é Obrigatório.</small>}
                        </div>
           

                    </Dialog>

                    <Dialog visible={objetoDeleteDialog} style={{ width: '450px' }} header="Confirmação" modal footer={deleteObjetoDialogFooter} onHide={hideDeleteObjetoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {objeto && <span>Deseja Excluir?</span>}
                        </div>
                    </Dialog>


=======
                    <DataTable ref={dt} value={objetos} dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="id" header="id" sortable body={idBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="nome" header="Nome" sortable body={nomeBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>

                    </DataTable>

                    <Dialog visible={objetoDialog} style={{ width: '450px' }} footer={objetoDialogFooter} header="Product Details" modal className="p-fluid" onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="nome">Nome</label>
                            <InputText id="name" value={objeto.nome} onChange={(e) => onInputChange(e, 'nome')} required autoFocus className={classNames({ 'p-invalid': submitted && !objeto.nome })} />
                            {submitted && !objeto.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={objetoDeleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteObjetoDialogFooter} onHide={hideDeleteObjetoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {objeto && <span>tem certeza que quer excluir?</span>}
                        </div>
                    </Dialog>
>>>>>>> da8f6a8bba64be4a6007e6d2e8a18d2af30a3b0b:frontend/src/pages/cadastros/Marca.js
                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

<<<<<<< HEAD:frontend/sakai-react/src/pages/cadastros/Marca.js
export default React.memo(Marca, comparisonFn);
=======
export default React.memo(Marca, comparisonFn);
>>>>>>> da8f6a8bba64be4a6007e6d2e8a18d2af30a3b0b:frontend/src/pages/cadastros/Marca.js
