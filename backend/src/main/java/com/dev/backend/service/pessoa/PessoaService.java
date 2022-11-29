package com.dev.backend.service.pessoa;

import java.util.List;

import com.dev.backend.entity.Pessoa;
import com.dev.backend.exception.InfoException;

public interface PessoaService {
    List<Pessoa> buscarTodos();

    Pessoa inserir(Pessoa pessoa) throws InfoException;

    Pessoa alterar(Long id, Pessoa pessoa) throws InfoException;

    void excluir(Long id) throws InfoException;
}
