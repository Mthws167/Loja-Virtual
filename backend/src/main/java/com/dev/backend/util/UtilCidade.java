package com.dev.backend.util;

import org.springframework.http.HttpStatus;

import com.dev.backend.entity.Cidade;
import com.dev.backend.exception.InfoException;

public class UtilCidade {
    public static Boolean validarCidade(Cidade cidade) throws InfoException {
        if (cidade.getNome() == null || cidade.getNome().equals("")) {
            throw new InfoException("MESSAGE.NOME_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        if (cidade.getEstado() == null) {
            throw new InfoException("MESSAGE.ESTADO_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        return true;
    }
}
