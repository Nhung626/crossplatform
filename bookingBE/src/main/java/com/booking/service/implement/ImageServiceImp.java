package com.booking.service.implement;

import com.booking.entity.Image;
import com.booking.repository.ImageRepository;
import com.booking.service.interfaces.ImageService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class ImageServiceImp implements ImageService {
    private final ImageRepository imageRepository;
    @Value("${media.img_path}")
    private String uploadedFolder;
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

    //    @Override
    public Image saveUploadedFile(MultipartFile file) throws IOException {
        File dir = new File(uploadedFolder);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        Random rand = new Random();
        int ranNum = rand.nextInt();
        if (!file.isEmpty()) {
            byte[] bytes = file.getBytes();
            Path path = Paths.get(dir + File.separator + file.getName() + ranNum + getFileExtension(file.getOriginalFilename()));
            Files.write(path, bytes);
            Image image = new Image();
            image.setImgName(path.getFileName().toString());
            image.setType(file.getContentType());
            image = imageRepository.save(image);
            return image;
        }
        return null;
    }

    public String getFileExtension(String fileName) {
        return "." + FilenameUtils.getExtension(fileName);
    }
}
