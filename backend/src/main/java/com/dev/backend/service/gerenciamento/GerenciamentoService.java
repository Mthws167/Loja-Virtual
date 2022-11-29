package com.dev.backend.service.gerenciamento;

import com.dev.backend.entity.Pessoa;

public interface GerenciamentoService {
    String solicitarCodigo(String email);

    String alterarSenha(Pessoa pessoa);
}
