package com.example.restapi;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @GetMapping
    public User getUser() {

        return User.builder()
                .uID(0)
                .username("blueJava")
                .password("thisIsAPassword!")
                .enabled(false)
                .build();
    }
}
