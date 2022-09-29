package com.dev.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dev.backend.entity.Produto;
import com.dev.backend.entity.ProdutoImagem;
import com.dev.backend.repository.ProdutoImagemRepository;
import com.dev.backend.repository.ProdutoRepository;

@Service
public class ProdutoImagemService {

	@Autowired
	private ProdutoImagemRepository produtoImagemRepository;

	@Autowired
	private ProdutoRepository produtoRepository;
	
	public List<ProdutoImagem> buscarTodos(){
		return produtoImagemRepository.findAll();
	}
	
	public ProdutoImagem inserir(Long idProduto, MultipartFile file) {
		Produto produto = produtoRepository.findById(idProduto).get();
		ProdutoImagem objeto = new ProdutoImagem();
		try {
			if(!file.isEmpty()) {
				byte[] bytes = file.getBytes();
				String nomeImagem = String.valueOf(produto.getId())+file.getOriginalFilename();
				Path caminho = Paths.get("c:/imagens/"+nomeImagem);
				Files.write(caminho,bytes);
				objeto.setNome(nomeImagem);
			}
		}catch(IOException e) {
			e.printStackTrace();
		}
		objeto.setProduto(produto);
		objeto.setDataCriacao(new Date());
		objeto =  produtoImagemRepository.saveAndFlush(objeto);
		return objeto;
	}
	
	public ProdutoImagem alterar(ProdutoImagem objeto){
		objeto.setDataAtualizacao(new Date());
		return produtoImagemRepository.saveAndFlush(objeto);
	}
	
	public void excluir(Long id) {
		ProdutoImagem objeto = produtoImagemRepository.findById(id).get();
		produtoImagemRepository.delete(objeto);
	}
	
}
