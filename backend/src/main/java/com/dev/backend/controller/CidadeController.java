package com.dev.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dev.backend.entity.Cidade;
import com.dev.backend.exception.InfoException;
import com.dev.backend.service.cidade.CidadeService;

import java.util.List;

@RestController
@RequestMapping("/api/cidade")
@RequiredArgsConstructor
public class CidadeController {

    private final CidadeService cidadeService;

    @GetMapping
    @CrossOrigin("http://localhost:3000")
    public List<Cidade> buscarTodos() {
        return cidadeService.buscarTodos();
    }

    @PostMapping("/cadastrar")
    @CrossOrigin("http://localhost:3000")
    public Cidade inserir(@RequestBody Cidade cidade) throws InfoException {
        return cidadeService.inserir(cidade);
    }

    @PutMapping("/atualizar/{id}")
    @CrossOrigin("http://localhost:3000")
    public Cidade alterar(@PathVariable("id") Long id, @RequestBody Cidade cidade) throws InfoException {
        return cidadeService.alterar(id, cidade);
    }

    @DeleteMapping("/deletar/{id}")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) throws InfoException {
        cidadeService.excluir(id);
        return ResponseEntity.ok().build();
    }
}
