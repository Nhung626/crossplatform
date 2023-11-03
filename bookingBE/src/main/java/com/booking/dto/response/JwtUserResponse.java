package com.booking.dto.response;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtUserResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
//    private String username;
    private String email;
    private String role;
}
