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
@Table(name = "provider")
public class Provider {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "provider_id")
    private Long providerId;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "provider_name")
    private String providerName;
    @Column(name = "provider_phone")
    private String providerPhone;
    @Column(name = "address")
    private String address;
    @Column(name = "description")
    private String description;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "favorite_provider",
            joinColumns = {@JoinColumn(name = "provider_id")},
            inverseJoinColumns = {@JoinColumn(name = "favorite_id")})
    private Set<Favorite> favoriteCustomers = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL,mappedBy = "provider")
    private Set<Category> categories = new HashSet<>();
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL,mappedBy = "provider")
    private Set<Image> imgProviders = new HashSet<>();


}
