package com.dev.backend.service;


import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.backend.entity.Pessoa;
import com.dev.backend.repository.PessoaRepository;

@Service
public class PessoaGerenciamentoService {

	@Autowired
	private PessoaRepository pessoaRepository;

	@Autowired
	private EmailService emailService;


	public String solicitarCodigo(String email) {
		Pessoa pessoa = pessoaRepository.findByEmail(email);
		pessoa.setCodigoRecuperacaoSenha(this.getCodigoRecuperacaoSenha(pessoa.getId()));
		pessoa.setDataEnvioCodigo(new Date());
		pessoaRepository.saveAndFlush(pessoa);
		emailService.enviarEmailTxt(pessoa.getEmail(), "Código de recuperação de senha", pessoa.getCodigoRecuperacaoSenha());
		return "código enviado com sucesso";
	}

	public String alterarSenha(Pessoa pessoa) {
		Pessoa pessoaBanco = pessoaRepository.findByEmailAndCodigoRecuperacaoSenha(pessoa.getEmail(), pessoa.getCodigoRecuperacaoSenha());
		Date diferenca = new Date(new Date().getTime() - pessoaBanco.getDataEnvioCodigo().getTime());
		if(pessoaBanco!=null) {
			if(diferenca.getTime()/1000 < 900) {
				pessoaBanco.setSenha(pessoa.getSenha());
				pessoaBanco.setCodigoRecuperacaoSenha(null);
				pessoaRepository.saveAndFlush(pessoaBanco);
				return "Senha alterada com sucesso!";
			}else {
				return "Tempo expirado, solicite um novo codigo";
			}			
		}else {
			return "Email ou código não encontrado";
		}
	}

	private String getCodigoRecuperacaoSenha(Long id) {
		DateFormat format = new SimpleDateFormat("ddMMyyyHHmmssmm");
		return format.format(new Date())+id;
	}


}