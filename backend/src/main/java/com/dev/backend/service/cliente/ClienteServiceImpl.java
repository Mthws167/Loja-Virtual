package com.dev.backend.service.cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.dev.backend.dto.ClienteRequestDTO;
import com.dev.backend.entity.Pessoa;
import com.dev.backend.exception.InfoException;
import com.dev.backend.repository.ClienteRepository;
import com.dev.backend.service.email.EmailService;
import com.dev.backend.service.permissao.PermissaoService;
import com.dev.backend.util.UtilPessoa;

import java.util.HashMap;
import java.util.Map;

@Service
public class ClienteServiceImpl implements ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PermissaoService permissaoService;

    @Autowired
    private EmailService emailService;

    @Override
    public Pessoa inserir(ClienteRequestDTO clienteRequestDTO) throws InfoException {
        if (UtilPessoa.validarClienteRequestDTO(clienteRequestDTO)) {
            Pessoa pessoa = clienteRepository.save(ClienteRequestDTO.converter(clienteRequestDTO));
            permissaoService.vincularPessoaPermissaoCliente(pessoa);

            Map<String, Object> proprMap = new HashMap<>();
            proprMap.put("nome", pessoa.getNome());
            proprMap.put("mensagem", "O registro na Loja Virtual PW foi realizado com sucesso! Em breve você receberá a senha de acesso por E-mail.");

            emailService.enviarEmailTemplate(pessoa.getEmail(), "O seu cadastro na Loja Virtual PW foi realizado com sucesso!", proprMap);

            return pessoa;
        } else {
            throw new InfoException("Ocorreu um erro ao salvar Cliente", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
