package com.booking.dto;

import com.booking.dto.response.CategoryDto;
import com.booking.dto.response.ProviderDto;
import com.booking.dto.response.ReservarDto;
import com.booking.dto.response.RoomDto;
import com.booking.entity.Category;
import com.booking.entity.Provider;
import com.booking.entity.Reservar;
import com.booking.entity.Room;
import com.booking.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class Convert {

    public static ProviderDto convertProvider(Provider provider) {
        List<Long> imgIds = provider.getImgProviders().stream().map(img -> img.getImgId()).toList();
        ProviderDto providerDto = new ProviderDto().builder()
                .providerId(provider.getProviderId())
                .imgIdProviders(imgIds)
                .providerName(provider.getProviderName())
                .providerPhone(provider.getProviderPhone())
                .address(provider.getAddress())
                .description(provider.getDescription()).build();
        return providerDto;
    }
    public static CategoryDto convertCategory(Category category) {
        List<Long> imgIds = category.getImgRooms().stream().map(img -> img.getImgId()).toList();
        List<Integer> rooms = category.getRooms().stream().map(room -> room.getRoomNumber()).toList();
        CategoryDto categoryDto = new CategoryDto().builder()
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
        return categoryDto;
    }

    public static RoomDto convertRoom(Room room) {
        CategoryDto category = convertCategory(room.getCategory());
        return new RoomDto(room.getRoomId(), room.getRoomNumber(), category);
    }

    public static ReservarDto convertReservarDto(Reservar reservar){
        String roomReservar = "";
        List<Room> rooms = reservar.getStateRooms().stream().map(stateRoom -> stateRoom.getRoom()).toList();
        for(Room room: rooms){
            roomReservar+=room.getRoomNumber() + " ";
        }
        ReservarDto reservarDto = new ReservarDto().builder()
                .reservarId(reservar.getReservarId())
                .customerName(reservar.getCustomer().getFullName())
                .customerCode(reservar.getCustomer().getCustomerCode())
                .customerPhone(reservar.getCustomer().getPhoneNumber())
                .checkin(reservar.getCheckin())
                .checkout(reservar.getCheckout())
                .stateReservar(reservar.getStateReservar().toString())
                .reservarDate(reservar.getReservarDate())
                .rooms(roomReservar.trim()).build();
        return reservarDto;
    }
}
