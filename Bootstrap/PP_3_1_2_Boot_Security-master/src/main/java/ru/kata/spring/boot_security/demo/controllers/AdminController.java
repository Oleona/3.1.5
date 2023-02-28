package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.entity.User;

import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
@Secured({"ROLE_ADMIN"})
@RequestMapping("/admin")

public class AdminController {
    private final UserService userService;

    public AdminController(UserService userService) {//, RoleService roleService
        this.userService = userService;
        //this.roleService = roleService;
    }

    @GetMapping
    public String listUsers(@AuthenticationPrincipal User currentUser, ModelMap model) {
        model.addAttribute("user", currentUser);
        model.addAttribute("listUsers", userService.listUsers());
        model.addAttribute("roles", userService.roles());
        return "adminrest";
    }

}
