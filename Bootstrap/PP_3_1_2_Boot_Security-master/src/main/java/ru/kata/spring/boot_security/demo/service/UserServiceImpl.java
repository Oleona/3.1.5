package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;


    @Autowired
    public UserServiceImpl(UserRepository userRepository, @Lazy BCryptPasswordEncoder passwordEncoder) {//, RoleRepository roleRepository
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    @Override
    public void add(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }


    @Override
    public List<User> listUsers() {
        return userRepository.findAll();

    }

    @Transactional
    @Override
    public void delete(Long userId) {
        userRepository.deleteById(userId);
    }

    @Transactional
    @Override
    public void update(User user) {
        String pass = user.getPassword();
        if (!pass.equals(userRepository.findById(user.getId()).get().getPassword())) {
            user.setPassword(passwordEncoder.encode(pass));
        } else {
            user.setPassword(user.getPassword());
        }
        userRepository.save(user);
    }


    @Override
    public User getUserById(Long userid) {
        Optional<User> user = userRepository.findById(userid);
        return user.orElse(new User());
    }

}
