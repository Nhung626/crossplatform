package com.booking.service.implement;

import com.booking.dto.Convert;
import com.booking.dto.response.ProviderDto;
import com.booking.entity.Favorite;
import com.booking.entity.Provider;
import com.booking.repository.FavoriteRepository;
import com.booking.repository.ProviderRepository;
import com.booking.service.interfaces.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImp implements FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final ProviderRepository providerRepository;

    public void addFavoriteProvider(Long customerId, Long providerId) {
        Favorite favorite = favoriteRepository.findByCustomerId(customerId);
        Provider provider = providerRepository.findByProviderId(providerId);
        favorite.getProviders().add(provider);
        provider.getFavoriteCustomers().add(favorite);
        providerRepository.save(provider);
    }

    public void removeFavoriteProvider(Long customerId, Long providerId) {
        Favorite favorite = favoriteRepository.findByCustomerId(customerId);
        Provider provider = providerRepository.findByProviderId(providerId);
        favorite.getProviders().remove(provider);
        provider.getFavoriteCustomers().remove(favorite);
        providerRepository.save(provider);
    }

    public List<ProviderDto> getFavoriteProvider(Long customerId) {
        Favorite favorite = favoriteRepository.findByCustomerId(customerId);
        return favorite.getProviders().stream().map(Convert::convertProvider).toList();
    }


}
