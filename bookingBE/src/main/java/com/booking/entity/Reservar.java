package com.booking.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "reservar")
public class Reservar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservar_id")
    private Long reservarId;
    @Column(name = "reservar_date")
    private LocalDateTime reservarDate;
    @Column(name = "checkin")
    private LocalDateTime checkin;
    @Column(name = "checkout")
    private LocalDateTime checkout;
    @Column(name = "state")
    private EStateReservar stateReservar;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = { CascadeType.PERSIST, CascadeType.MERGE },
            mappedBy = "reservarRooms")
    private Set<Room> rooms = new HashSet<>();

    @Column(name = "total")
    private int total;

    public void calTotal(){
        total = 0;
        for (Room room : rooms) {
            total+= room.getCategory().getPrice();
        }
    }

}
