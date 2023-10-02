package com.booking.controller;

import com.booking.service.interfaces.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
}
