package com.booking.service.implement;

import com.booking.dto.request.CreateUserDto;
import com.booking.dto.request.UpdateCustomerDto;
import com.booking.dto.response.CustomerDto;
import com.booking.entity.*;
import com.booking.exception.CustomException;
import com.booking.repository.CustomerRepository;
import com.booking.repository.FavoriteRepository;
import com.booking.repository.UserRepository;
import com.booking.service.interfaces.CustomerService;
import com.booking.service.interfaces.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class CustomerServiceImp implements CustomerService {
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    private final FavoriteRepository favoriteRepository;
    private final PasswordEncoder encoder;
    private final ImageService imageService;

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
        Favorite favorite = new Favorite().builder().customerId(customer.getCustomerId()).build();
        favoriteRepository.save(favorite);
    }

    @Override
    public void updateCustomer(Long id, UpdateCustomerDto updateCustomerDto) throws IOException {
        Customer customer = customerRepository.findByCustomerId(id);
        customer.setFullName(updateCustomerDto.getFullName());
        customer.setGender(updateCustomerDto.getGender());
        customer.setAddress(updateCustomerDto.getAddress());
        customer.setPhoneNumber(updateCustomerDto.getPhoneNumber());
        customer.setCustomerCode(updateCustomerDto.getCustomerCode());
        customer.setDateOfBirth(updateCustomerDto.getDateOfBirth());
        Image image = imageService.saveUploadedFile(updateCustomerDto.getAvatar());
        customer.setAvatar(image);
        customerRepository.save(customer);
    }

    public CustomerDto getCustomer(Long customerId){
        Customer customer = customerRepository.findByCustomerId(customerId);
        return new CustomerDto(customer.getAvatar().getImgId(), customer.getFullName(), customer.getGender(), customer.getPhoneNumber(),
                customer.getAddress(), customer.getCustomerCode(), customer.getDateOfBirth());
    }
}
