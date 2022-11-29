package com.dev.backend.util;

import org.springframework.http.HttpStatus;

import com.dev.backend.dto.CategoriaDTO;
import com.dev.backend.entity.Categoria;
import com.dev.backend.exception.InfoException;

public class UtilCategoria {
    public static Boolean validarCategoria(Categoria categoria) throws InfoException {
        if (categoria.getNome() == null || categoria.getNome().equals("")) {
            throw new InfoException("MESSAGE.NOME_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        return true;
    }

    public static CategoriaDTO converteCategoria(Categoria categoria) {
        return CategoriaDTO.builder()
                .nome(categoria.getNome())
                .build();
    }
}
