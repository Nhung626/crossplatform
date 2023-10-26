package com.booking.service.interfaces;

import com.booking.dto.request.CreateCategoryDto;
import com.booking.dto.request.UpdateCategoryDto;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public interface RoomService {
    void addCategory(CreateCategoryDto createCategoryDto) throws IOException;
    void addRoom(Long categoryId, List<Integer> roomNumbers);
    void updateCategory(UpdateCategoryDto updateCategoryDto);
}
