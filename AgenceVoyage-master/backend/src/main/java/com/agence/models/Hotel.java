package com.agence.models;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
public class Hotel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private Long price;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "City_id")
    private City city;
}
