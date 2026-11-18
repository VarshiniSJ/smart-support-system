
package com.smart.support.controller;

import com.smart.support.dto.RegisterRequest;
import com.smart.support.dto.UserResponse;
import com.smart.support.service.UserService;
import org.springframework.web.bind.annotation.*;
import com.smart.support.dto.LoginRequest;
import com.smart.support.dto.LoginResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponse registerUser(
            @RequestBody RegisterRequest request) {

        return userService.registerUser(request);
    }

    @PostMapping("/login")
    public LoginResponse loginUser(
            @RequestBody LoginRequest request) {

        return userService.loginUser(request);
    }

}
