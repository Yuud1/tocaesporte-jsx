package com.blog.Service;

import com.blog.Entity.LoginEntity;
import com.blog.Repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class LoginService {

    @Autowired
    LoginRepository loginRepository;

    // Create a new Login
    public LoginEntity createLogin(LoginEntity loginEntity) {
        return loginRepository.save(loginEntity);
    }
    // Recupera o LoginModel pelo email
    public LoginEntity getLoginByEmail(String email) {
        return loginRepository.findByEmail(email);
    }
    // List all Login
    public List<LoginEntity> getAllLogin() {
        return loginRepository.findAll();
    }

    // Delete Login
    public boolean deleteLogin(Long id) {
        if (loginRepository.existsById(id)) {
            loginRepository.deleteById(id);
            return true;
        }
        return false;
    }
    public boolean emailExists(String email){
        return loginRepository.findByEmail(email) !=null;
    }
}