package com.dev.backend.service.pessoa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.dev.backend.entity.Cidade;
import com.dev.backend.entity.Pessoa;
import com.dev.backend.exception.InfoException;
import com.dev.backend.repository.CidadeRepository;
import com.dev.backend.repository.PessoaRepository;
import com.dev.backend.util.UtilPessoa;

import java.util.List;
import java.util.Optional;

@Service
public class PessoaServiceImpl implements PessoaService {
    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private CidadeRepository cidadeRepository;

    @Override
    public List<Pessoa> buscarTodos() {
        return pessoaRepository.findAll();
    }

    @Override
    public Pessoa inserir(Pessoa pessoa) throws InfoException {
        Optional<Cidade> optionalCidade = cidadeRepository.findById(pessoa.getCidade().getId());

        if (optionalCidade.isEmpty()) {
            throw new InfoException("Cidade não encontrada", HttpStatus.BAD_REQUEST);
        } else {
            if (UtilPessoa.validarPessoa(pessoa)) {
                pessoa.setCidade(optionalCidade.get());

                return pessoaRepository.save(pessoa);
            } else {
                throw new InfoException("Ocorreu um erro ao cadastrar pessoa", HttpStatus.BAD_REQUEST);
            }
        }
    }

    @Override
    public Pessoa alterar(Long id, Pessoa pessoa) throws InfoException {
        Optional<Pessoa> pessoaOptional = pessoaRepository.findById(id);
        Optional<Cidade> optionalCidade = cidadeRepository.findById(pessoa.getCidade().getId());

        if (optionalCidade.isEmpty()) {
            throw new InfoException("Cidade não encontrada", HttpStatus.BAD_REQUEST);
        } else {
            if (pessoaOptional.isPresent()) {
                Pessoa pessoaBuilder = Pessoa.builder()
                        .id(id)
                        .nome(pessoa.getNome() != null ? pessoa.getNome() : null)
                        .cpf(pessoa.getCpf() != null ? pessoa.getCpf() : null)
                        .email(pessoa.getEmail() != null ? pessoa.getEmail() : null)
                        .senha(pessoa.getSenha() != null ? pessoa.getSenha() : null)
                        .endereco(pessoa.getEndereco() != null ? pessoa.getEndereco() : null)
                        .cep(pessoa.getCep() != null ? pessoa.getCep() : null)
                        .cidade(pessoa.getCidade() != null ? pessoa.getCidade() : null)
                        .permissaoPessoas(pessoa.getPermissaoPessoas() != null && pessoa.getPermissaoPessoas().size() > 0 ? pessoa.getPermissaoPessoas() : null)
                        .build();

                if (UtilPessoa.validarPessoa(pessoaBuilder)) {
                    pessoaRepository.save(pessoaBuilder);
                }
                return pessoaBuilder;
            } else {
                throw new InfoException("Pessoa não encontrada", HttpStatus.NOT_FOUND);
            }
        }
    }

    @Override
    public void excluir(Long id) throws InfoException {
        Optional<Pessoa> pessoa = pessoaRepository.findById(id);

        if (pessoa.isPresent()) {
            pessoaRepository.delete(pessoa.get());
        } else {
            throw new InfoException("Pessoa não encontrada", HttpStatus.NOT_FOUND);
        }
    }
}
