package com.booking.repository;

import com.booking.entity.Favorite;
import com.booking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Favorite findByCustomerId(Long customerId);
}
