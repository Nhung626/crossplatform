package com.booking.controller;

import com.booking.dto.request.CreateUserDto;
import com.booking.dto.request.LoginUserDto;
import com.booking.dto.request.UpdateProviderDto;
import com.booking.dto.response.JwtUserResponse;
import com.booking.security.jwt.JwtUtil;
import com.booking.service.implement.UserDetailsImpl;
import com.booking.service.interfaces.ProviderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtil jwtUtil;

    @PostMapping(value = "/auth/signup")
    public ResponseEntity<Object> createProvider(@RequestBody CreateUserDto createuserDto) throws IOException {
        providerService.addProvider(createuserDto);
        return ResponseEntity.status(200).build();
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
         String role = roles.get(0);
        return ResponseEntity.ok(new JwtUserResponse().builder()
                .token(jwt).role(role)
                .email(userDetails.getEmail())
                .build());
    }

    @PostMapping(value = "/update/{id}")
    public ResponseEntity<Object> updateProvider(@PathVariable Long id, @RequestBody UpdateProviderDto updateProviderDto) {
        providerService.updateProvider(id, updateProviderDto);
        return ResponseEntity.status(200).build();
    }
}
