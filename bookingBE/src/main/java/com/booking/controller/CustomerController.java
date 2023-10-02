package com.booking.controller;

import com.booking.dto.request.CreateUserDto;
import com.booking.dto.request.UpdateCustomerDto;
import com.booking.service.interfaces.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/customer")
public class CustomerController {
    private final CustomerService customerService;
    @PostMapping(value = "/auth/signup")
    public ResponseEntity<Object> createCustomer(@RequestBody CreateUserDto createuserDto)throws IOException {
        customerService.addCustomer(createuserDto);
        return ResponseEntity.status(200).build();
    }


    @PostMapping(value = "/update/{id}")
    public ResponseEntity<Object> updateCustomer(@PathVariable Long id, @RequestBody UpdateCustomerDto updateCustomerDto) throws IOException {
        customerService.updateCustomer(id, updateCustomerDto);
        return ResponseEntity.status(200).build();
    }
}
