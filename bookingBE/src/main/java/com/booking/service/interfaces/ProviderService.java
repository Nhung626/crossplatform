package com.booking.service.interfaces;

import com.booking.dto.request.CreateUserDto;
import com.booking.dto.request.UpdateProviderDto;
import com.booking.dto.response.CategoryDto;
import com.booking.dto.response.ProviderDto;
import com.booking.dto.response.ReservarDto;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public interface ProviderService {
    void addProvider(CreateUserDto userDto);
    void updateProvider(Long id, UpdateProviderDto updateProviderDto) throws IOException;
    List<CategoryDto> getAllCategories(Long providerId);
    ProviderDto getProvider(Long providerId);
    List<ProviderDto> getAllProviders();
    CategoryDto getCategory(long categoryId);

    List<ReservarDto> getCancel(Long providerId);
    List<ReservarDto> getCheckin(Long providerId);
    List<ReservarDto> getCheckout(Long providerId);
    List<ReservarDto> getBooking(Long providerId);
}