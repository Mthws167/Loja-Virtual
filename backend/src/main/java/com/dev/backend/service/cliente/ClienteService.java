package com.dev.backend.service.cliente;

import com.dev.backend.dto.ClienteRequestDTO;
import com.dev.backend.entity.Pessoa;
import com.dev.backend.exception.InfoException;

public interface ClienteService {
    Pessoa inserir(ClienteRequestDTO clienteRequestDTO) throws InfoException;
}
