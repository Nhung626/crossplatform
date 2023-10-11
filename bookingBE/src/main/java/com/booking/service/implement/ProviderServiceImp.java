package com.booking.service.implement;

import com.booking.dto.request.CreateUserDto;
import com.booking.dto.request.UpdateProviderDto;
import com.booking.dto.response.CategoryDto;
import com.booking.dto.response.ProviderDto;
import com.booking.entity.*;
import com.booking.exception.CustomException;
import com.booking.repository.ImageRepository;
import com.booking.repository.ProviderRepository;
import com.booking.repository.UserRepository;
import com.booking.service.interfaces.ImageService;
import com.booking.service.interfaces.ProviderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProviderServiceImp implements ProviderService {
    private final ProviderRepository providerRepository;
    private final UserRepository userRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    private ImageService imageService;
    @Autowired
    private ImageRepository imageRepository;

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
    public void updateProvider(Long id, UpdateProviderDto updateProviderDto) throws IOException {
        Provider provider = providerRepository.findByProviderId(id);
        provider.setProviderName(updateProviderDto.getProviderName());
        provider.setProviderPhone(updateProviderDto.getProviderPhone());
        provider.setAddress(updateProviderDto.getAddress());
        provider.setDescription(updateProviderDto.getDescription());
        providerRepository.save(provider);
        List<MultipartFile> images = updateProviderDto.getImgProviders();
        for (MultipartFile img : images) {
            Image image = imageService.saveUploadedFile(img);
            image.setProvider(provider);
            imageRepository.save(image);
        }
    }

    public List<ProviderDto> getAllProviders() {
        List<Provider> providers = providerRepository.findAll();
        List<ProviderDto> providerDtos = new ArrayList<>();
        for (Provider provider : providers) {
            List<Long> imgIds = provider.getImgProviders().stream().map(img -> img.getImgId()).toList();
            providerDtos.add(new ProviderDto().builder()
                    .providerId(provider.getProviderId())
                    .imgIdProviders(imgIds)
                    .providerName(provider.getProviderName())
                    .providerPhone(provider.getProviderPhone())
                    .address(provider.getAddress())
                    .description(provider.getDescription()).build());
        }
        return providerDtos;
    }

    public ProviderDto getProvider(Long providerId){
        Provider provider = providerRepository.findByProviderId(providerId);
        List<Long> imgIds = provider.getImgProviders().stream().map(img -> img.getImgId()).toList();

        ProviderDto providerDto = new ProviderDto().builder()
                .providerId(provider.getProviderId())
                .imgIdProviders(imgIds)
                .providerName(provider.getProviderName())
                .providerPhone(provider.getProviderPhone())
                .address(provider.getAddress())
                .description(provider.getDescription()).build();
        return providerDto;
    }
    @Override
    public List<CategoryDto> getAllCategories(Long providerId) {
        Provider provider = providerRepository.findByProviderId(providerId);
        List<Category> categories = provider.getCategories().stream().toList();
        List<CategoryDto> categoryDtos = new ArrayList<>();
        for (Category category : categories) {
            List<Long> imgIds = category.getImgRooms().stream().map(img -> img.getImgId()).toList();
            List<Integer> rooms = category.getRooms().stream().map(room -> room.getRoomNumber()).toList();
            categoryDtos.add(new CategoryDto().builder()
                    .imgIdCategories(imgIds)
                    .categoryName(category.getCategoryName())
                    .price(category.getPrice())
                    .description(category.getDescription())
                    .person(category.getPerson())
                    .area(category.getArea())
                    .bedType(category.getBedType())
                    .roomNumbers(rooms)
                    .categoryId(category.getCategoryId()).build());
        }
        return categoryDtos;
    }
}
