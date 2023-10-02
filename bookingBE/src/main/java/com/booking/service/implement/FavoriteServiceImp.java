package com.booking.service.implement;

import com.booking.repository.FavoriteRepository;
import com.booking.service.interfaces.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImp implements FavoriteService {
    private final FavoriteRepository favoriteRepository;
}
