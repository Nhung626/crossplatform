package com.booking.dto.request;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCustomerDto {
    private MultipartFile avatar;
    private String fullName;
    private String gender;
    private String phoneNumber;
    private String address;
    private String customerCode;
    private LocalDate dateOfBirth;


}
