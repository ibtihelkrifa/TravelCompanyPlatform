package com.agence.controller;

import com.agence.models.Transport;
import com.agence.repository.TransportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class TransportController {

    private final TransportRepository repository;

    @Autowired
    public TransportController(TransportRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/transports")
    public List<Transport> getAllTransports() {
        return repository.findAll();
    }

    @GetMapping("/transports/{id}")
    public Optional<Transport> getTransport(@PathVariable Long id) {
        return repository.findById(id);
    }

    @PostMapping("/transports")
    public Transport createTransport(@RequestBody Transport transport) {
        return repository.save(transport);
    }

    @PutMapping("/transports/{id}")
    public ResponseEntity<Object> updateTransport(@RequestBody Transport updatedTransport, @PathVariable Long id) {
        Optional<Transport> transport = repository.findById(id);

        if (!transport.isPresent())
            return ResponseEntity.notFound().build();

        updatedTransport.setId(id);
        repository.save(updatedTransport);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/transports/{id}")
    public void deleteTransport(@PathVariable long id) {
        repository.deleteById(id);
    }

}
