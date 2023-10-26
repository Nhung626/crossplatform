package com.booking.controller;

import com.booking.dto.request.CreateReviewDto;
import com.booking.dto.request.CreateUserDto;
import com.booking.dto.request.LoginUserDto;
import com.booking.dto.request.UpdateCustomerDto;
import com.booking.dto.response.*;
import com.booking.entity.Customer;
import com.booking.repository.CustomerRepository;
import com.booking.security.jwt.JwtUtil;
import com.booking.service.implement.UserDetailsImpl;
import com.booking.service.interfaces.CustomerService;
import com.booking.service.interfaces.FavoriteService;
import com.booking.service.interfaces.ProviderService;
import com.booking.service.interfaces.ReviewService;
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

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/v1/customer")
public class CustomerController {
    private final CustomerService customerService;
    private final FavoriteService favoriteService;
    private final ProviderService providerService;
    private final ReviewService reviewService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomerRepository customerRepository;

    @PostMapping(value = "/auth/sign-up")
    public ResponseEntity<Object> createCustomer(@RequestBody CreateUserDto createUserDto) {
        customerService.addCustomer(createUserDto);
        return ResponseEntity.status(200).build();
    }

    @PostMapping(value = "/auth/login")
    public ResponseEntity<Object> login(@RequestBody LoginUserDto loginUserDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginUserDto.getEmail(), loginUserDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();
        String role = roles.get(0);
        Customer customer = customerRepository.findByUserId(userDetails.getId());
        return ResponseEntity.ok(JwtUserResponse.builder()
                .token(jwt).role(role).type("Bearer")
                .id(customer.getCustomerId())
                .email(customer.getUser().getEmail())
                .build());
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @PostMapping(value = "/update")
    public ResponseEntity<Object> updateCustomer(@RequestParam("avatar") MultipartFile avatar,
                                                 @RequestParam("fullName") String fullName,
                                                 @RequestParam("gender") String gender,
                                                 @RequestParam("phoneNumber") String phoneNumber,
                                                 @RequestParam("address") String address,
                                                 @RequestParam("customerCode") String customerCode,
                                                 @RequestParam("dateOfBirth") LocalDate birthDay,
                                                 Principal principal) throws IOException {
        UpdateCustomerDto updateCustomerDto = new UpdateCustomerDto(avatar, fullName, gender, phoneNumber, address, customerCode, birthDay);
        customerService.updateCustomer(getCustomerId(principal), updateCustomerDto);
        return ResponseEntity.status(200).build();
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @PostMapping(value = "/add-favorite")
    public ResponseEntity<Object> addFavorite(Principal principal, @RequestParam("providerId") Long providerId) {
        favoriteService.addFavoriteProvider(getCustomerId(principal), providerId);
        return ResponseEntity.status(200).build();
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @GetMapping(value = "/get-customer")
    public ResponseEntity<CustomerDto> getCustomer(Principal principal) {
        CustomerDto customerDto = customerService.getCustomer(getCustomerId(principal));
        return ResponseEntity.ok(customerDto);
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @DeleteMapping(value = "/del-favorite")
    public ResponseEntity<Object> removeFavorite(Principal principal, @RequestParam("providerId") Long providerId) {
        favoriteService.removeFavoriteProvider(getCustomerId(principal), providerId);
        return ResponseEntity.status(200).build();
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @GetMapping(value = "/list-favorite")
    public ResponseEntity<List<ProviderDto>> getFavorites(Principal principal) {
        return ResponseEntity.ok(favoriteService.getFavoriteProvider(getCustomerId(principal)));
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @PostMapping(value = "/add-review")
    public ResponseEntity<Object> createReview(
            @RequestParam("imgReview") List<MultipartFile> imgReview,
            @RequestParam("rate") int rate,
            @RequestParam("description") String description,
            @RequestParam("reservarId") Long reservarId
    ) {
        reviewService.createReview(
                CreateReviewDto.builder()
                        .imgReview(imgReview)
                        .rate(rate)
                        .reservarId(reservarId)
                        .description(description).build()

        );
        return ResponseEntity.ok("Success");
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @GetMapping(value = "/list-reviews")
    public ResponseEntity<List<ReviewDto>> getReview(Principal principal) {
        return ResponseEntity.ok(reviewService.getCustomerReviews(getCustomerId(principal)));
    }

    public Long getCustomerId(Principal principal) {
        UserDetailsImpl userDetails = (UserDetailsImpl) ((UsernamePasswordAuthenticationToken) principal).getPrincipal();
        Customer customer = customerRepository.findByUserId(userDetails.getId());
        return customer.getCustomerId();
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @GetMapping("/get-categories")
    public ResponseEntity<List<CategoryDto>> getCategories(@RequestParam("providerId") Long providerId) {
        return ResponseEntity.ok(providerService.getAllCategories(providerId));
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @GetMapping("/get-category")
    public ResponseEntity<CategoryDto> getCategory(@RequestParam("categoryId") Long categoryId) {
        return ResponseEntity.ok(providerService.getCategory(categoryId));
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @GetMapping("/get-provider")
    public ResponseEntity<ProviderDto> getProvider(@RequestParam("providerId") Long providerId) {
        return ResponseEntity.ok(providerService.getProvider(providerId));
    }

    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @GetMapping("/get-providers")
    public ResponseEntity<List<ProviderDto>> getAllProviders() {
        return ResponseEntity.ok(providerService.getAllProviders());
    }
}
