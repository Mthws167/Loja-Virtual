package com.dev.backend.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "imagem")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Imagem extends Auditavel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @ManyToOne
    @JoinColumn(name = "id_produto")
    private Produto produto;

    @Transient
    private byte[] arquivo;
}
