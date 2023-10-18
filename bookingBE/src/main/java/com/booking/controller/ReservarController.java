package com.booking.controller;

import java.security.Principal;
import java.util.List;

import com.booking.dto.request.CreateReservarDto;
import com.booking.dto.response.CategoryDto;
import com.booking.dto.response.ProviderDto;
import com.booking.dto.response.ReservarDto;
import com.booking.entity.Customer;
import com.booking.entity.Room;
import com.booking.repository.CustomerRepository;
import com.booking.service.implement.UserDetailsImpl;
import com.booking.service.interfaces.ReservarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Set;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/customer")
public class ReservarController {
    private final ReservarService reservarService;
    private final CustomerRepository customerRepository;

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @PostMapping(value = "/create-order")
    public ResponseEntity<Object> createOrder(@RequestBody CreateReservarDto createOrderDto) {
        ReservarDto reservarDto = reservarService.createOrder(createOrderDto);
        return ResponseEntity.ok("Đặt phòng thành công.\n" + reservarDto);
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @GetMapping(value = "/search-provider")
    public ResponseEntity<Set<ProviderDto>> searchProvider(@RequestParam("start") LocalDate start,
                                                           @RequestParam("end") LocalDate end,
                                                           @RequestParam("person") int person) {
        List<Room> rooms = reservarService.searchRoom(start, end, person);
        return ResponseEntity.ok(reservarService.getSearchProviders(rooms));
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @GetMapping(value = "/search-category")
    public ResponseEntity<Set<CategoryDto>> searchCategory(@RequestParam("start") LocalDate start,
                                                           @RequestParam("end") LocalDate end,
                                                           @RequestParam("person") int person,
                                                           @RequestParam("providerId") Long providerId) {
        List<Room> rooms = reservarService.searchRoom(start, end, person);
        return ResponseEntity.ok(reservarService.getSearchCategories(providerId, rooms));
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @PostMapping(value = "/cancel")
    public ResponseEntity<Object> cancel(Principal principal, @RequestParam("reservarId") Long reservarId) {
        if (reservarService.changeStateCancel(reservarId, getCustomerId(principal))) {
            return ResponseEntity.ok("Hủy thành công");
        } else {
            return ResponseEntity.ok("Không đủ điều kiện hủy. Vui lòng liên hệ với khách sạn để xử lý.");
        }
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @PostMapping(value = "/list-cancel")
    public List<ReservarDto> getCancel(Principal principal) {
        return reservarService.getCancel(getCustomerId(principal));
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @PostMapping(value = "/list-booked")
    public List<ReservarDto> getBooking(Principal principal) {
        return reservarService.getBooking(getCustomerId(principal));
    }
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @PostMapping(value = "/list-checkout")
    public List<ReservarDto> getCheckout(Principal principal){
        return reservarService.getCheckout(getCustomerId(principal));
    }

    public Long getCustomerId(Principal principal) {
        UserDetailsImpl userDetails = (UserDetailsImpl) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        Customer customer = customerRepository.findByUserId(userDetails.getId());
        return customer.getCustomerId();
    }
}
