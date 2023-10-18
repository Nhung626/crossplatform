package com.booking.service.implement;

import com.booking.dto.Convert;
import com.booking.dto.request.CreateUserDto;
import com.booking.dto.request.UpdateProviderDto;
import com.booking.dto.response.CategoryDto;
import com.booking.dto.response.ProviderDto;
import com.booking.dto.response.ReservarDto;
import com.booking.dto.response.RoomDto;
import com.booking.entity.*;
import com.booking.exception.CustomException;
import com.booking.repository.*;
import com.booking.service.interfaces.ImageService;
import com.booking.service.interfaces.ProviderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final CategoryRepository categoryRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final ReservarRepository reservarRepository;
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
            providerDtos.add(Convert.convertProvider(provider));
        }
        return providerDtos;
    }

    @Override
    public ProviderDto getProvider(Long providerId) {
        Provider provider = providerRepository.findByProviderId(providerId);
        return Convert.convertProvider(provider);
    }



    @Override
    public List<CategoryDto> getAllCategories(Long providerId) {
        Provider provider = providerRepository.findByProviderId(providerId);
        List<Category> categories = provider.getCategories().stream().toList();
        List<CategoryDto> categoryDtos = new ArrayList<>();
        for (Category category : categories) {
            categoryDtos.add(Convert.convertCategory(category));
        }
        return categoryDtos;
    }

    @Override
    public CategoryDto getCategory(long categoryId) {
        Category category = categoryRepository.findByCategoryId(categoryId);
        return Convert.convertCategory(category);
    }

    public List<Integer> getAllRoomNumber(Long providerId) {
        List<Integer> roomNumbers = roomRepository.findByProviderId(providerId).stream().map(room->room.getRoomNumber()).toList();
        return  roomNumbers;
    }
    public RoomDto getRoom(long roomId) {
        Room room = roomRepository.findByRoomId(roomId);
        return Convert.convertRoom(room);
    }


    public List<ReservarDto> getCheckout(Long providerId) {
        List<ReservarDto> reservarDtos = new ArrayList<>();
        List<Reservar> reservars = reservarRepository.getAllCheckout(providerId);
        for (Reservar reservar : reservars) {
            reservarDtos.add(Convert.convertReservarDto(reservar));
        }
        return reservarDtos;
    }
    public List<ReservarDto> getCheckin(Long providerId) {
        List<ReservarDto> reservarDtos = new ArrayList<>();
        List<Reservar> reservars = reservarRepository.getAllCheckin(providerId);
        for (Reservar reservar : reservars) {
            reservarDtos.add(Convert.convertReservarDto(reservar));
        }
        return reservarDtos;
    }
    public List<ReservarDto> getBooking(Long providerId) {
        List<ReservarDto> reservarDtos = new ArrayList<>();
        List<Reservar> reservars = reservarRepository.getAllBooked(providerId);
        for (Reservar reservar : reservars) {
            reservarDtos.add(Convert.convertReservarDto(reservar));
        }
        return reservarDtos;
    }

    public List<ReservarDto> getCancel(Long providerId) {
        List<ReservarDto> reservarDtos = new ArrayList<>();
        List<Reservar> reservars = reservarRepository.getAllCancel(providerId);
        for (Reservar reservar : reservars) {
            reservarDtos.add(Convert.convertReservarDto(reservar));
        }
        return reservarDtos;
    }
}
