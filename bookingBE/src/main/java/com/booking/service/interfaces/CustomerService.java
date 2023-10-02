package com.booking.service.interfaces;

import com.booking.dto.request.CreateUserDto;
import com.booking.dto.request.UpdateCustomerDto;
import org.springframework.stereotype.Service;

@Service
public interface CustomerService {
    void addCustomer(CreateUserDto userDto);
    void updateCustomer(Long id, UpdateCustomerDto updateCustomerDto);
}
