package com.booking.service.interfaces;

import com.booking.dto.request.CreateCategoryDto;
import org.springframework.stereotype.Service;

@Service
public interface RoomService {
    void addCategory(CreateCategoryDto createCategoryDto);
}
