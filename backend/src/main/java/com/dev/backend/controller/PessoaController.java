package com.dev.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dev.backend.entity.Pessoa;
import com.dev.backend.exception.InfoException;
import com.dev.backend.service.pessoa.PessoaService;

import java.util.List;

@RestController
@RequestMapping("/api/pessoa")
@RequiredArgsConstructor
public class PessoaController {

    private final PessoaService pessoaService;

    @GetMapping
    @CrossOrigin("http://localhost:3000")
    public List<Pessoa> buscarTodos() {
        return pessoaService.buscarTodos();
    }

    @PostMapping("/cadastrar")
    @CrossOrigin("http://localhost:3000")
    public Pessoa inserir(@RequestBody Pessoa pessoa) throws InfoException {
        return pessoaService.inserir(pessoa);
    }

    @PutMapping("/atualizar/{id}")
    @CrossOrigin("http://localhost:3000")
    public Pessoa alterar(@PathVariable("id") Long id, @RequestBody Pessoa pessoa) throws InfoException {
        return pessoaService.alterar(id, pessoa);
    }

    @DeleteMapping("/deletar/{id}")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) throws InfoException {
        pessoaService.excluir(id);
        return ResponseEntity.ok().build();
    }
}
