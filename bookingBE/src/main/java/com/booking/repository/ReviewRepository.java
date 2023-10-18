package com.booking.repository;

import com.booking.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Review findByReservarId(Long reservarId);
}
