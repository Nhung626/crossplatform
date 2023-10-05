package com.booking.service.implement;

import com.booking.dto.request.CreateUserDto;
import com.booking.dto.request.UpdateCustomerDto;
import com.booking.entity.Customer;
import com.booking.entity.ERole;
import com.booking.entity.User;
import com.booking.exception.CustomException;
import com.booking.repository.CustomerRepository;
import com.booking.repository.UserRepository;
import com.booking.service.interfaces.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerServiceImp implements CustomerService {
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    @Override
    public void addCustomer(CreateUserDto userDto) {
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new CustomException("Error: Email is already in use!");
        }
        User user = new User().builder()
                .email(userDto.getEmail())
                .password(encoder.encode(userDto.getPassword()))
                .role(ERole.ROLE_CUSTOMER).build();
        userRepository.save(user);
        Customer customer = new Customer().builder()
                .user(user).build();
        customerRepository.save(customer);
    }

    @Override
    public void updateCustomer(Long id, UpdateCustomerDto updateCustomerDto) {
        Customer customer = customerRepository.findByCustomerId(id);
        customer.setFullName(updateCustomerDto.getFullName());
        customer.setGender(updateCustomerDto.getGender());
        customer.setAddress(updateCustomerDto.getAddress());
        customer.setPhoneNumber(updateCustomerDto.getPhoneNumber());
        customer.setCustomerCode(updateCustomerDto.getCustomerCode());
        customerRepository.save(customer);
    }

}
