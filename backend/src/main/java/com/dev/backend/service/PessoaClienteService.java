package com.dev.backend.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.dev.backend.dto.PessoaClienteRequestDTO;
import com.dev.backend.entity.Pessoa;
import com.dev.backend.exception.BadResourceException;
import com.dev.backend.exception.ResourceAlreadyExistsException;
import com.dev.backend.repository.PessoaClienteRepository;

@Service
public class PessoaClienteService {

	private static final String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
			+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
	private static final Pattern pattern = Pattern.compile(EMAIL_PATTERN, Pattern.CASE_INSENSITIVE);

	@Autowired
	private PessoaClienteRepository pessoaClienteRepository;
	
	@Autowired
	private PermissaoPessoaService permissaoPessoaService;
	
	@Autowired
	private EmailService emailService;

//	public List<Pessoa> buscarTodos() {
//		return pessoaRepository.findAll();
//	}
	
	private boolean existeId(Long id) {
		return pessoaClienteRepository.existsById(id);
	}

	public Pessoa registrar(PessoaClienteRequestDTO pessoaClienteRequestDTO) throws ResourceAlreadyExistsException, BadResourceException {
		Pessoa pessoa = new PessoaClienteRequestDTO().converter(pessoaClienteRequestDTO);
		if (!StringUtils.isEmpty(pessoa.getNome()) && validarCPF(pessoa.getCpf())) {
			Matcher matcher = pattern.matcher(pessoa.getEmail());
			if (matcher.matches() == false)
				pessoa.setEmail("");
			// pessoa.setImagemPerfilBase64(Base64.getEncoder().encode(pessoa.getImagemPerfilBase64()));;
//			pessoa.setSenha(new BCryptPasswordEncoder().encode(pessoa.getSenha()));
			if (pessoa.getCpf() != null && !pessoa.getCpf().isEmpty()) {
				throw new ResourceAlreadyExistsException("Pessoa com o CPF: " + pessoa.getCpf() + "\n já existe");
			}
			if (pessoa.getId() != null && existeId(pessoa.getId())) {
				throw new ResourceAlreadyExistsException("Pessoa com o id: " + pessoa.getId() + "\n já existe");
			}
			pessoa.setDataCriacao(new Date());
			Pessoa pessoaNovo = pessoaClienteRepository.saveAndFlush(pessoa);
			permissaoPessoaService.vincularPessoaPermissaoCliente(pessoaNovo);
			Map<String, Object> propMap = new HashMap<String, Object>();
			propMap.put("nome", pessoaNovo.getNome());
			propMap.put("mensagem", "o registro na loja foi realizado com sucesso");
			emailService.enviarEmailTemplate(pessoaNovo.getEmail(), "Cadastro na loja", propMap);
			//"Cadastro na Loja Virtual","Registro na Loja Virtual realizado com sucesso. Em breve você receberá a senha de e acesso por e-mail!"
			return pessoaNovo;
		} else {
			BadResourceException exc = new BadResourceException("Erro ao salvar Pessoa");
			exc.addErrorMessages("Pessoa está vazio ou é nulo");
			throw exc;
		}
	}

//	public Pessoa alterar(Pessoa pessoa) {
//		pessoa.setDataCriacao(new Date());
//		return pessoaRepository.saveAndFlush(pessoa);
//	}
//
//	public void excluir(Long id) {
//		Pessoa pessoa = pessoaRepository.findById(id).get();
//		pessoaRepository.delete(pessoa);
//	}

	public static boolean validarCPF(String CPF) {

		if (CPF.equals("00000000000") || CPF.equals("11111111111") || CPF.equals("22222222222")
				|| CPF.equals("33333333333") || CPF.equals("44444444444") || CPF.equals("55555555555")
				|| CPF.equals("66666666666") || CPF.equals("77777777777") || CPF.equals("88888888888")
				|| CPF.equals("99999999999") || (CPF.length() != 11))
			return (false);

		char dig10, dig11;
		int sm, i, r, num, peso;

		try {
			sm = 0;
			peso = 10;
			for (i = 0; i < 9; i++) {
				num = (int) (CPF.charAt(i) - 48);
				sm = sm + (num * peso);
				peso = peso - 1;
			}

			r = 11 - (sm % 11);
			if ((r == 10) || (r == 11))
				dig10 = '0';
			else
				dig10 = (char) (r + 48);

			sm = 0;
			peso = 11;
			for (i = 0; i < 10; i++) {
				num = (int) (CPF.charAt(i) - 48);
				sm = sm + (num * peso);
				peso = peso - 1;
			}

			r = 11 - (sm % 11);
			if ((r == 10) || (r == 11))
				dig11 = '0';
			else
				dig11 = (char) (r + 48);

			if ((dig10 == CPF.charAt(9)) && (dig11 == CPF.charAt(10)))
				return (true);
			else
				return (false);
		} catch (java.util.InputMismatchException erro) {
			return (false);
		}
	}
}
