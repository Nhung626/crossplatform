package com.booking.service.interfaces;

import com.booking.entity.Image;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public interface ImageService {
    Image getImage(Long id);
    String getPathImage(Long id);
    Image saveUploadedFile(MultipartFile file) throws IOException;
//    String getFileExtension(String fileName);
}
