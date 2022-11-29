package com.dev.backend.service.permissao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.dev.backend.entity.Permissao;
import com.dev.backend.entity.PermissaoPessoa;
import com.dev.backend.entity.Pessoa;
import com.dev.backend.exception.InfoException;
import com.dev.backend.repository.PermissaoPessoaRepository;
import com.dev.backend.repository.PermissaoRepository;
import com.dev.backend.util.Util;
import com.dev.backend.util.UtilPermissao;

import java.util.List;
import java.util.Optional;

@Service
public class PermissaoServiceImpl implements PermissaoService {
    @Autowired
    private PermissaoRepository permissaoRepository;

    @Autowired
    private PermissaoPessoaRepository permissaoPessoaRepository;

    @Override
    public List<Permissao> buscarTodos() {
        return permissaoRepository.findAll();
    }

    @Override
    public Permissao inserir(Permissao permissao) throws InfoException {
        if (UtilPermissao.validarPermissao(permissao)) {
            permissao.setNome(Util.removerAcentos(permissao.getNome().toUpperCase()));

            return permissaoRepository.save(permissao);
        } else {
            throw new InfoException("Ocorreu um erro ao cadastrar permissão", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public Permissao alterar(Long id, Permissao permissao) throws InfoException {
        Optional<Permissao> permissaoOptional = permissaoRepository.findById(id);

        if (permissaoOptional.isPresent()) {
            Permissao permissaoBuilder = Permissao.builder()
                    .id(id)
                    .nome(permissao.getNome() != null ? permissao.getNome() : null)
                    .build();

            if (UtilPermissao.validarPermissao(permissaoBuilder)) {
                permissaoRepository.save(permissaoBuilder);
            }
            return permissaoBuilder;
        } else {
            throw new InfoException("Permissão não encontrada", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public void excluir(Long id) throws InfoException {
        Optional<Permissao> permissao = permissaoRepository.findById(id);

        if (permissao.isPresent()) {
            permissaoRepository.delete(permissao.get());
        } else {
            throw new InfoException("Permissão não encontrada", HttpStatus.NOT_FOUND);
        }
    }

    public void vincularPessoaPermissaoCliente(Pessoa pessoa) throws InfoException {
        List<Permissao> listaPermissao = permissaoRepository.findByNome("CLIENTE");

        if (listaPermissao != null && listaPermissao.size() > 0) {
            PermissaoPessoa permissaoPessoa = new PermissaoPessoa();

            permissaoPessoa.setPessoa(pessoa);
            permissaoPessoa.setPermissao(listaPermissao.get(0));
            permissaoPessoaRepository.save(permissaoPessoa);
        } else {
            throw new InfoException("Permissão não encontrada", HttpStatus.NOT_FOUND);
        }
    }
}
