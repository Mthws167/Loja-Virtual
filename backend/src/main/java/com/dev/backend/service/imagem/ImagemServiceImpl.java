package com.dev.backend.service.imagem;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dev.backend.entity.Imagem;
import com.dev.backend.entity.Produto;
import com.dev.backend.exception.InfoException;
import com.dev.backend.repository.ImagemRepository;
import com.dev.backend.repository.ProdutoRepository;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class ImagemServiceImpl implements ImagemService {
    @Autowired
    private ImagemRepository imagemRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Override
    public List<Imagem> buscarTodos() {
        return imagemRepository.findAll();
    }

    @Override
    public List<Imagem> buscarPorProdutoId(Long id) {
        List<Imagem> listaProdutoImagens = imagemRepository.findByProdutoId(id);

        for (Imagem produtoImagens : listaProdutoImagens) {
            try (InputStream inputStream = new FileInputStream("D:\\Usuário\\ImagensPW\\" + produtoImagens.getNome())) {
                produtoImagens.setArquivo(IOUtils.toByteArray(inputStream));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return listaProdutoImagens;
    }

    @Override
    public Imagem inserir(Long idProduto, MultipartFile multipartFile) throws IOException, InfoException {
        Optional<Produto> produtoOptional = produtoRepository.findById(idProduto);
        Imagem imagem = new Imagem();

        if (produtoOptional.isPresent()) {
            try {
                if (!multipartFile.isEmpty()) {
                    String nomeImagem = "produto_" + produtoOptional.get().getId() + "_" + multipartFile.getOriginalFilename();
                    Files.write(Paths.get("D:\\Usuário\\ImagensPW\\" + nomeImagem), multipartFile.getBytes());

                    imagem.setNome(nomeImagem);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            imagem.setProduto(produtoOptional.get());
            imagem = imagemRepository.save(imagem);
            return imagem;
        } else {
            throw new InfoException("Erro ao salvar imagem", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public Imagem alterar(Long id, Imagem imagem) throws InfoException {
        return null;
    }

    @Override
    public void excluir(Long id) throws InfoException {
        Optional<Imagem> imagem = imagemRepository.findById(id);

        if (imagem.isPresent()) {
            imagemRepository.delete(imagem.get());
        } else {
            throw new InfoException("Imagem não encontrada", HttpStatus.NOT_FOUND);
        }
    }
}
