package com.dev.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PessoaDTO {
    private String nome;
    private String cpf;
    private String email;
    private String endereco;
    private String cep;
    private CidadeDTO cidade;
}
