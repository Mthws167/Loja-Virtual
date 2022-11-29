package com.dev.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dev.backend.entity.Produto;
import com.dev.backend.exception.InfoException;
import com.dev.backend.service.produto.ProdutoService;

import java.util.List;

@RestController
@RequestMapping("/api/produto")
@RequiredArgsConstructor
public class ProdutoController {

    private final ProdutoService produtoService;

    @GetMapping
    @CrossOrigin("http://localhost:3000")
    public List<Produto> buscarTodos() {
        return produtoService.buscarTodos();
    }

    @GetMapping("/{id}")
    @CrossOrigin("http://localhost:3000")
    public Produto buscarPorId(@PathVariable("id") Long id) throws InfoException {
        return produtoService.buscarPorId(id);
    }

    @PostMapping("/cadastrar")
    @CrossOrigin("http://localhost:3000")
    public Produto inserir(@RequestBody Produto produto) throws InfoException {
        return produtoService.inserir(produto);
    }

    @PutMapping("/atualizar/{id}")
    @CrossOrigin("http://localhost:3000")
    public Produto alterar(@PathVariable("id") Long id, @RequestBody Produto produto) throws InfoException {
        return produtoService.alterar(id, produto);
    }

    @DeleteMapping("/deletar/{id}")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) throws InfoException {
        produtoService.excluir(id);
        return ResponseEntity.ok().build();
    }
}
