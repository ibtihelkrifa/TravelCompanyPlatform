package com.agence.controller;

import com.agence.models.City;
import com.agence.models.Flight;
import com.agence.repository.CityRepository;
import com.agence.repository.FlightRepository;
import com.agence.utils.TimeInterval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class FlightController {


    private final FlightRepository repository;
    private final CityRepository cityRepository;

    @Autowired
    public FlightController(FlightRepository repository, CityRepository cityRepository) {
        this.repository = repository;
        this.cityRepository = cityRepository;
    }

    @GetMapping("/flights")
    public List<Flight> getAllFlights() {
        return repository.findAll();

    }

    @GetMapping("/flights-images")
    public List<Flight> getAllFlightsWithImage() {
        return repository.findAll().stream().map(f -> {
            City city = f.getCity();
            if (city.getImage_url() != null && !city.getImage_url().isEmpty()) {
                return f;
            } else {
                city.fetchCityImageUrl();
                cityRepository.save(city);
                f.setCity(city);
                return f;
            }
        }).collect(Collectors.toList());
    }

    @GetMapping("/flights/{id}")
    public Optional<Flight> getFlight(@PathVariable Long id) {
        return repository.findById(id);
    }

    @PostMapping("/flights/query")
    public List<Flight> queryFlight(@RequestBody TimeInterval interval) throws ParseException {
        Date startDate = new SimpleDateFormat("yyyy-MM-dd").parse(interval.getStartDate());
        Date endDate = new SimpleDateFormat("yyyy-MM-dd").parse(interval.getEndDate());
        return repository.findByDepartureDateBetween(startDate, endDate);
    }

    @PostMapping("/flights")
    public Flight createFlight(@RequestBody Flight flight) {

        return repository.save(flight);
    }

    @PutMapping("/flights/{id}")
    public ResponseEntity<Object> updateFlight(@RequestBody Flight updatedFlight, @PathVariable Long id) {
        Optional<Flight> flight = repository.findById(id);

        if (!flight.isPresent())
            return ResponseEntity.notFound().build();

        updatedFlight.setId(id);
        repository.save(updatedFlight);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/flights/{id}")
    public void deleteFlight(@PathVariable long id) {
        repository.deleteById(id);
    }

}

