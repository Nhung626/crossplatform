package com.booking.controller;

import com.booking.dto.request.CreateCategoryDto;
import com.booking.dto.request.CreateUserDto;
import com.booking.dto.request.LoginUserDto;
import com.booking.dto.request.UpdateProviderDto;
import com.booking.dto.response.CategoryDto;
import com.booking.dto.response.JwtUserResponse;
import com.booking.dto.response.ProviderDto;
import com.booking.entity.Category;
import com.booking.entity.Provider;
import com.booking.repository.ProviderRepository;
import com.booking.security.jwt.JwtUtil;
import com.booking.service.implement.UserDetailsImpl;
import com.booking.service.interfaces.ProviderService;
import com.booking.service.interfaces.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.io.IOException;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/provider")
public class ProviderController {
    private final ProviderService providerService;
    private final RoomService roomService;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    ProviderRepository providerRepository;

    @PostMapping(value = "/auth/sign-up")
    public ResponseEntity<Object> createProvider(@RequestBody CreateUserDto createUserDto) throws IOException {
        providerService.addProvider(createUserDto);
        return ResponseEntity.ok("success");
    }

    @PostMapping(value = "/auth/login")
    public ResponseEntity<Object> login(@RequestBody LoginUserDto loginUserDto) throws IOException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginUserDto.getEmail(), loginUserDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        Provider provider = providerRepository.findByUserId(userDetails.getId());
        String role = roles.get(0);
        return ResponseEntity.ok(new JwtUserResponse().builder()
                .token(jwt).role(role).type("Bearer")
                .id(provider.getProviderId())
                .email(provider.getUser().getEmail())
                .build());
    }

    @PreAuthorize("hasRole('ROLE_PROVIDER')")
    @PostMapping(value = "/update/{id}")
    public ResponseEntity<Object> updateProvider(@PathVariable Long id,
                                                 @RequestParam("imgProviders") List<MultipartFile> images,
                                                 @RequestParam("providerName") String providerName,
                                                 @RequestParam("providerPhone") String providerPhone,
                                                 @RequestParam("address") String address,
                                                 @RequestParam("description") String description) throws IOException {
        UpdateProviderDto updateProviderDto = new UpdateProviderDto().builder()
                .imgProviders(images)
                .providerName(providerName)
                .providerPhone(providerPhone)
                .address(address)
                .description(description).build();
        providerService.updateProvider(id, updateProviderDto);
        return ResponseEntity.ok("success");
    }

    @PreAuthorize("hasRole('ROLE_PROVIDER')")
    @PostMapping(value = "/add-room")
    public ResponseEntity<Object> addRoom(@RequestParam("imgCategories") List<MultipartFile> images,
                                          @RequestParam("providerId") Long providerId,
                                          @RequestParam("person") int person,
                                          @RequestParam("categoryName") String categoryName,
                                          @RequestParam("area") float area,
                                          @RequestParam("bedType") String bedType,
                                          @RequestParam("description") String description,
                                          @RequestParam("price") int price,
                                          @RequestParam("roomNumbers") String roomNumbers) throws IOException {
        List<Integer> numbers = Arrays.stream(roomNumbers.split(",")).map(n -> Integer.valueOf(n)).toList();
        CreateCategoryDto createCategoryDto = new CreateCategoryDto().builder()
                .imgCategories(images)
                .providerId(providerId)
                .categoryName(categoryName)
                .person(person)
                .area(area)
                .bedType(bedType)
                .price(price)
                .description(description)
                .roomNumbers(numbers).build();
        roomService.addCategory(createCategoryDto);
        return ResponseEntity.status(200).build();
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_PROVIDER')")
    @GetMapping("/get-categories/{id}")
    public ResponseEntity<List<CategoryDto>> getCategories(@PathVariable("id") Long providerId){
        return ResponseEntity.ok(providerService.getAllCategories(providerId));
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_PROVIDER')")
    @GetMapping("/get-category/{id}")
    public ResponseEntity<CategoryDto> getCategory(@PathVariable("id") Long categoryId){
        return ResponseEntity.ok(roomService.getCategory(categoryId));
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_PROVIDER')")
    @GetMapping("/get-provider/{id}")
    public ResponseEntity<ProviderDto> getProvider(@PathVariable("id") Long providerId){
        return ResponseEntity.ok(providerService.getProvider(providerId));
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @GetMapping("/get-providers")
    public ResponseEntity<List<ProviderDto>> getAllProviders(){
        return ResponseEntity.ok(providerService.getAllProviders());
    }
}