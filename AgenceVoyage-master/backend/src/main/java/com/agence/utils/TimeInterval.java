package com.agence.utils;

import lombok.Data;

import java.io.Serializable;

@Data
public class TimeInterval implements Serializable {
    String startDate;
    String endDate;

}
