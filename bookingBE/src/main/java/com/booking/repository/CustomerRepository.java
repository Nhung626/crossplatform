package com.booking.repository;

import com.booking.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByCustomerId(Long id);
    Customer findByUserId(Long userId);

}
