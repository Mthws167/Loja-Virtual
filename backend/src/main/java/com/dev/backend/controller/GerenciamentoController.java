package com.dev.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.dev.backend.entity.Pessoa;
import com.dev.backend.security.JwtUtil;
import com.dev.backend.service.gerenciamento.GerenciamentoService;

import java.util.HashMap;

@RestController
@RequestMapping("/api/gerenciamento")
@RequiredArgsConstructor
public class GerenciamentoController {
    @Autowired
    private GerenciamentoService gerenciamentoService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/senha-codigo")
    @CrossOrigin("http://localhost:3000")
    public String recuperarCodigo(@RequestBody Pessoa pessoa) {
        return gerenciamentoService.solicitarCodigo(pessoa.getEmail());
    }

    @PostMapping("/senha-alterar")
    @CrossOrigin("http://localhost:3000")
    public String alterarSenha(@RequestBody Pessoa pessoa) {
        return gerenciamentoService.alterarSenha(pessoa);
    }

    @PostMapping("/login")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<?> login(@RequestBody Pessoa pessoa) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(pessoa.getEmail(), pessoa.getSenha()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        Pessoa autenticado = (Pessoa) authentication.getPrincipal();

        HashMap<String, Object> map = new HashMap<>();
        map.put("token", jwtUtil.gerarTokenUsername(autenticado));
        map.put("permissoes", autenticado.getAuthorities());

        return ResponseEntity.ok(map);
    }
}
