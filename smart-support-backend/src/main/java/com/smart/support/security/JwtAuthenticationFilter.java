
package com.smart.support.security;

import com.smart.support.entity.User;
import com.smart.support.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.JwtException;

import java.io.IOException;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            UserRepository userRepository) {

        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        // STEP 1: Read Authorization header
        String authHeader = request.getHeader("Authorization");

        System.out.println("STEP 1 - HEADER PRESENT: "
                + (authHeader != null));

        System.out.println("STEP 1 - BEARER PREFIX: "
                + (authHeader != null
                && authHeader.startsWith("Bearer ")));

        // If token is missing, continue without authentication
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Remove "Bearer " from the header
        String token = authHeader.substring(7);

        try {

            // STEP 2: Extract email from JWT
            String email = jwtService.extractEmail(token);

            System.out.println("STEP 2 - EMAIL: " + email);

            // STEP 3: Find user in database
            User user = userRepository.findByEmail(email)
                    .orElse(null);

            System.out.println("STEP 3 - USER FOUND: "
                    + (user != null));

            // Check user, token validity and existing authentication
            if (user != null
                    && jwtService.isTokenValid(token, email)
                    && SecurityContextHolder.getContext()
                    .getAuthentication() == null) {

                // Get user's role
                List<SimpleGrantedAuthority> authorities = List.of(
                        new SimpleGrantedAuthority(
                                "ROLE_" + user.getRole().name()
                        )
                );

                // Create authenticated user
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                user.getEmail(),
                                null,
                                authorities
                        );

                // Store authentication in Spring Security
                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);

                System.out.println("STEP 4 - AUTHENTICATION SUCCESS");
            }

        } catch (JwtException | IllegalArgumentException exception) {

            // Print the actual JWT error
            System.out.println("JWT VALIDATION ERROR: "
                    + exception.getMessage());

            exception.printStackTrace();

            // Clear invalid authentication
            SecurityContextHolder.clearContext();
        }

        // Continue the request
        filterChain.doFilter(request, response);
    }
}
