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
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;
    @Column(name = "description")
    private String description;
    @Column(name = "price")
    private float price;
    @ManyToOne
    @JoinColumn(name = "provider_id")
    private Provider provider;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "category")
    private Set<Image> imgRooms = new HashSet<>();
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "category")
    private Set<Room> rooms = new HashSet<>();
}
