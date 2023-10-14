package com.booking.controller;

import java.util.ArrayList;
import java.util.List;

import com.booking.dto.request.CreateReservarDto;
import com.booking.dto.response.CategoryDto;
import com.booking.dto.response.ProviderDto;
import com.booking.entity.Room;
import com.booking.service.interfaces.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Set;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/customer")
public class OrderController {
    private final OrderService orderService;

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @PostMapping(value = "/createOrder")
    public ResponseEntity<Object> createOrder(@RequestBody CreateReservarDto createOrderDto) {
        orderService.createOrder(createOrderDto);
        return ResponseEntity.ok("success");
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @GetMapping(value = "/seach-provider")
    public ResponseEntity<Set<ProviderDto>> searchProvider(@RequestParam("start") LocalDate start,
                                                           @RequestParam("end") LocalDate end,
                                                           @RequestParam("person") int person) {
        List<Room> rooms = orderService.searchRoom(start, end, person);
        return ResponseEntity.ok(orderService.getSearchProviders(rooms));
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @GetMapping(value = "/seach-category")
    public ResponseEntity<Set<CategoryDto>> searchCategory(@RequestParam("start") LocalDate start,
                                                           @RequestParam("end") LocalDate end,
                                                           @RequestParam("person") int person,
                                                           @RequestParam("providerId") Long providerId) {
        List<Room> rooms = orderService.searchRoom(start, end, person);
        return ResponseEntity.ok(orderService.getSearchCategories(providerId, rooms));
    }
}
