import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { ProdutoService } from '../../service/cadastros/ProdutoService';
import Axios from 'axios';

const Produto = () => {

    let objetoNovo = {
        descricaoCurta: '',
        descricaoDetalhada: '',
        valorCusto:'',
        valorVenda: '',
    };

    const [objetos, setObjetos] = useState(null);
    const [objeto, setObjeto] = useState(objetoNovo);
    const [objetoDialog, setObjetoDialog] = useState(false);
    const [objetoDeleteDialog, setObjetoDeleteDialog] = useState(false);
    const [atualizar, setAtualizar] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const objetoService = new ProdutoService();

    useEffect(() => {
        if(objetos == null){
            objetoService.listarTodos().then(res =>{
                console.log(res.data);
                setObjetos(res.data);
            })
        }
    }, [objetos]);

    function listarProdutos() {
        Axios.get("http://localhost:8080/api/produto/").then(result => {
            setObjetos(result.data);
        });
    }

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

        if(objeto.descricaoCurta.trim()){
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
            }
            setObjetoDialog(false);
            setObjeto(objetoNovo);
        }
    }

    const editObjeto = (objeto) =>{
        setObjeto({...objeto});
        setObjetoDialog(true);
    }

    const confirmDeleteObjeto = (objeto) => {
        objetoService.excluir(objeto.id).then(data => {
            toast.current.show({severity: 'success', summary: 'Sucesso', detail: "Removido"});

            setObjetos(null);
            setObjetoDeleteDialog(false);
        })
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.targe.value) || '';
        let _objeto = {...objeto};
        _objeto[`${name}`] = val;

        setObjeto(_objeto);
    }

    const leftToolbarTemplate = () => {
        return (
        <React.Fragment>
            <div className='my-2'>
                <Button label="Novo Produto" icon="pi pi-plus" className='p-button-success'/>
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

    const descricaoCurtaBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'>descricaoCurta</span>
                {rowData.descricaoCurta}
            </>
        );
    }

    const siglaBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'>sigla</span>
                {rowData.sigla}
            </>
        );
    }

    const header = (
        <div className='flex flex-column md:flex-row md:justify-content-between md:align-items-center'>
            <h5 className='m-0'>Produtos Cadastrados</h5>
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
        </>
    );

    const deleteObjetoDialogFooter = (
        <>
            <Button label='Não' icon="pi pi-times" className='p-button-text' onClick={hideDeleteObjetoDialog}/>
            <Button label='Salvar' icon='pi pi-checks' className='p-button-text' onClick={confirmDeleteObjeto}/>
        </>
    )
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />

                    <DataTable ref={dt} value={objetos} dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter} emptyMessage="No products found." header={header} responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="id" header="id" sortable body={idBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="descricaoCurta" header="Nome" sortable body={descricaoCurtaBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="sigla" header="Sigla" sortable body={siglaBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={objetoDialog} style={{width: '450px'}} header='Cadastro Produto'>
                    
                        <div className="field">
                            <label htmlFor="descricaoCurta">Descrição Curta</label>
                            <InputText id="descricaoCurta" value={objeto.descricaoCurta} onChange={(e) => onInputChange(e, 'descricaoCurta')} required autoFocus className={classNames({ 'p-invalid': submitted && !objeto.descricaoCurta })} />
                            {submitted && !objeto.descricaoCurta && <small className="p-invalid">Descrição Curta é requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="descricaoDetalhada">Descrição Detalhada</label>
                            <InputText id="descricaoDetalhada" value={objeto.descricaoDetalhada} onChange={(e) => onInputChange(e, 'descricaoDetalhada')} required autoFocus className={classNames({ 'p-invalid': submitted && !objeto.descricaoDetalhada })} />
                            {submitted && !objeto.descricaoDetalhada && <small className="p-invalid">Descrição Detalhada é requerida.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="valorCusto">Valor Custo</label>
                            <InputNumber mode="currency" currency="BRL" locale="pt-BT" id="valorCusto" value={objeto.valorCusto} onValueChange={(e) => onInputChange(e, 'valorCusto')} required autoFocus className={classNames({ 'p-invalid': submitted && !objeto.valorCusto })} />
                            {submitted && !objeto.valorCusto && <small className="p-invalid">Valor Custo é requerido.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="valorVenda">Valor Venda</label>
                            <InputNumber mode="currency" currency="BRL" locale="pt-BT" id="valorVenda" value={objeto.valorVenda} onValueChange={(e) => onInputChange(e, 'valorVenda')} required autoFocus className={classNames({ 'p-invalid': submitted && !objeto.valorVenda })} />
                            {submitted && !objeto.valorVenda && <small className="p-invalid">Valor Venda é requerida.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={objetoDeleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteObjetoDialogFooter} onHide={hideDeleteObjetoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {objeto && <span>tem certeza que quer excluir?</span>}
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