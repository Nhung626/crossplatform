package com.booking.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

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

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "reservar")
    private Set<StateRoom> stateRooms = new HashSet<>();

    @Column(name = "total")
    private long total;

    @Column(name="state_payment")
    private String paymentState;
    public void callTotal() {
        int price;
        total = 0;
        if (stateRooms.size() != 0) {
            for (StateRoom stateRoom : stateRooms) {
                price = stateRoom.getRoom().getCategory().getPrice();
                total += Period.between(stateRoom.getStart(), stateRoom.getEnd()).getDays() * price;
            }
        }
        total += total/ 100;
    }

    public LocalDate getStart() {
        return stateRooms.stream().toList().get(0).getStart();
    }

    public LocalDate getEnd() {
        return stateRooms.stream().toList().get(0).getEnd();
    }

    public Provider getProvider() {
        return stateRooms.stream().toList().get(0).getRoom().getCategory().getProvider();
    }

    public Category getCategory() {
        return stateRooms.stream().toList().get(0).getRoom().getCategory();
    }

}
