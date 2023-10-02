package com.booking.service.interfaces;

import com.booking.dto.request.CreateUserDto;
import com.booking.dto.request.UpdateProviderDto;
import org.springframework.stereotype.Service;

@Service
public interface ProviderService {
    void addProvider(CreateUserDto userDto);
    void updateProvider(Long id, UpdateProviderDto updateProviderDto);

}