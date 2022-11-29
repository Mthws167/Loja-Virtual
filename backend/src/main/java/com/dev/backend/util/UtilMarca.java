package com.dev.backend.util;

import org.springframework.http.HttpStatus;

import com.dev.backend.entity.Marca;
import com.dev.backend.exception.InfoException;

public class UtilMarca {
    public static Boolean validarMarca(Marca marca) throws InfoException {
        if (marca.getNome() == null || marca.getNome().equals("")) {
            throw new InfoException("MESSAGE.NOME_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        return true;
    }
}
