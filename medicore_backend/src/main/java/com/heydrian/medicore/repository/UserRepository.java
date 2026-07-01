package com.heydrian.medicore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.heydrian.medicore.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, String>{
    public Users findUserByUsername(String username);
    public boolean existsByUsername(String username);
}