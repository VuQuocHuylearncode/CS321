package com.fitsera.fitsera_backend.service;

import java.util.Set;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.fitsera.fitsera_backend.dto.AuthResponse;
import com.fitsera.fitsera_backend.dto.ChangePasswordRequest;
import com.fitsera.fitsera_backend.dto.LoginRequest;
import com.fitsera.fitsera_backend.dto.RegisterRequest;
import com.fitsera.fitsera_backend.dto.UserInfo;
import com.fitsera.fitsera_backend.model.User;
import com.fitsera.fitsera_backend.repository.UserRepository;
import com.fitsera.fitsera_backend.security.JwtUtils;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
    }

    public UserInfo register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        User user = User.builder()
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .fullName(req.getFullName())
                .phone(req.getPhone())
                .roles(Set.of("ROLE_USER"))
                .build();
        user = userRepository.save(user);

        UserInfo info = new UserInfo();
        info.setId(user.getId());
        info.setEmail(user.getEmail());
        info.setFullName(user.getFullName());
        info.setRoles(user.getRoles());
        return info;
    }

    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtils.generateToken(user.getId(), user.getEmail(), user.getRoles());

        AuthResponse res = new AuthResponse();
        res.setAccessToken(token);
        res.setExpiresIn(86400);
        UserInfo info = new UserInfo();
        info.setId(user.getId());
        info.setEmail(user.getEmail());
        info.setFullName(user.getFullName());
        info.setRoles(user.getRoles());
        res.setUser(info);
        return res;
    }

    public UserInfo getMe(Long userId) {
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

    UserInfo info = new UserInfo();
    info.setId(user.getId());
    info.setEmail(user.getEmail());
    info.setFullName(user.getFullName());
    info.setRoles(user.getRoles());
    return info;
    }

    public JwtUtils getJwtUtils() {
    return jwtUtils;
    }

    public boolean changePassword(ChangePasswordRequest req) {
        return userRepository.findByEmail(req.getEmail())
                .map(user -> {
                    user.setPassword(passwordEncoder.encode(req.getNewPassword()));
                    userRepository.save(user);
                    return true;
                })
                .orElse(false);
    }
}