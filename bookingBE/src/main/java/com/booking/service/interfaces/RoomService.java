package com.booking.service.interfaces;

import com.booking.dto.request.CreateCategoryDto;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface RoomService {
    void addCategory(CreateCategoryDto createCategoryDto) throws IOException;
}
