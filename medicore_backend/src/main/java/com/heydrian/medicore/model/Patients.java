package com.heydrian.medicore.model;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="patients")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Patients {

    @Id
    @Column(name="patient_id", nullable=false)
    private String patientId;

    @Column(name="patient_description", nullable=false)
    private String patientDescription;

    @Column(name="patient_admissionDate", columnDefinition="TIMESTAMP", nullable=false)
    @CreationTimestamp
    private Instant patientAdmissionDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="room_id", nullable=false)
    private Rooms roomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="patient_attending_doctor", nullable=false)
    private Users patientAttendingDoctor;
}
