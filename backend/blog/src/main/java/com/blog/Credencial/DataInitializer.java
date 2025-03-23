package com.blog.Credencial;

import com.blog.Entity.LoginEntity;
import com.blog.Service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
@Component
public class DataInitializer  implements CommandLineRunner{
     @Autowired
        private LoginService loginService;
        @Override
        public void run(String... args) throws Exception {
            // Verifica se já existe um superadmin
            if (!loginService.emailExists("mano@superadmin.com")) {
                // Cria o superadmin
                 LoginEntity superAdmin = new LoginEntity();
                superAdmin.setAccess("admin");
                superAdmin.setEmail("c");
                superAdmin.setPassword("mano@1");
                superAdmin.setUser("superAdmin");

                // Salva o superadmin no banco de dados
                loginService.createLogin(superAdmin);
                System.out.println("Superadmin criado com sucesso!");
            }
        }
    }
