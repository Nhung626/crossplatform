package com.booking.controller;

import com.booking.service.interfaces.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ImageController {
    private final ImageService imageService;
}
