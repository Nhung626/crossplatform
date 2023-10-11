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
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "end_date")
    private LocalDate endDate;
    @Column(name = "checkin")
    private LocalDate checkin;
    @Column(name = "checkout")
    private LocalDate checkout;
    @Column(name = "state")
    private String state;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = { CascadeType.PERSIST, CascadeType.MERGE },
            mappedBy = "orderRooms")
    private Set<Room> rooms = new HashSet<>();

    @Column(name = "total")
    private int total;

    public void calTotal(){
//        total = 0;
//        for (Room room : rooms) {
//            total+= room.getPrice();
//        }
    }

}
