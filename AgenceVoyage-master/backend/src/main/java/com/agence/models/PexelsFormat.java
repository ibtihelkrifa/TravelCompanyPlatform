package com.agence.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PexelsFormat {
    private int total_results;
    private int page;
    private int per_page;
    private List<Photos> photos;
}

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
class Photos {
    private Src src;
}

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
class Src {
    private String tiny;
    private String medium;
}