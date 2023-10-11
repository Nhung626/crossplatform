package com.booking.service.interfaces;

import com.booking.dto.response.ProviderDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FavoriteService {
    void addFavoriteProvider(Long customerId,Long providerId);
    void removeFavoriteProvider(Long customerId,Long providerId);
    List<ProviderDto> getFavoriteProvider(Long customerId);
}
