package com.booking.repository;

import com.booking.entity.Reservar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Reservar, Long> {
}
