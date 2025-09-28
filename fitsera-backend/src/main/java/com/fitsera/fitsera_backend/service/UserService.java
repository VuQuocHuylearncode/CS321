package com.fitsera.fitsera_backend.service;

import com.fitsera.fitsera_backend.dto.UserInfo;
import com.fitsera.fitsera_backend.model.User;
import com.fitsera.fitsera_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserInfo getUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserInfo info = new UserInfo();
        info.setId(user.getId());
        info.setEmail(user.getEmail());
        info.setFullName(user.getFullName());
        info.setRoles(user.getRoles());
        return info;
    }

    public User updateUser(Long userId, User update) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(update.getFullName());
        user.setPhone(update.getPhone());
        user.setAvatarUrl(update.getAvatarUrl());
        user.setBio(update.getBio());

        return userRepository.save(user);
    }
}