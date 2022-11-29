package com.dev.backend.dto;

import com.dev.backend.entity.Cidade;
import com.dev.backend.entity.Pessoa;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClienteRequestDTO {
    private String nome;
    private String cpf;
    private String email;
    private String endereco;
    private String cep;
    private Cidade cidade;

    public static Pessoa converter(ClienteRequestDTO clienteRequestDTO) {
        return Pessoa.builder()
                .nome(clienteRequestDTO.getNome())
                .cpf(clienteRequestDTO.getCpf())
                .email(clienteRequestDTO.getEmail())
                .endereco(clienteRequestDTO.getEmail())
                .cep(clienteRequestDTO.getCep())
                .cidade(clienteRequestDTO.getCidade()).build();
    }
}
