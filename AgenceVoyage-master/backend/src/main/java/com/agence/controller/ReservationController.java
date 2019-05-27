package com.agence.controller;

import com.agence.models.Reservation;
import com.agence.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class ReservationController {

    private final ReservationRepository repository;

    @Autowired
    public ReservationController(ReservationRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/reservations")
    public List<Reservation> getAllReservations() {
        return repository.findAll();
    }

    @GetMapping("/reservations/{id}")
    public Optional<Reservation> getReservation(@PathVariable Long id) {
        return repository.findById(id);
    }

    @PostMapping("/reservations/create")
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return repository.save(reservation);
    }

    @PutMapping("/reservations/{id}")
    public ResponseEntity<Object> updateReservation(@RequestBody Reservation updatedReservation, @PathVariable Long id) {
        Optional<Reservation> reservation = repository.findById(id);

        if (!reservation.isPresent())
            return ResponseEntity.notFound().build();

        updatedReservation.setId(id);
        repository.save(updatedReservation);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/reservations/{id}")
    public void deleteReservation(@PathVariable long id) {
        repository.deleteById(id);
    }

}
