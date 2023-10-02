package com.booking.dto.request;
import lombok.*;

import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CreateUserDto {
    private String password;
    private String email;
    private Set<String> role;
}
