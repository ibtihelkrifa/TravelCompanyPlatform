package com.agence.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Reservation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startingDate;
    private Long personsCount;
    private Long duration;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "User_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "Transport_id")
    private Transport transport;

    @ManyToOne
    @JoinColumn(name = "Hotel_id")
    private Hotel hotel;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "Flight_id")
    private Flight flight;
}
