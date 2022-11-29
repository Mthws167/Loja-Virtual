package com.dev.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dev.backend.entity.Categoria;
import com.dev.backend.exception.InfoException;
import com.dev.backend.service.categoria.CategoriaService;

import java.util.List;

@RestController
@RequestMapping("/api/categoria")
@RequiredArgsConstructor
public class CategoriaController {

    private final CategoriaService categoriaService;

    @GetMapping
    @CrossOrigin("http://localhost:3000")
    public List<Categoria> buscarTodos() {
        return categoriaService.buscarTodos();
    }

    @PostMapping("/cadastrar")
    @CrossOrigin("http://localhost:3000")
    public Categoria inserir(@RequestBody Categoria categoria) throws InfoException {
        return categoriaService.inserir(categoria);
    }

    @PutMapping("/atualizar/{id}")
    @CrossOrigin("http://localhost:3000")
    public Categoria alterar(@PathVariable("id") Long id, @RequestBody Categoria categoria) throws InfoException {
        return categoriaService.alterar(id, categoria);
    }

    @DeleteMapping("/deletar/{id}")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) throws InfoException {
        categoriaService.excluir(id);
        return ResponseEntity.ok().build();
    }
}
