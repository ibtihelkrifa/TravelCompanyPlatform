package com.agence.repository;

import com.agence.models.City;
import com.agence.models.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByNameContaining(String query);

    List<Hotel> findByCity(City c);
}
