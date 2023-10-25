package com.booking.controller;

import com.booking.dto.request.CreateCategoryDto;
import com.booking.dto.request.CreateUserDto;
import com.booking.dto.request.LoginUserDto;
import com.booking.dto.request.UpdateProviderDto;
import com.booking.dto.response.*;
import com.booking.entity.Provider;
import com.booking.repository.ProviderRepository;
import com.booking.security.jwt.JwtUtil;
import com.booking.service.implement.UserDetailsImpl;
import com.booking.service.interfaces.ProviderService;
import com.booking.service.interfaces.ReservarService;
import com.booking.service.interfaces.ReviewService;
import com.booking.service.interfaces.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.Arrays;
import java.util.List;
import java.io.IOException;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/provider")
public class ProviderController {
    private final ProviderService providerService;
    private final RoomService roomService;
    private final ReservarService reservarService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final ProviderRepository providerRepository;
    private final ReviewService reviewService;

    @PostMapping(value = "/auth/sign-up")
    public ResponseEntity<Object> createProvider(@RequestBody CreateUserDto createUserDto){
        providerService.addProvider(createUserDto);
        return ResponseEntity.ok("success");
    }

    @PostMapping(value = "/auth/login")
    public ResponseEntity<Object> login(@RequestBody LoginUserDto loginUserDto){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginUserDto.getEmail(), loginUserDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();
        Provider provider = providerRepository.findByUserId(userDetails.getId());
        String role = roles.get(0);
        return ResponseEntity.ok(new JwtUserResponse().builder()
                .token(jwt).role(role).type("Bearer")
                .id(provider.getProviderId())
                .email(provider.getUser().getEmail())
                .build());
    }

    @PreAuthorize("hasRole('ROLE_PROVIDER')")
    @PostMapping(value = "/update")
    public ResponseEntity<Object> updateProvider(Principal principal,
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
        providerService.updateProvider(getProviderId(principal), updateProviderDto);
        return ResponseEntity.ok("success");
    }

    @PreAuthorize("hasRole('ROLE_PROVIDER')")
    @PostMapping(value = "/add-room")
    public ResponseEntity<Object> addRoom(Principal principal,
                                          @RequestParam("imgCategories") List<MultipartFile> images,
                                          @RequestParam("person") int person,
                                          @RequestParam("categoryName") String categoryName,
                                          @RequestParam("area") float area,
                                          @RequestParam("bedType") String bedType,
                                          @RequestParam("description") String description,
                                          @RequestParam("price") int price,
                                          @RequestParam("roomNumbers") String roomNumbers) throws IOException {
        List<Integer> numbers = Arrays.stream(roomNumbers.split(",")).map(n -> Integer.valueOf(n.trim())).toList();
        CreateCategoryDto createCategoryDto = new CreateCategoryDto().builder()
                .imgCategories(images)
                .providerId(getProviderId(principal))
                .categoryName(categoryName)
                .person(person)
                .area(area)
                .bedType(bedType)
                .price(price)
                .description(description)
                .roomNumbers(numbers).build();
        roomService.addCategory(createCategoryDto);
        return ResponseEntity.ok("Success");
    }
    @PreAuthorize("hasRole('ROLE_PROVIDER')")
    @PostMapping(value = "/update-category")
    public ResponseEntity<Object> updateCategory(
            @RequestParam("categoryId")Long categoryId,
            @RequestParam("roomNumbers") String roomNumbers
    ){
        List<Integer> numbers = Arrays.stream(roomNumbers.split(",")).map(n -> Integer.valueOf(n.trim())).toList();
        roomService.addRoom(categoryId, numbers);
        return ResponseEntity.ok("Success");
    }

    @PreAuthorize("hasRole('ROLE_PROVIDER')")
    @GetMapping("/get-categories")
    public ResponseEntity<List<CategoryDto>> getCategories(Principal principal) {
        return ResponseEntity.ok(providerService.getAllCategories(getProviderId(principal)));
    }

    @PreAuthorize("hasRole('ROLE_PROVIDER')")
    @GetMapping("/get-category")
    public ResponseEntity<CategoryDto> getCategory(@RequestParam("categoryId") Long categoryId) {
        return ResponseEntity.ok(providerService.getCategory(categoryId));
    }

    @PreAuthorize("hasRole('ROLE_PROVIDER')")
    @GetMapping("/get-provider")
    public ResponseEntity<ProviderDto> getProvider(Principal principal) {
        return ResponseEntity.ok(providerService.getProvider(getProviderId(principal)));
    }

    @PreAuthorize("hasRole('ROLE_PROVIDER')")
    @GetMapping(value = "/list-cancel")
    public ResponseEntity<List<ReservarDto>> getCancel(Principal principal) {
        return ResponseEntity.ok(providerService.getCancel(getProviderId(principal)));
    }

    @PreAuthorize("hasRole('ROLE_PROVIDER')")
    @GetMapping(value = "/list-booked")
    public ResponseEntity<List<ReservarDto>> getBooking(Principal principal) {
        return ResponseEntity.ok(providerService.getBooking(getProviderId(principal)));
    }

    @PreAuthorize("hasRole('ROLE_PROVIDER')")
    @GetMapping(value = "/list-checkin")
    public ResponseEntity<List<ReservarDto>> getCheckin(Principal principal) {
        return ResponseEntity.ok(providerService.getCheckin(getProviderId(principal)));
    }

    @PreAuthorize("hasRole('ROLE_PROVIDER')")
    @GetMapping(value = "/list-checkout")
    public ResponseEntity<List<ReservarDto>> getCheckout(Principal principal) {
        return ResponseEntity.ok(providerService.getCheckout(getProviderId(principal)));
    }

    public Long getProviderId(Principal principal) {
        UserDetailsImpl userDetails = (UserDetailsImpl) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        Provider provider = providerRepository.findByUserId(userDetails.getId());
        return provider.getProviderId();
    }

    @PreAuthorize("hasRole('ROLE_PROVIDER')")
    @PostMapping(value = "/checkin")
    public ResponseEntity<Object> checkin(Principal principal, @RequestParam("reservarId") Long reservarId) {
        reservarService.changeStateCheckin(reservarId);
        return ResponseEntity.ok("Checkin thành công");
    }

    @PreAuthorize("hasRole('ROLE_PROVIDER')")
    @PostMapping(value = "/checkout")
    public ResponseEntity<Object> checkout(Principal principal, @RequestParam("reservarId") Long reservarId) {
        reservarService.changeStateCheckout(reservarId);
        return ResponseEntity.ok("Checkout thành công");
    }

    @PreAuthorize("hasRole('ROLE_PROVIDER')")
    @PostMapping(value = "/cancel")
    public ResponseEntity<Object> cancel(Principal principal, @RequestParam("reservarId") Long reservarId) {
        if (reservarService.changeCancel(reservarId, getProviderId(principal))) {
            return ResponseEntity.ok("Checkout thành công");
        }else {
            return ResponseEntity.status(400).body("Hủy không thành công");
        }
    }

    @PreAuthorize("hasRole('ROLE_PROVIDER')")
    @GetMapping(value = "/list-reviews")
    public ResponseEntity<List<ReviewDto>> getReview(Principal principal){
        return ResponseEntity.ok(reviewService.getProviderReviews(getProviderId(principal)));
    }
}
