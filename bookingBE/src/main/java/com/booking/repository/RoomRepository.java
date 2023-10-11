package com.booking.repository;

import com.booking.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface RoomRepository extends JpaRepository<Room,Long> {
    Room findByRoomNumber(int roomNumber);
//    List<Room> findByCategoryId(Long categoryId);
    @Override
    List<Room> findAll();
}
