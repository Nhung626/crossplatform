package com.booking.repository;

import com.booking.entity.Room;
import com.booking.entity.StateRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
public interface StateRoomRepository extends JpaRepository<StateRoom, Long> {

    @Query("SELECT s FROM StateRoom s WHERE s.room.category.provider.providerId = ?1" +
            " AND s.reservar.stateReservar = 1")
    List<StateRoom> getAllCancel(Long providerId);

    @Query("SELECT s FROM StateRoom s WHERE s.room.category.provider.providerId = ?1" +
            " AND s.reservar.stateReservar = 0 OR s.reservar.stateReservar = 2")
    List<StateRoom> getAllBooked(Long providerId);

    @Query("SELECT s FROM StateRoom s WHERE s.room.category.provider.providerId = ?1" +
            " AND s.reservar.stateReservar = 2")
    List<StateRoom> getAllCheckin(Long providerId);

    @Query("SELECT s FROM StateRoom s WHERE s.room.category.provider.providerId = ?1" +
            " AND s.reservar.stateReservar = 3")
    List<StateRoom> getAllCheckout(Long providerId);




    @Query("SELECT s FROM StateRoom s WHERE s.room.category.provider.providerId = ?1" +
            " AND s.reservar.stateReservar = 1")
    List<StateRoom> getCancel(Long providerId);

    @Query("SELECT s FROM StateRoom s WHERE s.room.category.provider.providerId = ?1" +
            " AND s.reservar.stateReservar = 0")
    List<StateRoom> getBooked(Long providerId);

    @Query("SELECT s FROM StateRoom s WHERE s.room.category.provider.providerId = ?1" +
            " AND s.reservar.stateReservar = 2")
    List<StateRoom> getCheckin(Long providerId);

    @Query("SELECT s FROM StateRoom s WHERE s.room.category.provider.providerId = ?1" +
            " AND s.reservar.stateReservar = 3")
    List<StateRoom> getCheckout(Long providerId);
}
