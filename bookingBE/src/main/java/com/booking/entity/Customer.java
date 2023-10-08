package com.booking.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Long customerId;
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
    private String customerCode;
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "customer")
    private Set<Order> orders = new HashSet<>();
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "customer")
    private Set<Review> reviews = new HashSet<>();
}
