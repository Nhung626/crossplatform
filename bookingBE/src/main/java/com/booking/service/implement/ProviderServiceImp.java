package com.booking.service.implement;

import com.booking.dto.request.CreateUserDto;
import com.booking.dto.request.UpdateProviderDto;
import com.booking.entity.ERole;
import com.booking.entity.Provider;
import com.booking.entity.User;
import com.booking.exception.CustomException;
import com.booking.repository.ImageRepository;
import com.booking.repository.ProviderRepository;
import com.booking.repository.UserRepository;
import com.booking.service.interfaces.ProviderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProviderServiceImp implements ProviderService {
    private final ProviderRepository providerRepository;
    private final UserRepository userRepository;
    @Autowired
    PasswordEncoder encoder;
    private final ImageRepository imageRepository;

    @Value("${media.img_path}")
    private String uploadedFolder;

    @Override
    public void addProvider(CreateUserDto userDto) {
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new CustomException("Error: Email is already in use!");
        }
        // Create new user's account
        User user = new User().builder()
                .email(userDto.getEmail())
                .password(encoder.encode(userDto.getPassword()))
                .role(ERole.ROLE_PROVIDER).build();
        userRepository.save(user);
        Provider provider = new Provider().builder()
                .user(user).build();
        providerRepository.save(provider);
    }

    @Override
    public void updateProvider(Long id, UpdateProviderDto updateProviderDto) {
        Provider provider = providerRepository.findByProviderId(id);
        provider.setProviderName(updateProviderDto.getProviderName());
        provider.setProviderPhone(updateProviderDto.getProviderPhone());
        provider.setAddress(updateProviderDto.getAddress());
        provider.setDescription(updateProviderDto.getDescription());
        providerRepository.save(provider);
    }
//    @Override
//    public Long saveUploadedFiles(MultipartFile file) throws IOException {
//        File dir = new File(uploadedFolder);
//        if (!dir.exists()) {
//            dir.mkdirs();
//        }
//        Random rand = new Random();
//        int ranNum = rand.nextInt();
//        if (!file.isEmpty()) {
//            byte[] bytes = file.getBytes();
//            Path path = Paths.get(dir + "//" + file.getName() + ranNum + getFileExtension(file.getOriginalFilename()));
//            Files.write(path, bytes);
//            Image image = new Image();
//            image.setImgName(path.getFileName().toString());
//            image.setType(file.getContentType());
//            image = imageRepository.save(image);
//            return image.getImgId();
//        }
//        return null;
//    }

//    public String getFileExtension(String fileName){
//        return "." + FilenameUtils.getExtension(fileName);
//    }
}
