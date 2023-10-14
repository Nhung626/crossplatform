package com.booking.controller;

import com.booking.dto.request.CreateUserDto;
import com.booking.dto.request.LoginUserDto;
import com.booking.dto.request.UpdateCustomerDto;
import com.booking.dto.response.CustomerDto;
import com.booking.dto.response.JwtUserResponse;
import com.booking.dto.response.ProviderDto;
import com.booking.entity.Customer;
import com.booking.repository.CustomerRepository;
import com.booking.security.jwt.JwtUtil;
import com.booking.service.implement.UserDetailsImpl;
import com.booking.service.interfaces.CustomerService;
import com.booking.service.interfaces.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/customer")
public class CustomerController {
    private final CustomerService customerService;
    private final FavoriteService favoriteService;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    CustomerRepository customerRepository;

    @PostMapping(value = "/auth/sign-up")
    public ResponseEntity<Object> createCustomer(@RequestBody CreateUserDto createUserDto) throws IOException {
        customerService.addCustomer(createUserDto);
        return ResponseEntity.status(200).build();
    }

    @PostMapping(value = "/auth/login")
    public ResponseEntity<Object> login(@RequestBody LoginUserDto loginUserDto) throws IOException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginUserDto.getEmail(), loginUserDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        String role = roles.get(0);
        Customer customer = customerRepository.findByUserId(userDetails.getId());
        return ResponseEntity.ok(new JwtUserResponse().builder()
                .token(jwt).role(role).type("Bearer")
                .id(customer.getCustomerId())
                .email(customer.getUser().getEmail())
                .build());
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @PostMapping(value = "/update")
    public ResponseEntity<Object> updateCustomer(@RequestParam("avatar") MultipartFile avatar,
                                                 @RequestParam("fullName") String fullName,
                                                 @RequestParam("gender") String gender,
                                                 @RequestParam("phoneNumber") String phoneNumber,
                                                 @RequestParam("address") String address,
                                                 @RequestParam("customerCode") String customerCode,
                                                 @RequestParam("dateOfBirth") LocalDate birthDay,
                                                 Principal principal) throws IOException {
        UpdateCustomerDto updateCustomerDto = new UpdateCustomerDto(avatar, fullName, gender, phoneNumber, address, customerCode, birthDay);
        customerService.updateCustomer(getCustomerId(principal), updateCustomerDto);
        return ResponseEntity.status(200).build();
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @PostMapping(value = "/add-favorite")
    public ResponseEntity addFavorite(Principal principal, @RequestParam("providerId") Long providerId) {
        favoriteService.addFavoriteProvider(getCustomerId(principal), providerId);
        return ResponseEntity.status(200).build();
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @GetMapping(value = "/get-customer")
    public ResponseEntity<CustomerDto> getCustomer(Principal principal) {
        CustomerDto customerDto = customerService.getCustomer(getCustomerId(principal));
        return ResponseEntity.ok(customerDto);
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @DeleteMapping(value = "/del-favorite")
    public ResponseEntity removeFavorite(Principal principal, @RequestParam("providerId") Long providerId) {
        favoriteService.removeFavoriteProvider(getCustomerId(principal), providerId);
        return ResponseEntity.status(200).build();
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @GetMapping(value = "/get-favorite")
    public ResponseEntity<List<ProviderDto>> getFavorites(Principal principal) {
        return ResponseEntity.ok(favoriteService.getFavoriteProvider(getCustomerId(principal)));
    }

    public Long getCustomerId(Principal principal) {
        UserDetailsImpl userDetails = (UserDetailsImpl) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        Customer customer = customerRepository.findByUserId(userDetails.getId());
        return customer.getCustomerId();
    }
}
