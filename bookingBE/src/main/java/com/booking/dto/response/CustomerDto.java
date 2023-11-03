package com.booking.dto.response;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode
public class CustomerDto {
    private Long avatarId;
    private String fullName;
    private String gender;
    private String phoneNumber;
    private String address;
    private String customerCode;
    private LocalDate dateOfBirth;
}
