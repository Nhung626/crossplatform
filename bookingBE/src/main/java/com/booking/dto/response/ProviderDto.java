package com.booking.dto.response;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode
public class ProviderDto {
    private List<Long> imgIdProviders;
    private Long providerId;
    private String providerName;
    private String providerPhone;
    private String address;
    private String description;
}
