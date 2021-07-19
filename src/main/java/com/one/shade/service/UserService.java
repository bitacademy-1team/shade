package com.one.shade.service;

import com.one.shade.domain.User;
import com.one.shade.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Transactional
    public Boolean existsByNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }


    @Transactional(readOnly = true)
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Transactional
    public Optional<User> updateUser(String username, User user) {
        Optional<User> updateUser = userRepository.findByUsername(username);

        updateUser.ifPresent(selectUser -> {
            selectUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            selectUser.setNickname(user.getNickname());
            selectUser.setBirthday(user.getBirthday());
            selectUser.setGender(user.getGender());

            userRepository.save(selectUser);
        });
        return updateUser;
    }


}
