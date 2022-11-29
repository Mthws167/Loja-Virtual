package com.dev.backend.service.marca;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.dev.backend.entity.Marca;
import com.dev.backend.exception.InfoException;
import com.dev.backend.repository.MarcaRepository;
import com.dev.backend.util.UtilMarca;

import java.util.List;
import java.util.Optional;

@Service
public class MarcaServiceImpl implements MarcaService {
    @Autowired
    private MarcaRepository marcaRepository;

    @Override
    public List<Marca> buscarTodos() {
        return marcaRepository.findAll();
    }

    @Override
    public Marca inserir(Marca marca) throws InfoException {
        if (UtilMarca.validarMarca(marca)) {
            return marcaRepository.save(marca);
        } else {
            throw new InfoException("Ocorreu um erro ao cadastrar marca", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public Marca alterar(Long id, Marca marca) throws InfoException {
        Optional<Marca> marcaOptional = marcaRepository.findById(id);

        if (marcaOptional.isPresent()) {
            Marca marcaBuilder = Marca.builder()
                    .id(id)
                    .nome(marca.getNome() != null ? marca.getNome() : null)
                    .build();

            if (UtilMarca.validarMarca(marcaBuilder)) {
                marcaRepository.save(marcaBuilder);
            }
            return marcaBuilder;
        } else {
            throw new InfoException("Marca não encontrada", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public void excluir(Long id) throws InfoException {
        Optional<Marca> marca = marcaRepository.findById(id);

        if (marca.isPresent()) {
            marcaRepository.delete(marca.get());
        } else {
            throw new InfoException("Marca não encontrada", HttpStatus.NOT_FOUND);
        }
    }
}
