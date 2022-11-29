package com.dev.backend.util;

import org.springframework.http.HttpStatus;

import com.dev.backend.dto.ClienteRequestDTO;
import com.dev.backend.entity.Pessoa;
import com.dev.backend.exception.InfoException;

public class UtilPessoa {
    public static Boolean validarPessoa(Pessoa pessoa) throws InfoException {
        if (pessoa.getNome() == null || pessoa.getNome().equals("")) {
            throw new InfoException("MESSAGE.NOME_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        if (pessoa.getCpf() == null || pessoa.getCpf().equals("")) {
            throw new InfoException("MESSAGE.CPF_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        if (pessoa.getEmail() == null || pessoa.getEmail().equals("")) {
            throw new InfoException("MESSAGE.EMAIL_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        if (pessoa.getEndereco() == null || pessoa.getEndereco().equals("")) {
            throw new InfoException("MESSAGE.ENDERECO_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        if (pessoa.getCep() == null || pessoa.getCep().equals("")) {
            throw new InfoException("MESSAGE.CEP_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        if (pessoa.getCidade() == null) {
            throw new InfoException("MESSAGE.CIDADE_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        return true;
    }

    public static Boolean validarClienteRequestDTO(ClienteRequestDTO cliente) throws InfoException {
        if (cliente.getNome() == null || cliente.getNome().equals("")) {
            throw new InfoException("MESSAGE.NOME_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        if (cliente.getCpf() == null || cliente.getCpf().equals("")) {
            throw new InfoException("MESSAGE.CPF_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        if (cliente.getEmail() == null || cliente.getEmail().equals("")) {
            throw new InfoException("MESSAGE.EMAIL_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        if (cliente.getEndereco() == null || cliente.getEndereco().equals("")) {
            throw new InfoException("MESSAGE.ENDERECO_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        if (cliente.getCep() == null || cliente.getCep().equals("")) {
            throw new InfoException("MESSAGE.CEP_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        if (cliente.getCidade() == null) {
            throw new InfoException("MESSAGE.CIDADE_REQUIRED", HttpStatus.BAD_REQUEST);
        }
        return true;
    }
}
