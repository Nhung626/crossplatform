package com.booking.service.implement;

import com.booking.dto.Convert;
import com.booking.dto.request.CreateReservarDto;
import com.booking.dto.response.CategoryDto;
import com.booking.dto.response.ProviderDto;
import com.booking.dto.response.ReservarDto;
import com.booking.entity.*;
import com.booking.exception.CustomException;
import com.booking.repository.*;
import com.booking.service.interfaces.ReservarService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class ReservarServiceImp implements ReservarService {
    private final ReservarRepository reservarRepository;
    private final CustomerRepository customerRepository;
    private final RoomRepository roomRepository;
    private final CategoryRepository categoryRepository;
    private final FavoriteRepository favoriteRepository;


    @Transactional
    public ReservarDto createOrder(CreateReservarDto createOrderDto, Long customerId) {
        Customer customer = customerRepository.findByCustomerId(customerId);
        Reservar reservar = Reservar.builder()
                .reservarDate(LocalDateTime.now())
                .customer(customer)
                .stateReservar(EStateReservar.BOOKED)
                .paymentState("Unsuccessful")
                .stateRooms(new HashSet<>()).build();
        reservarRepository.save(reservar);
        List<Room> rooms = getRoomReservar(createOrderDto.getCategory(), createOrderDto.getRoomCount());
        for (Room room : rooms) {
            if (checkState(room, createOrderDto.getStartDate(), createOrderDto.getEndDate())) {
                StateRoom stateRoom = StateRoom.builder()
                        .start(createOrderDto.getStartDate())
                        .end(createOrderDto.getEndDate())
                        .status(EStateRoom.BOOKED)
                        .reservar(reservar)
                        .room(room).build();
                room.getStateRooms().add(stateRoom);
                reservar.getStateRooms().add(stateRoom);
                roomRepository.save(room);
                reservarRepository.save(reservar);
            } else {
                throw new CustomException("Phòng không đủ điều kiện đặt.");
            }
        }
        reservar.callTotal();
        reservarRepository.save(reservar);
        return Convert.convertReservarDto(reservar);
    }

    public List<Room> getRoomReservar(CategoryDto categoryDto, int n) {
        List<Room> roomReservars = new ArrayList<>();
        List<Integer> roomNumbers = categoryDto.getRoomNumbers();
        Random random = new Random();
        for (int i = 0; i < n; i++) {
            int randomIndex = random.nextInt(roomNumbers.size()); // Sinh một số ngẫu nhiên từ 0 đến (số phần tử trong mảng - 1)
            Room room = roomRepository.findByNumber(categoryDto.getCategoryId(), roomNumbers.get(randomIndex));
            roomNumbers.remove(randomIndex);
            roomReservars.add(room);
        }
        return roomReservars;
    }

    public boolean checkState(Room room, LocalDate start, LocalDate end) {
        boolean check = true;
        Set<StateRoom> states = room.getStateRooms();
        if (states != null) {
            for (StateRoom state : states) {
                if (state.getStatus() == EStateRoom.BOOKED) {
                    if (!(start.isAfter(state.getEnd()) || end.isBefore(state.getStart()))) {
                        check = false;
                        break;
                    }
                }
            }
        }
        return check;
    }

    public List<Room> searchRoom(LocalDate start, LocalDate end, int personCount) {
        List<Room> rooms = roomRepository.findAll();
        List<Room> result = new ArrayList<>();
        for (Room room : rooms) {
            if (checkState(room, start, end) && room.getCategory().getPerson() == personCount) {
                result.add(room);
            }
        }
        return result;
    }

    public Set<ProviderDto> getSearchProviders(List<Room> rooms) {
        Set<ProviderDto> providers = new HashSet<>();
        for (Room room : rooms) {
            providers.add(Convert.convertProvider(room.getCategory().getProvider()));
        }
        return providers;
    }

    public Set<CategoryDto> getSearchCategories(Long providerId, List<Room> rooms) {
        Set<CategoryDto> categories = new HashSet<>();
        Set<Room> roomProviders = new HashSet<>();
        Set<Long> categoryIds = new HashSet<>();
        for (Room room : rooms) {
            if (providerId.equals(room.getCategory().getProvider().getProviderId())) {
                roomProviders.add(room);
            }
        }
        for (Room room : roomProviders) {
            categoryIds.add(room.getCategory().getCategoryId());
        }

        for (Long categoryId : categoryIds) {
            categories.add(convertCategory2(categoryId, getSearchRooms(categoryId, roomProviders)));
        }
        return categories;
    }

    public Set<Room> getSearchRooms(Long categoryId, Set<Room> rooms) {
        Set<Room> roomCategories = new HashSet<>();
        for (Room room : rooms) {
            if (categoryId.equals(room.getCategory().getCategoryId())) {
                roomCategories.add(room);
            }
        }
        return roomCategories;
    }

    public CategoryDto convertCategory2(Long categoryId, Set<Room> rooms) {
        Category category = categoryRepository.findByCategoryId(categoryId);
        List<Long> imgIds = category.getImgRooms().stream().map(Image::getImgId).toList();
        List<Integer> roomNumbers = rooms.stream().map(Room::getRoomNumber).toList();
        return CategoryDto.builder()
                .imgIdCategories(imgIds)
                .categoryName(category.getCategoryName())
                .price(category.getPrice())
                .description(category.getDescription())
                .person(category.getPerson())
                .area(category.getArea())
                .bedType(category.getBedType())
                .roomNumbers(roomNumbers)
                .countRoom(rooms.size())
                .categoryId(category.getCategoryId()).build();
    }

    public void changeStateCheckin(Long providerId, Long reservarId) {
        Reservar reservar = reservarRepository.findByReservarId(reservarId);
        if (EStateReservar.BOOKED.equals(reservar.getStateReservar())
                && Objects.equals(reservar.getProvider().getProviderId(), providerId)) {
            reservar.setCheckin(LocalDateTime.now());
            reservar.setStateReservar(EStateReservar.CHECK_IN);
            reservarRepository.save(reservar);
        } else {
            throw new CustomException("Không thể check-in");
        }
    }

    public void changeStateCheckout(Long providerId, Long reservarId) {
        Reservar reservar = reservarRepository.findByReservarId(reservarId);
        if (EStateReservar.CHECK_IN.equals(reservar.getStateReservar())
                && providerId.equals(reservar.getProvider().getProviderId())) {
            reservar.setCheckout(LocalDateTime.now());
            reservar.setStateReservar(EStateReservar.CHECK_OUT);
            reservarRepository.save(reservar);
        } else {
            throw new CustomException("Không thể check-out");
        }
    }

    public boolean changeStateCancel(Long reservarId, Long customerId) {
        boolean check = false;
        Reservar reservar = reservarRepository.findByReservarId(reservarId);
        if (customerId.equals(reservar.getCustomer().getCustomerId())) {
            List<StateRoom> stateRooms = reservar.getStateRooms().stream().toList();
            if (LocalDate.now().isBefore(reservar.getStart())) {
                reservar.setStateReservar(EStateReservar.CANCELED);
                for (StateRoom stateRoom : stateRooms) {
                    stateRoom.setStatus(EStateRoom.AVAILABLE);
                }
                reservarRepository.save(reservar);
                check = true;
            }
        } else {
            throw new CustomException("Not authentication");
        }
        return check;
    }

    public boolean changeCancel(Long reservarId, Long providerId) {
        boolean check = false;
        Reservar reservar = reservarRepository.findByReservarId(reservarId);
        if (providerId.equals(reservar.getProvider().getProviderId())) {
            List<StateRoom> stateRooms = reservar.getStateRooms().stream().toList();
            if (LocalDateTime.now().isAfter(reservar.getStart().atTime(14, 0))) {
                reservar.setStateReservar(EStateReservar.CANCELED);
                for (StateRoom stateRoom : stateRooms) {
                    stateRoom.setStatus(EStateRoom.AVAILABLE);
                }
                reservarRepository.save(reservar);
                check = true;
            }
            if (LocalDateTime.now().isAfter(reservar.getReservarDate().plusMinutes(15)) && !"Success".equals(reservar.getPaymentState())) {
                reservar.setStateReservar(EStateReservar.CANCELED);
                for (StateRoom stateRoom : stateRooms) {
                    stateRoom.setStatus(EStateRoom.AVAILABLE);
                }
                reservarRepository.save(reservar);
                check = true;
            }
        } else {
            throw new CustomException("Not authentication");
        }
        return check;
    }


    public List<ReservarDto> getCheckout(Long customerId) {
        List<ReservarDto> reservarDtos = new ArrayList<>();
        List<Reservar> reservars = reservarRepository.getCheckout(customerId);
        for (Reservar reservar : reservars) {
            reservarDtos.add(Convert.convertReservarDto(reservar));
        }
        return reservarDtos;
    }

    public List<ReservarDto> getBooking(Long customerId) {
        List<ReservarDto> reservarDtos = new ArrayList<>();
        List<Reservar> reservars = reservarRepository.getBooked(customerId);
        for (Reservar reservar : reservars) {
            reservarDtos.add(Convert.convertReservarDto(reservar));
        }
        return reservarDtos;
    }

    public List<ReservarDto> getCancel(Long customerId) {
        List<ReservarDto> reservarDtos = new ArrayList<>();
        List<Reservar> reservars = reservarRepository.getCancel(customerId);
        for (Reservar reservar : reservars) {
            reservarDtos.add(Convert.convertReservarDto(reservar));
        }
        return reservarDtos;
    }

    public List<Room> orderFavoriteRoom(Long customerId, LocalDate start, LocalDate end, int personCount) {
        Favorite favorite = favoriteRepository.findByCustomerId(customerId);
        Set<Provider> providers = favorite.getProviders();
        Set<Room> rooms = new HashSet<>();
        for (Provider provider : providers) {
            rooms.addAll(roomRepository.findByProviderId(provider.getProviderId()));
        }

        List<Room> result = new ArrayList<>();
        for (Room room : rooms) {
            if (checkState(room, start, end) && room.getCategory().getPerson() == personCount) {
                result.add(room);
            }
        }
        return result;
    }


}

