package com.dev.backend.service.estado;

import java.util.List;

import com.dev.backend.entity.Estado;
import com.dev.backend.exception.InfoException;

public interface EstadoService {
    List<Estado> buscarTodos();

    Estado inserir(Estado estado) throws InfoException;

    Estado alterar(Long id, Estado estado) throws InfoException;

    void excluir(Long id) throws InfoException;
}
