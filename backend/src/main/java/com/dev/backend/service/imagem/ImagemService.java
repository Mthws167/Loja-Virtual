package com.dev.backend.service.imagem;

import org.springframework.web.multipart.MultipartFile;

import com.dev.backend.entity.Imagem;
import com.dev.backend.exception.InfoException;

import java.io.IOException;
import java.util.List;

public interface ImagemService {
    List<Imagem> buscarTodos();

    List<Imagem> buscarPorProdutoId(Long id);

    Imagem inserir(Long idProduto, MultipartFile multipartFile) throws IOException, InfoException;

    Imagem alterar(Long id, Imagem imagem) throws InfoException;

    void excluir(Long id) throws InfoException;
}
