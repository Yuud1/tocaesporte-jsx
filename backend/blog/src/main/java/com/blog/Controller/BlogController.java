package com.blog.Controller;

import com.blog.Entity.BlogEntity;
import com.blog.Service.BlogService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = {"https://tocaesporte.com","tocaesporte.com"})
//rodar lcoal
//@CrossOrigin(origins = "*")
@RequestMapping("/artigo")

public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @PostMapping("/criar")
    public ResponseEntity<Map<String, Object>> createArticle(@RequestBody Object request) {
        Map<String, Object> response = new HashMap<>();
        ObjectMapper objectMapper = new ObjectMapper();

        if (request instanceof List<?>) {
            List<?> rawList = (List<?>) request;

            // Converter cada item da lista para BlogEntity
            List<BlogEntity> blogEntities = rawList.stream()
                    .map(item -> objectMapper.convertValue(item, BlogEntity.class))
                    .collect(Collectors.toList());

            List<BlogEntity> createdPosts = blogService.createArticles(blogEntities);
            response.put("success", true);
            response.put("posts", createdPosts);
        } else if (request instanceof Map<?, ?>) {
            BlogEntity blogEntity = objectMapper.convertValue(request, BlogEntity.class);
            BlogEntity createdPost = blogService.createArticle(blogEntity);
            response.put("success", true);
            response.put("post", createdPost);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<BlogEntity>> getArticleAll() {
        List<BlogEntity> articles = blogService.getArticleAll();
        if (articles.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/listar/{id}")
    public ResponseEntity<BlogEntity> getArticleById(@PathVariable Long id) {
        BlogEntity blogEntity = blogService.getArticleById(id);
        return blogEntity != null ? ResponseEntity.ok(blogEntity) : ResponseEntity.notFound().build();
    }

    @GetMapping("/buscar")
    public List<BlogEntity> getArticleSeach(@RequestParam String description) {
        return blogService.buscarPorDescricao(description);
    }


    @GetMapping("/category/{category}")
    public ResponseEntity<?> getArticleByCategory(@PathVariable String category) {
        List<BlogEntity> blogEntity = blogService.getArticleByCategory(category);
        if (blogEntity == null || blogEntity.isEmpty()) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "No articles found in this category");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        return ResponseEntity.ok(blogEntity);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updatedArticle(@PathVariable Long id, @RequestBody BlogEntity blogEntity) {
        BlogEntity updatedArticle = blogService.updatedArticle(id, blogEntity);
        Map<String, Object> responseUpdate = new HashMap<>();

        if (updatedArticle != null) {
            responseUpdate.put("success", true);
            responseUpdate.put("post", updatedArticle);
            return ResponseEntity.ok(responseUpdate);
        } else {
            responseUpdate.put("success", false);
            responseUpdate.put("message", "Blog post not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseUpdate);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        boolean delete = blogService.deleteArticle(id);
        return delete ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
