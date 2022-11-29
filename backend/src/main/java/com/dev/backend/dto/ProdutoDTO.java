package com.dev.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProdutoDTO {
    private String nome;
    private String descricao;
    private Double valorCusto;
    private Double valorVenda;
    private MarcaDTO marca;
    private CategoriaDTO categoria;
}
