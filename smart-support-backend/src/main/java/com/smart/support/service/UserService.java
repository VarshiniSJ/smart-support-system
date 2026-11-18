
package com.smart.support.service;

import com.smart.support.dto.RegisterRequest;
import com.smart.support.dto.UserResponse;
import com.smart.support.dto.LoginRequest;
import com.smart.support.dto.LoginResponse;
import com.smart.support.entity.User;
import com.smart.support.enums.Role;
import com.smart.support.repository.UserRepository;
import com.smart.support.security.JwtService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository,
                       JwtService jwtService) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    // CUSTOMER REGISTRATION
    public UserResponse registerUser(RegisterRequest request) {

        // Check duplicate email
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Create new user
        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // Encrypt password
        String encodedPassword =
                passwordEncoder.encode(request.getPassword());

        user.setPassword(encodedPassword);

        // Set default role
        user.setRole(Role.CUSTOMER);

        // Save user in database
        User savedUser = userRepository.save(user);

        // Return response without password
        return new UserResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole()
        );
    }

    // CUSTOMER LOGIN
    public LoginResponse loginUser(LoginRequest request) {

        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        // Verify password
        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        // Reject incorrect password
        if (!passwordMatches) {
            throw new RuntimeException("Invalid email or password");
        }

        // Generate JWT token
        String token = jwtService.generateToken(user.getEmail());

        // Return user details and token
        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                token
        );
    }
}
