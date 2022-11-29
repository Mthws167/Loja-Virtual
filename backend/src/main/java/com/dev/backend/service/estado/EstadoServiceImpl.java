package com.dev.backend.service.estado;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.dev.backend.entity.Estado;
import com.dev.backend.exception.InfoException;
import com.dev.backend.repository.EstadoRepository;
import com.dev.backend.util.UtilEstado;

import java.util.List;
import java.util.Optional;

@Service
public class EstadoServiceImpl implements EstadoService {
    @Autowired
    private EstadoRepository estadoRepository;

    @Override
    public List<Estado> buscarTodos() {
        return estadoRepository.findAll();
    }

    @Override
    public Estado inserir(Estado estado) throws InfoException {
        if (UtilEstado.validarEstado(estado)) {
            return estadoRepository.save(estado);
        } else {
            throw new InfoException("Ocorreu um erro ao cadastrar estado", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public Estado alterar(Long id, Estado estado) throws InfoException {
        Optional<Estado> estadoOptional = estadoRepository.findById(id);

        if (estadoOptional.isPresent()) {
            Estado estadoBuilder = Estado.builder()
                    .id(id)
                    .nome(estado.getNome() != null ? estado.getNome() : null)
                    .sigla(estado.getSigla() != null ? estado.getSigla() : null)
                    .build();

            if (UtilEstado.validarEstado(estadoBuilder)) {
                estadoRepository.save(estadoBuilder);
            }
            return estadoBuilder;
        } else {
            throw new InfoException("Estado não encontrado", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public void excluir(Long id) throws InfoException {
        Optional<Estado> estado = estadoRepository.findById(id);

        if (estado.isPresent()) {
            estadoRepository.delete(estado.get());
        } else {
            throw new InfoException("Estado não encontrado", HttpStatus.NOT_FOUND);
        }
    }
}
