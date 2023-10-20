package com.booking.service.implement;

import com.booking.dto.request.CreateCategoryDto;
//import com.booking.*;
import com.booking.dto.response.CategoryDto;
import com.booking.dto.response.RoomDto;
import com.booking.entity.*;
import com.booking.exception.CustomException;
import com.booking.repository.CategoryRepository;
import com.booking.repository.ImageRepository;
import com.booking.repository.ProviderRepository;
import com.booking.repository.RoomRepository;
import com.booking.service.interfaces.ImageService;
import com.booking.service.interfaces.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomServiceImp implements RoomService {
    private final CategoryRepository categoryRepository;
    private final RoomRepository roomRepository;

    private final ProviderRepository providerRepository;
    private final ImageService imageService;
    private final ImageRepository imageRepository;

    public void addCategory(CreateCategoryDto createCategoryDto) throws IOException {
        Provider provider = providerRepository.findByProviderId(createCategoryDto.getProviderId());
        List<Integer> roomNumbers = createCategoryDto.getRoomNumbers();
        if (checkCategory(createCategoryDto.getCategoryName(), provider.getProviderId())) {

            Category category = new Category().builder()
                    .categoryName(createCategoryDto.getCategoryName())
                    .bedType(createCategoryDto.getBedType())
                    .area(createCategoryDto.getArea())
                    .person(createCategoryDto.getPerson())
                    .description(createCategoryDto.getDescription())
                    .price(createCategoryDto.getPrice())
                    .rooms(new HashSet<>())
                    .provider(provider).build();
            category.setImgRooms(createCategoryDto.getImgCategories().stream().map(data -> {
                try {
                    return imageService.saveUploadedFile(data);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }).collect(Collectors.toSet()));

            for (int i = 0; i < roomNumbers.size(); i++) {
                if (!checkRoomNumber(roomNumbers.get(i), getAllRoomNumber(createCategoryDto.getProviderId()))) {
                    throw new CustomException("Room số " + i + " đã tồn tại");
                } else {
                    Room room = new Room().builder()
                            .roomNumber(roomNumbers.get(i))
                            .category(category)
                            .build();
                    category.getRooms().add(room);
                }
            }
            categoryRepository.save(category);
        } else {
            throw new CustomException("Loại phòng " + createCategoryDto.getCategoryName() + " đã tồn tại");

        }
    }

    public List<Integer> getAllRoomNumber(Long providerId) {
        return roomRepository.findByProviderId(providerId).stream().map(Room::getRoomNumber).toList();
    }

    public boolean checkRoomNumber(int roomNumber, List<Integer> roomNumbers) {
        boolean check = true;
        for (int number : roomNumbers) {
            if (roomNumber == number) {
                check = false;
            }
        }
        return check;
    }

    public boolean checkCategory(String categoryName, Long providerId) {
        boolean check = true;
        List<String> categoryNames = providerRepository.findByProviderId(providerId).getCategories().stream().map(data -> data.getCategoryName()).toList();
        for (String str : categoryNames) {
            if (categoryName.equals(str)) {
                check = false;
            }
        }
        return check;
    }
}
