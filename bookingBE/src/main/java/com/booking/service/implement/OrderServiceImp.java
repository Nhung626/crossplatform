package com.booking.service.implement;

import com.booking.dto.request.CreateReservarDto;
import com.booking.dto.response.CategoryDto;
import com.booking.dto.response.ProviderDto;
import com.booking.entity.*;
import com.booking.exception.CustomException;
import com.booking.repository.CustomerRepository;
import com.booking.repository.OrderRepository;
import com.booking.repository.RoomRepository;
import com.booking.repository.StateRoomRepository;
import com.booking.service.interfaces.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class OrderServiceImp implements OrderService {
    private final OrderRepository reservarRepository;
    private final StateRoomRepository stateRoomRepository;
    private final CustomerRepository customerRepository;
    private final RoomRepository roomRepository;

    public void createOrder(CreateReservarDto createOrderDto) {
        Customer customer = customerRepository.findByCustomerId(createOrderDto.getCustomerId());
        Reservar reservar = new Reservar().builder()
                .reservarDate(LocalDateTime.now())
                .customer(customer)
                .stateReservar(EStateReservar.BOOKED)
                .rooms(new HashSet<>()).build();
        List<Long> roomIds = Arrays.stream(createOrderDto.getRoomIds().split(",")).map(n -> Long.valueOf(n)).toList();
        for (int i = 0; i < roomIds.size(); i++) {
            if (checkState(roomIds.get(i), createOrderDto.getStartDate(), createOrderDto.getEndDate())) {
                Room room = roomRepository.findByRoomId(roomIds.get(i));
                StateRoom stateRoom = new StateRoom().builder()
                        .start(createOrderDto.getStartDate())
                        .end(createOrderDto.getEndDate())
                        .status(EStateRoom.BOOKED)
                        .room(room).build();
                room.getStateRooms().add(stateRoom);
                room.getReservarRooms().add(reservar);
                reservar.getRooms().add(room);
                stateRoomRepository.save(stateRoom);
                roomRepository.save(room);
                reservarRepository.save(reservar);
            } else {
                throw new CustomException("Phòng không đủ điều kiện đặt.");
            }
        }
    }

    public boolean checkState(Long roomId, LocalDate start, LocalDate end) {
        boolean check = true;
        Room room = roomRepository.findByRoomId(roomId);
        Set<StateRoom> states = room.getStateRooms();
        for (StateRoom state : states) {
            if (state.getStatus() == EStateRoom.BOOKED) {
                if (start.isAfter(state.getEnd()) || end.isBefore(state.getStart())) {
                    continue;
                } else {
                    check = false;
                    break;
                }
            }
        }
        return check;
    }

    public List<Room> searchRoom(LocalDate start, LocalDate end, int personCount) {
        List<Room> rooms = roomRepository.findAll();
        for (Room room : rooms) {
            if (!checkState(room.getRoomId(), start, end)) {
                rooms.remove(room);
            }
            if (room.getCategory().getPerson() != personCount) {
                rooms.remove(room);
            }
        }
        return rooms;
    }

    public Set<ProviderDto> getSearchProviders(List<Room> rooms) {
        Set<ProviderDto> providers = new HashSet<>();
        for (Room room : rooms) {
            providers.add(Convert.convertProvider(room.getCategory().getProvider()));
        }
        return providers;
    }

    public Set<Room> getRooms(Long providerId, List<Room> rooms) {
        Set<Room> roomProviders = new HashSet<>();
        for (Room room : rooms) {
            if (room.getCategory().getProvider().getProviderId() == providerId) {
                roomProviders.add(room);
            }
        }
        return roomProviders;
    }

    public Set<CategoryDto> getSearchCategories(Long providerId, List<Room> rooms) {
        Set<CategoryDto> categories = new HashSet<>();
        Set<Room> roomProviders = new HashSet<>();
        for (Room room : rooms) {
            if (room.getCategory().getProvider().getProviderId() == providerId) {
                roomProviders.add(room);
            }
        }
        int count = roomProviders.size();
        for (Room room : roomProviders) {
            categories.add(Convert.convertCategory(room.getCategory()));
        }
        return categories;
    }

    public Set<Room> getSearchRooms(Long categoryId, List<Room> rooms) {
        Set<Room> roomCategories = new HashSet<>();
        for (Room room : rooms) {
            if (room.getCategory().getCategoryId() == categoryId) {
                roomCategories.add(room);
            }
        }
        return roomCategories;
    }

}
