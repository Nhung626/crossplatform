package com.booking.entity;

import jakarta.persistence.*;

import lombok.*;
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "admin")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adminId;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "full_name")
    private String fullName;
    @Column(name = "gender")
    private String gender;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "address")
    private String address;
    @Column(name = "code")
    private String adminCode;
}
