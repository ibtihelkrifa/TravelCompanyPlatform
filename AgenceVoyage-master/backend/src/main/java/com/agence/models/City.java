package com.agence.models;

import lombok.Data;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;


@Table
@Entity
@Data
public class City implements Serializable {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String image_url;


    public void fetchCityImageUrl() {

        String placeholderImage = "http://bonlok-worldwide.com/wp-content/uploads/2015/09/placeholder-400-400.jpg";

        RestTemplate template = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        headers.set("Authorization", "563492ad6f91700001000001674de27a97ad4ab5a2fb4748305edf27");
        headers.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        String cityNameSanitized = this.name.toLowerCase().replace(" ", "%20");
        ResponseEntity<PexelsFormat> response;

        try {
            response = template.exchange("https://api.pexels.com/v1/search?query=" + cityNameSanitized + "&per_page=5&page=1", HttpMethod.GET, entity, PexelsFormat.class);
            List<Photos> photos = Objects.requireNonNull(response.getBody()).getPhotos();
            if (photos.isEmpty()) {
                this.image_url = placeholderImage;
            }
            Photos firstPhoto = photos.get(0);

            this.image_url = firstPhoto.getSrc().getMedium();
        } catch (Exception e) {
            System.out.println("*************" + e.getMessage());
            this.image_url = placeholderImage;
        }
    }
}
