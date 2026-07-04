package com.heydrian.medicore.model;

import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name="rooms")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Rooms {

    @Id
    @Column(name="room_id", nullable=false)
    private String roomId;

    @Column(name="room_type", nullable=false)
    private String roomType;

    @Column(name="room_capacity", nullable=false)
    private int roomCapacity;

    @Column(name="room_occupants", nullable=false)
    private int roomOccupants;

    @Column(name="room_status", nullable=false)
    private String roomStatus;

    @Column(name="room_isIsolation", nullable=false)
    private boolean roomIsIsolation;
}   
