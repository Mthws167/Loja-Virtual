import classNames from 'classnames';
import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import {Dialog} from 'primereact/dialog';
import {Dropdown} from 'primereact/dropdown';
import {InputNumber} from 'primereact/inputnumber';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {Toast} from 'primereact/toast';
import {Toolbar} from 'primereact/toolbar';
import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {CategoriaService} from '../service/CategoriaService';
import {MarcaService} from '../service/MarcaService';
import {ProdutoService} from '../service/ProdutoService';


const Produto = () => {
    let objetoNovo = {
        nome: '',
        marca: '',
        categoria: '',
        descricao: '',
        valorCusto: '',
        valorVenda: ''
    };

    const [objetos, setObjetos] = useState(null);
    const [marcas, setMarcas] = useState(null);
    const [categorias, setCategorias] = useState(null);
    const [objetoDialog, setObjetoDialog] = useState(false);
    const [objetoDeleteDialog, setObjetoDeleteDialog] = useState(false);
    const [objeto, setObjeto] = useState(objetoNovo);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const objetoService = new ProdutoService();
    const marcaService = new MarcaService();
    const categoriaService = new CategoriaService();

    useEffect(() => {
        marcaService.listarTodos().then(res => {
            setMarcas(res.data)

        });
        categoriaService.listarTodos().then(res => {
            setCategorias(res.data)

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
        console.log(objeto);

        if (objeto.nome.trim()) {
            let _objeto = {...objeto};
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
        console.log(e.target.value);
        const val = (e.target && e.target.value) || '';
        let _objeto = {...objeto};
        _objeto[`${name}`] = val;

        setObjeto(_objeto);
    }

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

    const descricaoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Descrição</span>
                {rowData.descricao}
            </>
        );
    }

    const valorCustoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Valor de Custo</span>
                {rowData.valorCusto}
            </>
        );
    }

    const valorVendaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Valor de Venda</span>
                {rowData.valorVenda}
            </>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Link to={{pathname: '/produtoImagens/' + rowData.id}}> <Button icon="pi pi-image" className="p-button-rounded p-button-primary mr-2"/></Link>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editObjeto(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2" onClick={() => confirmDeleteObjeto(rowData)}/>
            </div>
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
            <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={saveObjeto}/>
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
                        <Column field="descricao" header="Descrição" sortable body={descricaoBodyTemplate} headerStyle={{width: '14%', minWidth: '10rem'}}></Column>
                        <Column field="valorCusto" header="Valor de Custo" sortable body={valorCustoBodyTemplate} headerStyle={{width: '14%', minWidth: '10rem'}}></Column>
                        <Column field="valorVenda" header="Valor de Venda" sortable body={valorVendaBodyTemplate} headerStyle={{width: '14%', minWidth: '10rem'}}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={objetoDialog} style={{width: '450px'}} header="Cadastrar/Editar" modal className="p-fluid" footer={objetoDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="nome">Nome</label>
                            <InputText id="nome" value={objeto.nome} onChange={(e) => onInputChange(e, 'nome')} required autoFocus className={classNames({'p-invalid': submitted && !objeto.nome})}/>
                            {submitted && !objeto.nome && <small className="p-invalid">Nome é Obrigatório.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="descricao">Descrição</label>
                            <InputTextarea id="descricao" value={objeto.descricao} onChange={(e) => onInputChange(e, 'descricao')}/>
                        </div>

                        <div className="field">
                            <label htmlFor="marca">Marca</label>
                            <Dropdown optionLabel="nome" value={objeto.marca} options={marcas} filter onChange={(e) => onInputChange(e, 'marca')} placeholder="Selecione uma Marca"/>
                        </div>

                        <div className="field">
                            <label htmlFor="categoria">Categoria</label>
                            <Dropdown optionLabel="nome" value={objeto.categoria} options={categorias} filter onChange={(e) => onInputChange(e, 'categoria')} placeholder="Selecione uma Categoria"/>
                        </div>

                        <div className="field">
                            <label htmlFor="valorCusto">Valor de Custo</label>
                            <InputNumber mode="currency" currency="BRL" locale="pt-BT" id="valorCusto" value={objeto.valorCusto} onValueChange={(e) => onInputChange(e, 'valorCusto')}/>
                        </div>

                        <div className="field">
                            <label htmlFor="valorVenda">Valor de Venda</label>
                            <InputNumber mode="currency" currency="BRL" locale="pt-BT" id="valorVenda" value={objeto.valorVenda} onValueChange={(e) => onInputChange(e, 'valorVenda')}/>
                        </div>
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

export default React.memo(Produto, comparisonFn);
