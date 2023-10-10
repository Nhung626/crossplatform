package com.booking.service.implement;

import com.booking.dto.request.CreateUserDto;
import com.booking.dto.request.UpdateProviderDto;
import com.booking.entity.ERole;
import com.booking.entity.Provider;
import com.booking.entity.User;
import com.booking.exception.CustomException;
import com.booking.repository.ImageRepository;
import com.booking.repository.ProviderRepository;
import com.booking.repository.UserRepository;
import com.booking.service.interfaces.ProviderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor
public class ProviderServiceImp implements ProviderService {
    private final ProviderRepository providerRepository;
    private final UserRepository userRepository;
    @Autowired
    PasswordEncoder encoder;
    @Override
    public void addProvider(CreateUserDto userDto) {
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new CustomException("Error: Email is already in use!");
        }
        // Create new user's account
        User user = new User().builder()
                .email(userDto.getEmail())
                .password(encoder.encode(userDto.getPassword()))
                .role(ERole.ROLE_PROVIDER).build();
        userRepository.save(user);
        Provider provider = new Provider().builder()
                .user(user).build();
        providerRepository.save(provider);
    }

    @Override
    public void updateProvider(Long id, UpdateProviderDto updateProviderDto) {
        Provider provider = providerRepository.findByProviderId(id);
        provider.setProviderName(updateProviderDto.getProviderName());
        provider.setProviderPhone(updateProviderDto.getProviderPhone());
        provider.setAddress(updateProviderDto.getAddress());
        provider.setDescription(updateProviderDto.getDescription());
        providerRepository.save(provider);
    }
}
