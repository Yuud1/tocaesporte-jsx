package com.blog.Service;

import com.blog.Entity.BlogEntity;
import com.blog.Repository.BlogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * O serviço para gerenciar operações relacionadas a blogs.
 * O serviço contém a lógica de negócio e interage com o repositório
 * BlogRepository para acessar e manipular dados do blogs.
 */
@Service
public class BlogService {

    // Atributo que representa o repository do blog
    private final BlogRepository blogRepository;

    /**
     * Injeção de dependência via construtor.
     *
     * @param blogRepository O repositório de postagens de blog.
     */
    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    /**
     * Cria uma nova postagem de blog e a salva no repositório.
     *
     * @param blogEntity A entidade da postagem a ser criada.
     * @return A entidade da postagem criada.
     */
    public BlogEntity createArticle(BlogEntity blogEntity) {

        return blogRepository.save(blogEntity);
    }
    public List<BlogEntity> createArticles(List<BlogEntity> blogEntities) {
        return blogRepository.saveAll(blogEntities);
    }
    /**
     * Recupera todas as postagens de blog existentes.
     *
     * @return Uma lista de entidades de postagens de blog.
     */
    public List<BlogEntity> getArticleAll() {
        return blogRepository.findAll();
    }

    /**
     * Recupera uma postagem do blog específicada pelo o ID.
     *
     * @param id O Identificador da postagem a ser recuperada.
     * @return A entidade da postagem correspondente ou null não encontre.
     */

    public BlogEntity getArticleById(Long id) {

        return blogRepository.findById(id).orElse(null);
    }

    /**
     * Atualiza uma postagem do blog existente.
     *
     * @param id         O identificador da postagem.
     * @param blogEntity A entidade da postagem contendo os novos dados.
     * @return A enteidade da postaggem atualizada  ou null se não encontrada.
     */
    public BlogEntity updatedArticle(Long id, BlogEntity blogEntity) {
        Optional<BlogEntity> optionalBlogEntity = blogRepository.findById(id);
        if (optionalBlogEntity.isPresent()) {
            BlogEntity existingBlog = optionalBlogEntity.get();
            existingBlog.setTitle(blogEntity.getTitle());
            existingBlog.setDescription(blogEntity.getDescription());
            existingBlog.setUrlimage(blogEntity.getUrlimage());
            existingBlog.setActor(blogEntity.getActor());
            existingBlog.setSubtitle(blogEntity.getSubtitle());
            existingBlog.setImageSource(blogEntity.getImageSource());
            existingBlog.setCategory(blogEntity.getCategory());
            return blogRepository.save(existingBlog);
        }
        return null;
    }

    // Get a Blog Post by Category
    public  List<BlogEntity> getArticleByCategory(String category){
        return  blogRepository.findByCategory(category);
    }

    /**
     * Deleta uma postagem de Blog existente pelo identificador.
     *
     * @param id O Identificador da postagem a ser deletado.
     * @return true se a postagem foi deletada com sucesso, false caso contrário.
     */
    public boolean deleteArticle(Long id) {
        if (blogRepository.existsById(id)) {
            blogRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<BlogEntity> buscarPorDescricao(String descricao) {
        return blogRepository.findByDescriptionContainingIgnoreCase(descricao);
    }


}
