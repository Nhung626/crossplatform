package com.booking.service.interfaces;

import com.booking.dto.request.CreateReservarDto;
import com.booking.dto.response.CategoryDto;
import com.booking.dto.response.ProviderDto;
import com.booking.entity.Room;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Set;
import java.util.List;

@Service
public interface OrderService {
    void createOrder(CreateReservarDto createOrderDto);
    Set<ProviderDto> getSearchProviders(List<Room> rooms);
    Set<CategoryDto> getSearchCategories(Long providerId, List<Room> rooms);
    Set<Room> getSearchRooms(Long categoryId, List<Room> rooms);
    List<Room> searchRoom(LocalDate start, LocalDate end, int personCount);
}
