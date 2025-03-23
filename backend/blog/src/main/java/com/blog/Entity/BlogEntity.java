package com.blog.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * A classe representa um post do blog.
 * Armazena informações como título, autor, descrição, o link da imagem e a
 * data em que o post foi criado.
 * Cada blog tem um identificador único.
 */
@Entity
@Table(name = "blog")
public class BlogEntity {

    /**
     * O ID único de cada post de blog, gerado automaticamente pelo banco de dados.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    /**
     * O título do post do blog, que descreve sobre o que é o conteúdo.
     */
    @Column(name = "titulo")
    private String title;


    @Column(name = "subtitulo")
    private String subtitle;

    /**
     * O nome do autor que escreveu o post.
     */
    @Column(name = "autor")
    private String actor;

    /**
     * Uma descrição do post, fornecendo mais detalhes sobre o conteúdo.
     */
    @Column(name = "descricao")
    private String description;

    /**
     * Um link para a imagem associada ao post.
     */
    @Column(name = "imagem_link")
    private String urlimage;


    @Column(name = "fonte_imagem")
    private String imageSource;
    /**
     * A categoria do post do blog.
     */
    @Column(name = "categoria")
    private String category;

    /**
     * A data e hora em que o post foi criado.
     * Esse campo é preenchido automaticamente assim que o post é salvo.
     */
    @Column(name = "data_criacao")
    private LocalDateTime dateCreatetion;

    /**
     * Antes de o post ser salvo no banco de dados, este método define automaticamente
     * a data de criação para o momento atual.
     */
    @PrePersist
    private void DateCrete() {
        this.dateCreatetion = LocalDateTime.now();
    }

    // Métodos getter e setter para acessar e modificar os dados do post

    /**
     * Obtém o ID do post.
     *
     * @return O ID do post.
     */
    public Long getId() {
        return id;
    }

    /**
     * Define o ID do post.
     *
     * @param id O ID a ser definido.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Obtém o título do post.
     *
     * @return O título do post.
     */
    public String getTitle() {
        return title;
    }

    /**
     * Define o título do post.
     *
     * @param title O título a ser definido.
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Obtém o autor do post.
     *
     * @return O autor do post.
     */
    public String getActor() {
        return actor;
    }

    /**
     * Define o autor do post.
     *
     * @param actor O autor a ser definido.
     */
    public void setActor(String actor) {
        this.actor = actor;
    }

    /**
     * Obtém a descrição do post.
     *
     * @return A descrição do post.
     */
    public String getDescription() {
        return description;
    }

    /**
     * Define a descrição do post.
     *
     * @param description A descrição a ser definida.
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Obtém o link da imagem do post.
     *
     * @return O link da imagem do post.
     */
    public String getUrlimage() {
        return urlimage;
    }

    /**
     * Define o link da imagem do post.
     *
     * @param urlimage O link da imagem a ser definido.
     */
    public void setUrlimage(String urlimage) {
        this.urlimage = urlimage;
    }

    /**
     * Obtém a categoria do post.
     *
     * @return A categoria do post.
     */
    public String getCategory() {
        return category;
    }

    /**
     * Define a categoria do post.
     *
     * @param category A categoria a ser definida.
     */
    public void setCategory(String category) {
        this.category = category;
    }


    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    /**
     * Obtém a data de criação do post.
     *
     * @return A data de criação do post.
     */
    public LocalDateTime getDateCreatetion() {
        return dateCreatetion;
    }

    /**
     * Define a data de criação do post.
     *
     * @param dateCreatetion A data de criação a ser definida.
     */
    public void setDateCreation(LocalDateTime dateCreatetion) {
        this.dateCreatetion = dateCreatetion;
    }

    public String getImageSource() {
        return imageSource;
    }

    public void setImageSource(String imageSource) {
        this.imageSource = imageSource;
    }
}
