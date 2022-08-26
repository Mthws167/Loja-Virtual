package com.dev.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dev.backend.entity.ProdutoImagem;
import com.dev.backend.service.ProdutoImagemService;

@RestController
@RequestMapping("api/produtoImagem")
public class ProdutoImagemController {
	
	@Autowired
	private ProdutoImagemService produtoImagemService;
	
	@GetMapping("/")
	public List<ProdutoImagem> buscarTodos(){
		return produtoImagemService.buscarTodos();
	}
	
	@PostMapping("/")
	public ProdutoImagem inserir(@RequestParam("idProduto") Long idProduto,@RequestParam("file") MultipartFile file) {
		return produtoImagemService.inserir(idProduto, file);
	}
	
	@PutMapping("/")
	public ProdutoImagem alterar(@RequestBody ProdutoImagem objeto) {
		return produtoImagemService.alterar(objeto);
	}
	
	@DeleteMapping("/")
	public ResponseEntity<Void> excluir(@PathVariable("id") Long id){
		produtoImagemService.excluir(id);
		return ResponseEntity.ok().build();	
		}
}
