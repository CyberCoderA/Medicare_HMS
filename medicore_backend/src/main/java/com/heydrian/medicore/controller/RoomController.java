package com.heydrian.medicore.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.heydrian.medicore.model.ResponseModel;
import com.heydrian.medicore.model.Rooms;
import com.heydrian.medicore.repository.RoomRepository;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

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

    @PostMapping(value="/addRoom", produces="application/json")
    public ResponseEntity<?> addRoom(@RequestParam String room_id, @RequestParam String room_type, @RequestParam int room_capacity, @RequestParam String room_isIsolation) {
        try {
            if (!repository.existsById(room_id)) {
                repository.save(new Rooms(room_id, room_type, room_capacity, 0, "AVAILABLE", room_isIsolation.equals("TRUE")));

                return new ResponseEntity<>(new ResponseModel("Room successfully added!", LocalDateTime.now(), null), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ResponseModel("Room already exists!", LocalDateTime.now(), null), HttpStatus.CONFLICT);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ResponseModel("Something went wrong!", LocalDateTime.now(), null), HttpStatus.CONFLICT);
        }
    }
}
