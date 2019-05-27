package com.agence.controller;

import com.agence.models.City;
import com.agence.models.Hotel;
import com.agence.repository.CityRepository;
import com.agence.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class HotelController {
    private final HotelRepository hotelRepository;
    private final CityRepository cityRepository;

    @Autowired
    public HotelController(HotelRepository repository, CityRepository cityRepository) {
        this.hotelRepository = repository;
        this.cityRepository = cityRepository;
    }

    @GetMapping("/hotels")
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    @GetMapping("/hotels/city/{id}")
    public List<Hotel> getHotelsByCityId(@PathVariable long id) {
        Optional<City> city = cityRepository.findById(id);

        return city.map(hotelRepository::findByCity).orElse(null);
    }

    @GetMapping("/hotels/query/{query}")
    public List<Hotel> queryHotels(@PathVariable String query) {
        return hotelRepository.findByNameContaining(query);
    }

    @GetMapping("/hotels/{id}")
    public Optional<Hotel> getHotel(@PathVariable Long id) {
        return hotelRepository.findById(id);
    }

    @PostMapping("/hotels")
    public Hotel createHotel(@RequestBody Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    @PutMapping("/hotels/{id}")
    public ResponseEntity<Object> updateHotel(@RequestBody Hotel updatedHotel, @PathVariable Long id) {
        Optional<Hotel> hotel = hotelRepository.findById(id);

        if (!hotel.isPresent())
            return ResponseEntity.notFound().build();

        updatedHotel.setId(id);
        hotelRepository.save(updatedHotel);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/hotels/{id}")
    public void deleteHotel(@PathVariable long id) {
        hotelRepository.deleteById(id);
    }

}
