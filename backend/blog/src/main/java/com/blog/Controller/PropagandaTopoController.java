package com.blog.Controller;

import com.blog.Entity.PropagandaTopoEntity;
import com.blog.Service.PropagandaService;
import com.blog.Service.PropagandaTopoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"https://tocaesporte.com","tocaesporte.com"})
//@CrossOrigin(origins = "*")
@RequestMapping("/propagandatopo")

public class PropagandaTopoController {

    private final PropagandaTopoService propagandaTopoService; // Alterado para o nome correto do serviço

    public PropagandaTopoController(PropagandaTopoService propagandaTopoService) {
        this.propagandaTopoService = propagandaTopoService;
    }


    @PostMapping("/criar")
    public ResponseEntity<Map<String, Object>> createAdvertising(@RequestBody PropagandaTopoEntity propagandaTopoEntity) {
        PropagandaTopoEntity createPost = propagandaTopoService.createAdvertising(propagandaTopoEntity);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("post", createPost);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<PropagandaTopoEntity>> getAdvertisingTopoAll() {
        List<PropagandaTopoEntity> articles = propagandaTopoService.getAdvertisingTopoAll();
        if (articles.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/listar/{id}")
    public ResponseEntity<PropagandaTopoEntity> getAdvertisingById(@PathVariable Long id) {
        PropagandaTopoEntity propagandaTopoEntity = propagandaTopoService.getAdvertisingById(id);
        return propagandaTopoEntity != null ? ResponseEntity.ok(propagandaTopoEntity) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAdvertising(@PathVariable Long id) {
        boolean deleted = propagandaTopoService.deleteAdvertising(id); // Corrigido aqui
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
