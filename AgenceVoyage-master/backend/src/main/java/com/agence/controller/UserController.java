package com.agence.controller;

import com.agence.models.User;
import com.agence.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class UserController {

    private final UserRepository repository;

    @Autowired
    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @GetMapping("/users/{id}")
    public Optional<User> getUser(@PathVariable Long id) {
        return repository.findById(id);
    }

    @PostMapping("/users/create")
    public User createUser(@RequestBody User user) {
        return repository.save(user);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<Object> updateUser(@RequestBody User updatedUser, @PathVariable Long id) {
        Optional<User> user = repository.findById(id);

        if (!user.isPresent())
            return ResponseEntity.notFound().build();

        updatedUser.setId(id);
        repository.save(updatedUser);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable long id) {
        repository.deleteById(id);
    }

    @GetMapping("/users/Admin/{email}")
    public User getAdmin(@PathVariable String email) {
        return repository.findUserByEmailAndRole(email, "Admin");
    }
}
