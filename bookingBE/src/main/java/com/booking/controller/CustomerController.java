package com.booking.controller;

import com.booking.dto.request.CreateUserDto;
import com.booking.dto.request.LoginUserDto;
import com.booking.dto.request.UpdateCustomerDto;
import com.booking.dto.response.JwtUserResponse;
import com.booking.security.jwt.JwtUtil;
import com.booking.service.implement.UserDetailsImpl;
import com.booking.service.interfaces.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/customer")
public class CustomerController {
    private final CustomerService customerService;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtil jwtUtil;

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
        return ResponseEntity.ok(new JwtUserResponse().builder()
                .token(jwt).role(role).type("Bearer")
                .id(userDetails.getId())
                .email(userDetails.getEmail())
                .build());
    }
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @PostMapping(value = "/update/{id}")
    public ResponseEntity<Object> updateCustomer(@PathVariable Long id, @RequestBody UpdateCustomerDto updateCustomerDto) throws IOException {
        customerService.updateCustomer(id, updateCustomerDto);
        return ResponseEntity.status(200).build();
    }
}
