package com.booking.service.implement;

import com.booking.dto.request.CreateCategoryDto;
import com.booking.entity.Category;
import com.booking.entity.EStateRoom;
import com.booking.entity.Provider;
import com.booking.entity.Room;
import com.booking.exception.CustomException;
import com.booking.repository.CategoryRepository;
import com.booking.repository.ProviderRepository;
import com.booking.repository.RoomRepository;
import com.booking.service.interfaces.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public void addCategory(CreateCategoryDto createCategoryDto) {
        Provider provider = providerRepository.findByProviderId(createCategoryDto.getProviderId());
        Category category = new Category().builder()
                .categoryName(createCategoryDto.getCategoryName())
                .description(createCategoryDto.getDescription())
                .price(createCategoryDto.getPrice())
                .provider(provider).build();
        categoryRepository.save(category);
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
}
