package com.dev.backend.util;

import org.springframework.http.HttpStatus;

import com.dev.backend.entity.Estado;
import com.dev.backend.exception.InfoException;

public class UtilEstado {
    public static Boolean validarEstado(Estado estado) throws InfoException {
        if (estado.getNome() == null || estado.getNome().equals("")) {
            throw new InfoException("MESSAGE.NOME_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        if (estado.getSigla() == null || estado.getSigla().equals("")) {
            throw new InfoException("MESSAGE.SIGLA_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        return true;
    }
}
