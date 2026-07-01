package com.heydrian.medicore.model;

import java.time.LocalDateTime;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ResponseModel {
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")    
    private LocalDateTime timeStamp;
    private String messsage;
    private Optional<String> response;
    
    public ResponseModel(String messsage, LocalDateTime timeStamp, String response) {
        this.messsage = messsage;
        this.timeStamp = timeStamp;
        this.response = Optional.ofNullable(response);
    }

    public String getMesssage() {
        return messsage;
    }

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    public Optional<String> getResponse() {
        return response;
    }
}
