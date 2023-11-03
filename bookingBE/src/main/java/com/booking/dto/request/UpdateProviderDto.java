package com.booking.dto.request;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProviderDto {
    private List<MultipartFile> imgProviders;
    private String providerName;
    private String providerPhone;
    private String address;
    private String description;
}
