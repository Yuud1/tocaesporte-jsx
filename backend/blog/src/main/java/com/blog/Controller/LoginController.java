package com.blog.Controller;

import com.blog.Entity.LoginEntity;
import com.blog.Service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"https://tocaesporte.com","tocaesporte.com"})
//@CrossOrigin(origins = "*")
@RequestMapping("/login")
public class LoginController {
        @Autowired
        private LoginService loginService;

        // Login authentication
        @PostMapping("/authenticate")
        public ResponseEntity<Map<String, Object>> authenticateLogin(@RequestBody LoginEntity loginEntity) {
            Map<String, Object> response = new HashMap<>();

            //Check if the email exists in the database
            if (!loginService.emailExists(loginEntity.getEmail())) {
                response.put("success", false);
                response.put("message", "Email does not exist or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            //Check if the password is correct
            LoginEntity loginData = loginService.getLoginByEmail(loginEntity.getEmail());
            if (!loginData.getPassword().equals(loginEntity.getPassword())) {
                response.put("success", false);
                response.put("message", "Incorrect password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            // Successful authentication
            response.put("success", true);
            response.put("message", "Successful login");
            response.put("acesso",loginData.getAccess());
            return ResponseEntity.ok(response);
        }

        //create new logins
        @PostMapping("/create")
        public ResponseEntity<Map<String, Object>> createLogin(@RequestBody LoginEntity loginEntity) {
            if(loginService.emailExists(loginEntity.getEmail())){
                Map<String, Object> response = new HashMap<>();
                response.put("success",false);
                response.put("message","Email already exists");
                return ResponseEntity.badRequest().body(response);
            }
            LoginEntity createLogin = loginService.createLogin(loginEntity);
            Map<String, Object> response = new HashMap<>();

            response.put("success", true);
            response.put("post", createLogin);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
        // Get all Blog Posts
        @GetMapping("/list")
        public List<LoginEntity> getAllLogin(){
            return loginService.getAllLogin();
        }

        // Delete a Blog Post by ID
        @DeleteMapping("/delete/{id}")
        public ResponseEntity<Void> deleteLogin(@PathVariable Long id) {
            boolean deleted = loginService.deleteLogin(id);
            if (deleted) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        }
}
