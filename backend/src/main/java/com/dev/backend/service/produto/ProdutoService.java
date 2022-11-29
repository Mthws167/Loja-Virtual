package com.dev.backend.service.produto;

import java.util.List;

import com.dev.backend.entity.Produto;
import com.dev.backend.exception.InfoException;

public interface ProdutoService {
    List<Produto> buscarTodos();

    Produto buscarPorId(Long id) throws InfoException;

    Produto inserir(Produto produto) throws InfoException;

    Produto alterar(Long id, Produto produto) throws InfoException;

    void excluir(Long id) throws InfoException;
}
