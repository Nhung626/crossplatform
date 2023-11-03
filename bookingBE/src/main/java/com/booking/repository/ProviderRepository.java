package com.booking.repository;

import com.booking.entity.Provider;
import com.booking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProviderRepository extends JpaRepository<Provider, Long> {
    Provider findByProviderId(Long id);
    Provider findByUserId(Long userId);
    @Override
    List<Provider> findAll();
}
