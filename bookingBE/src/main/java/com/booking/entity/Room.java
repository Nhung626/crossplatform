package com.booking.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long roomId;
    @Column(name = "room_number")
    private int roomNumber;
    @Column(name = "state")
    private EStateRoom state;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "order_room",
            joinColumns = {@JoinColumn(name = "room_id")},
            inverseJoinColumns = {@JoinColumn(name = "order_id")})
    private Set<Order> orderRooms = new HashSet<>();
}
