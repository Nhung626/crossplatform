package com.booking.service.implement;

import com.booking.dto.response.ProviderDto;
import com.booking.entity.Favorite;
import com.booking.entity.Provider;
import com.booking.repository.FavoriteRepository;
import com.booking.repository.ProviderRepository;
import com.booking.service.interfaces.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        favoriteRepository.save(favorite);
        provider.getFavoriteCustomers().add(favorite);
        providerRepository.save(provider);
    }

    public void  removeFavoriteProvider(Long customerId, Long providerId) {
        Favorite favorite = favoriteRepository.findByCustomerId(customerId);
        Provider provider = providerRepository.findByProviderId(providerId);
        favorite.getProviders().remove(provider);
        favoriteRepository.save(favorite);
        provider.getFavoriteCustomers().remove(favorite);
        providerRepository.save(provider);
    }

    public List<ProviderDto> getFavoriteProvider(Long customerId) {
        Favorite favorite = favoriteRepository.findByCustomerId(customerId);
        List<Provider> providers = favorite.getProviders().stream().toList();
        List<ProviderDto> providerDtos = new ArrayList<>();
        for (Provider provider : providers) {
            List<Long> imgIds = provider.getImgProviders().stream().map(img -> img.getImgId()).toList();
            providerDtos.add(new ProviderDto().builder()
                    .providerId(provider.getProviderId())
                    .imgIdProviders(imgIds)
                    .providerName(provider.getProviderName())
                    .providerPhone(provider.getProviderPhone())
                    .address(provider.getAddress())
                    .description(provider.getDescription()).build());
        }
        return providerDtos;
    }
}
