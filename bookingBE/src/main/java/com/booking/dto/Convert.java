package com.booking.dto;

import com.booking.dto.response.*;
import com.booking.entity.*;
import com.booking.service.interfaces.ReviewService;
import lombok.AllArgsConstructor;

import java.util.List;
@AllArgsConstructor
public class Convert {
    private final ReviewService reviewService;

    public static ProviderDto convertProvider(Provider provider) {
        List<Long> imgIds = provider.getImgProviders().stream().map(Image::getImgId).toList();
        return ProviderDto.builder()
                .providerId(provider.getProviderId())
                .imgIdProviders(imgIds)
                .providerName(provider.getProviderName())
                .providerPhone(provider.getProviderPhone())
                .address(provider.getAddress())
                .description(provider.getDescription()).build();
    }
    public static CategoryDto convertCategory(Category category) {
        List<Long> imgIds = category.getImgRooms().stream().map(Image::getImgId).toList();
        List<Integer> rooms = category.getRooms().stream().map(Room::getRoomNumber).toList();
        return CategoryDto.builder()
                .imgIdCategories(imgIds)
                .categoryName(category.getCategoryName())
                .price(category.getPrice())
                .description(category.getDescription())
                .person(category.getPerson())
                .area(category.getArea())
                .bedType(category.getBedType())
                .roomNumbers(rooms)
                .countRoom(rooms.size())
                .categoryId(category.getCategoryId()).build();
    }

    public static RoomDto convertRoom(Room room) {
        CategoryDto category = convertCategory(room.getCategory());
        return new RoomDto(room.getRoomId(), room.getRoomNumber(), category);
    }

    public static ReservarDto convertReservarDto(Reservar reservar){
        StringBuilder roomReservar = new StringBuilder();
        List<Room> rooms = reservar.getStateRooms().stream().map(StateRoom::getRoom).toList();
        for(Room room: rooms){
            roomReservar.append(room.getRoomNumber()).append(" ");
        }
        ProviderDto providerDto = convertProvider(reservar.getProvider());
        CategoryDto categoryDto = convertCategory(reservar.getCategory());
        return ReservarDto.builder()
                .reservarId(reservar.getReservarId())
                .providerId(providerDto.getProviderId())
                .providerName(providerDto.getProviderName())
                .imgProvider(providerDto.getImgIdProviders().get(0))
                .imgCategory(categoryDto.getImgIdCategories().get(0))
                .categoryId(categoryDto.getCategoryId())
                .customerName(reservar.getCustomer().getFullName())
                .customerCode(reservar.getCustomer().getCustomerCode())
                .customerPhone(reservar.getCustomer().getPhoneNumber())
                .startDate(reservar.getStart())
                .endDate(reservar.getEnd())
                .stateReservar(reservar.getStateReservar().toString())
                .reservarDate(reservar.getReservarDate())
                .total(reservar.getTotal())
                .statePayment(reservar.getPaymentState())
                .rooms(roomReservar.toString().trim()).build();
    }

    public static ReviewDto convertToReviewDto(Review review, Reservar reservar){
        List<Long> imgIds = review.getImgReview().stream().map(Image::getImgId).toList();
        return ReviewDto.builder()
                .reviewId(review.getReviewId())
                .imgReview(imgIds)
                .rate(review.getRate())
                .description(review.getDescription())
                .reservar(convertReservarDto(reservar)).build();
    }
}
