package com.blog.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "propaganda_topo")
public class PropagandaTopoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private  Long id;
    @Column(name = "titulo")
    private  String title;
    @Column(name = "subtitulo")
    private String subtitle;
    @Column(name = "url_image_propaganda")
    private String urlimage;
    @Column(name = "nome_empresa")
    private String  enterprise;
    @Column(name = "site_empresa")
    private String site;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getUrlimage() {
        return urlimage;
    }

    public void setUrlimage(String urlimage) {
        this.urlimage = urlimage;
    }

    public String getEnterprise() {
        return enterprise;
    }

    public void setEnterprise(String enterprise) {
        this.enterprise = enterprise;
    }

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site;
    }
}
