package com.booking.controller;

import com.booking.entity.Image;
import com.booking.exception.CustomException;
import com.booking.service.interfaces.ImageService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller
@RequiredArgsConstructor
public class ImageController {
    private final ImageService imageService;

    @PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_PROVIDER')")
    @PostMapping("/api/v1/image/upload")
    public ResponseEntity uploadImage(@RequestParam("images") List<MultipartFile> images) throws IOException {
        for (MultipartFile img : images) {
            imageService.saveUploadedFile(img);
        }
        return ResponseEntity.ok("Success");
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_PROVIDER')")
    @GetMapping("/api/v1/image")
    public ResponseEntity<Resource> getImage(@RequestParam("imageId") Long imageId) throws IOException {
        Path path = Paths.get(imageService.getPathImage(imageId));
        Image media = imageService.getImage(imageId);
        Resource resource = new UrlResource(path.toUri());
        if (resource.exists()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.valueOf(media.getType()).toString())
                    .body(resource);
        } else {
            throw new CustomException("Error: can open image");
        }
    }
}
