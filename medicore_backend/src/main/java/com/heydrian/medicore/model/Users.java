package com.heydrian.medicore.model;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Users {

    @Id
    @Column(name="user_id", nullable=false)
    private String userId;

    @Column(name="username", nullable=false, unique=true)
    private String username;

    @Column(name="password", nullable=false)
    private String password;

    @Column(name="user_fname", nullable=false)
    private String userFname;

    @Column(name="user_lname", nullable=false)
    private String userLname;

    @Column(name="user_created", columnDefinition="TIMESTAMP", nullable=false)
    @CreationTimestamp
    private Instant userCreated;

    @Column(name="user_type", nullable=false)
    private String userType;
}