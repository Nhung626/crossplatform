package com.booking.service.implement;

import com.booking.dto.request.CreateCategoryDto;
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
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImp implements RoomService {
    private final CategoryRepository categoryRepository;
    private final RoomRepository roomRepository;
    @Autowired
    private ProviderRepository providerRepository;
    @Autowired
    private ImageService imageService;
    @Autowired
    private ImageRepository imageRepository;

    public void addCategory(CreateCategoryDto createCategoryDto) throws IOException {
        Provider provider = providerRepository.findByProviderId(createCategoryDto.getProviderId());
        Category category = new Category().builder()
                .categoryName(createCategoryDto.getCategoryName())
                .bedType(createCategoryDto.getBedType())
                .area(createCategoryDto.getArea())
                .person(createCategoryDto.getPerson())
                .description(createCategoryDto.getDescription())
                .price(createCategoryDto.getPrice())
                .provider(provider).build();
        categoryRepository.save(category);

        List<MultipartFile> images = createCategoryDto.getImgCategories();
        for (MultipartFile img : images) {
            Image image = imageService.saveUploadedFile(img);
            image.setCategory(category);
            imageRepository.save(image);
        }

        List<Integer> roomNumbers = createCategoryDto.getRoomNumbers();
        ArrayList<Room> rooms = new ArrayList<Room>(roomNumbers.size());
        for (int i = 0; i < roomNumbers.size(); i++) {
            rooms.add(new Room().builder()
                    .roomNumber(roomNumbers.get(i))
                    .category(category)
                    .state(EStateRoom.AVAILABLE).build());
            if (roomRepository.findByRoomNumber(roomNumbers.get(i)) != null) {
                throw new CustomException("room exit");
            } else {
                roomRepository.save(rooms.get(i));
            }
        }
    }

    public CategoryDto getCategory(long categoryId) {
        Category category = categoryRepository.findByCategoryId(categoryId);
        List<Long> imgIds = category.getImgRooms().stream().map(img -> img.getImgId()).toList();
        List<Integer> rooms = category.getRooms().stream().map(room -> room.getRoomNumber()).toList();
        CategoryDto categoryDto = new CategoryDto().builder()
                .imgIdCategories(imgIds)
                .categoryName(category.getCategoryName())
                .price(category.getPrice())
                .description(category.getDescription())
                .person(category.getPerson())
                .area(category.getArea())
                .bedType(category.getBedType())
                .roomNumbers(rooms)
                .categoryId(category.getCategoryId()).build();
        return categoryDto;
    }

    public RoomDto getRoom(int roomNumber){
        Room room = roomRepository.findByRoomNumber(roomNumber);
        CategoryDto category = getCategory(room.getCategory().getCategoryId());
        return new RoomDto(room.getRoomNumber(), category);
    }
}
