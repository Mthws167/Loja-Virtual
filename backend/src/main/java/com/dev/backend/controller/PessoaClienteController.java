package com.dev.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev.backend.dto.PessoaClienteRequestDTO;
import com.dev.backend.entity.Pessoa;
import com.dev.backend.exception.BadResourceException;
import com.dev.backend.exception.ResourceAlreadyExistsException;
import com.dev.backend.service.PessoaClienteService;

@RestController
@RequestMapping("api/cliente")
public class PessoaClienteController {
	
	@Autowired
	private PessoaClienteService pessoaClienteService;
	
	
	@PostMapping("/")
	public Pessoa inserir(@RequestBody PessoaClienteRequestDTO pessoaClienteRequestDTO) throws ResourceAlreadyExistsException, BadResourceException {
		Pessoa pessoa = new PessoaClienteRequestDTO().converter(pessoaClienteRequestDTO);
		return pessoaClienteService.registrar(pessoaClienteRequestDTO);
		
	}
	
//	@PutMapping("/")
//	public Pessoa alterar(@RequestBody Pessoa pessoa) {
//		return pessoaService.alterar(pessoa);
//	}
//	
//	@DeleteMapping("/{id}")
//	public ResponseEntity<Void> excluir(@PathVariable("id") Long id){
//		pessoaService.excluir(id);
//		return ResponseEntity.ok().build();
//	}

}
