package com.booking.controller;

import com.booking.dto.request.CreateCategoryDto;
import com.booking.dto.request.CreateUserDto;
import com.booking.dto.request.LoginUserDto;
import com.booking.dto.request.UpdateProviderDto;
import com.booking.dto.response.JwtUserResponse;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

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
    public ResponseEntity<Object> updateProvider(@PathVariable Long id, @RequestBody UpdateProviderDto updateProviderDto) {
        providerService.updateProvider(id, updateProviderDto);
        return ResponseEntity.status(200).build();
    }

    @PreAuthorize("hasRole('ROLE_PROVIDER')")
    @PostMapping(value = "/add-room")
    public ResponseEntity<Object> addRoom(@RequestBody CreateCategoryDto createCategoryDto) {
        roomService.addCategory(createCategoryDto);
        return ResponseEntity.status(200).build();
    }
}
