package com.heydrian.medicore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.heydrian.medicore.model.Rooms;

@Repository
public interface RoomRepository extends JpaRepository<Rooms, String> {
    public Rooms findRoomByRoomId(String roomId);
    public boolean existsByRoomId(String roomId);
    
}
