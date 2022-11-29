package com.dev.backend.util;

import org.springframework.http.HttpStatus;

import com.dev.backend.entity.Permissao;
import com.dev.backend.exception.InfoException;

public class UtilPermissao {
    public static Boolean validarPermissao(Permissao permissao) throws InfoException {
        if (permissao.getNome() == null || permissao.getNome().equals("")) {
            throw new InfoException("MESSAGE.NOME_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        return true;
    }
}
