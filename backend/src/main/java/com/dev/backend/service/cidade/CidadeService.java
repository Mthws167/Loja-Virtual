package com.dev.backend.service.cidade;

import java.util.List;

import com.dev.backend.entity.Cidade;
import com.dev.backend.exception.InfoException;

public interface CidadeService {
    List<Cidade> buscarTodos();

    Cidade inserir(Cidade cidade) throws InfoException;

    Cidade alterar(Long id, Cidade cidade) throws InfoException;

    void excluir(Long id) throws InfoException;
}
