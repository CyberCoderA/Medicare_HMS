package com.heydrian.medicore.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.heydrian.medicore.model.Rooms;
import com.heydrian.medicore.repository.RoomRepository;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    private final RoomRepository repository;

    public RoomController(RoomRepository repository) {
        this.repository = repository;
    }

    // Retrieve all rooms
    @GetMapping("/allRooms")
    public Iterable<Rooms> getAllRooms() {
        return repository.findAll();
    }
}
