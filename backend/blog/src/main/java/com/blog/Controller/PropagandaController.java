package com.blog.Controller;

import com.blog.Entity.BlogEntity;
import com.blog.Entity.PropagandaEntity;
import com.blog.Service.PropagandaService; // Import do serviço
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"https://tocaesporte.com","tocaesporte.com"})
//@CrossOrigin(origins = "*")
@RequestMapping("/propaganda")
public class PropagandaController {

    private final PropagandaService propagandaService; // Declaração do serviço

    // Construtor com injeção de dependência
    public PropagandaController(PropagandaService propagandaService) {
        this.propagandaService = propagandaService;
    }

    @PostMapping("/criar")
    public ResponseEntity<Map<String, Object>> createAdvertising(@RequestBody PropagandaEntity propagandaEntity) {
        PropagandaEntity createPost = propagandaService.createAdvertising(propagandaEntity);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("post", createPost);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<PropagandaEntity>> getAdvertisingAll() {
        List<PropagandaEntity> advertising = propagandaService.getAdvertisingAll();
        if (advertising.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(advertising);
    }
    @GetMapping("/listar/{id}")
    public ResponseEntity<PropagandaEntity> getAdvertisingById(@PathVariable Long id) {
        PropagandaEntity propagandaEntity = propagandaService.getAdvertisingById(id);
        return propagandaEntity != null ? ResponseEntity.ok(propagandaEntity) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteLogin(@PathVariable Long id) {
        boolean deleted = propagandaService.deleteAdvertising(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
