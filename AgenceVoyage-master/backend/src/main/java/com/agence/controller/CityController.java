package com.agence.controller;

import com.agence.models.City;
import com.agence.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class CityController {

    private final CityRepository repository;

    @Autowired
    public CityController(CityRepository repository) {
        this.repository = repository;
    }


    @GetMapping("/cities")
    public List<City> getAllCities() {
        return repository.findAll();
    }

    @GetMapping("/cities/{id}")
    public Optional<City> getCity(@PathVariable Long id) {
        return repository.findById(id);
    }

    @GetMapping("/cities/query/{query}")
    public List<City> queryHotels(@PathVariable String query) {
        return repository.findByNameContaining(query);
    }

    @PostMapping("/cities")
    public City createCity(@RequestBody City city) {
        return repository.save(city);
    }

    @PutMapping("/cities/{id}")
    public ResponseEntity<Object> updateCity(@RequestBody City updatedCity, @PathVariable Long id) {
        Optional<City> city = repository.findById(id);

        if (!city.isPresent())
            return ResponseEntity.notFound().build();

        updatedCity.setId(id);
        repository.save(updatedCity);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/cities/{id}")
    public void deleteCity(@PathVariable long id) {
        repository.deleteById(id);
    }

}
