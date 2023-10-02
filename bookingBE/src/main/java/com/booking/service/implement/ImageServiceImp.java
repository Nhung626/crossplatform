package com.booking.service.implement;

import com.booking.entity.Image;
import com.booking.repository.ImageRepository;
import com.booking.service.interfaces.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
@Service
@RequiredArgsConstructor
public class ImageServiceImp implements ImageService {
    private final ImageRepository imageRepository;

    @Value("${media.img_path}")
    private String imgPath;

    public Image getImage(Long id) {
        return imageRepository.findById(id).orElse(null);
    }

    public String getPathImage(Long id) {
        Image image = imageRepository.findById(id).orElse(null);
        String path = "";
        if (image != null) {
            path = imgPath + File.separator + image.getImgName();
        }
        return path;
    }
}
