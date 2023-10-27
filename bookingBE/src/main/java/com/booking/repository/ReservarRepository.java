package com.booking.repository;

import com.booking.entity.Reservar;
import com.booking.entity.Reservar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservarRepository extends JpaRepository<Reservar, Long> {
    Reservar findByReservarId(Long reservarId);

    @Query("SELECT r FROM Reservar r inner join StateRoom s on r.reservarId = s.reservar.reservarId inner join Room room" +
            " on s.room.roomId = room.roomId" +
            " where room.category.provider.providerId = ?1" +
            " AND r.stateReservar = 1")
    List<Reservar> getAllCancel(Long providerId);

    @Query("SELECT r FROM Reservar r inner join StateRoom s on r.reservarId = s.reservar.reservarId inner join Room room" +
            " on s.room.roomId = room.roomId" +
            " where room.category.provider.providerId = ?1" +
            " and r.stateReservar = 0")
    List<Reservar> getAllBooked(Long providerId);

    @Query("SELECT r FROM Reservar r inner join StateRoom s on r.reservarId = s.reservar.reservarId inner join Room room" +
            " on s.room.roomId = room.roomId" +
            " where room.category.provider.providerId = ?1" +
            " AND r.stateReservar = 2")
    List<Reservar> getAllCheckin(Long providerId);

    @Query("SELECT r FROM Reservar r inner join StateRoom s on r.reservarId = s.reservar.reservarId inner join Room room" +
            " on s.room.roomId = room.roomId" +
            " where room.category.provider.providerId = ?1" +
            " AND r.stateReservar = 3")
    List<Reservar> getAllCheckout(Long providerId);




    @Query("SELECT r FROM Reservar r WHERE r.customer.customerId = ?1" +
            " AND r.stateReservar = 1")
    List<Reservar> getCancel(Long customerId);

    @Query("SELECT r FROM Reservar r WHERE r.customer.customerId = ?1" +
            " AND (r.stateReservar = 0 OR r.stateReservar = 2)")
    List<Reservar> getBooked(Long customerId);

    @Query("SELECT r FROM Reservar r WHERE r.customer.customerId = ?1" +
            " AND r.stateReservar = 2")
    List<Reservar> getCheckin(Long customerId);

    @Query("SELECT r FROM Reservar r WHERE r.customer.customerId = ?1" +
            " AND (r.stateReservar = 3 OR r.stateReservar = 4)")
    List<Reservar> getCheckout(Long customerId);
}
