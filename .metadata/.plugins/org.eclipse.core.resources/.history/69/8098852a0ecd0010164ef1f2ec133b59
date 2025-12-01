
package com.example.quiz.controller;

import com.example.quiz.dto.LoginRequest;
import com.example.quiz.dto.LoginResponse;
import com.example.quiz.dto.RegisterRequest;
import com.example.quiz.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;
    public AuthController(UserService userService) { this.userService = userService; }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest req) {
        userService.register(req);
        return "Registered";
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) {
        return userService.login(req);
    }
}
