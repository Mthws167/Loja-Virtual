package com.dev.backend.service.marca;

import java.util.List;

import com.dev.backend.entity.Marca;
import com.dev.backend.exception.InfoException;

public interface MarcaService {
    List<Marca> buscarTodos();

    Marca inserir(Marca marca) throws InfoException;

    Marca alterar(Long id, Marca marca) throws InfoException;

    void excluir(Long id) throws InfoException;
}
