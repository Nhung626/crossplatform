package com.booking.service.interfaces;

import com.booking.dto.request.CreateReservarDto;
import com.booking.dto.response.CategoryDto;
import com.booking.dto.response.ProviderDto;
import com.booking.dto.response.ReservarDto;
import com.booking.entity.Room;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Set;
import java.util.List;

@Service
public interface ReservarService {
    ReservarDto createOrder(CreateReservarDto createOrderDto);
    Set<ProviderDto> getSearchProviders(List<Room> rooms);
    Set<CategoryDto> getSearchCategories(Long providerId, List<Room> rooms);
    Set<Room> getSearchRooms(Long categoryId,  Set<Room> rooms);
    List<Room> searchRoom(LocalDate start, LocalDate end, int personCount);
    void changeStateCheckin(Long reservarId);
    void changeStateCheckout(Long reservarId);
    boolean changeStateCancel(Long reservarId, Long customerId);
    boolean changeCancel(Long reservarId, Long providerId);
    List<ReservarDto> getCancel(Long customerId);
    List<ReservarDto> getCheckout(Long customerId);
    List<ReservarDto> getBooking(Long customerId);
}
