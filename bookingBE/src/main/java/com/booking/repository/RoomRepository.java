package com.booking.repository;

import com.booking.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Room findByRoomNumber(int roomNumber);

    Room findByRoomId(Long roomId);

    @Query("SELECT r FROM Room r WHERE r.category.categoryId = ?1" +
            " AND r.roomNumber = ?2")
    Room findByNumber(Long categoryId, int roomNumber);
    @Override
    List<Room> findAll();
    @Query("SELECT r FROM Room r WHERE r.category.provider.providerId = ?1")
    List<Room> findByProviderId(Long providerId);
}
