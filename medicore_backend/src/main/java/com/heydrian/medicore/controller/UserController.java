package com.heydrian.medicore.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.heydrian.medicore.model.ResponseModel;
import com.heydrian.medicore.model.Users;
import com.heydrian.medicore.repository.UserRepository;
import com.heydrian.medicore.service.JWTService;
import com.heydrian.medicore.service.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;
    private final JWTService jwtService;
    private final UserRepository repository;

    public UserController(UserRepository repository, UserService service, JWTService jwtService) {
        this.repository = repository;
        this.service = service;
        this.jwtService = jwtService;
    }

    // Controller Status
    @GetMapping("/status")
    public String getStatus(HttpServletRequest request) {
        return "API is running! Current Session ID: " + request.getSession().getId();
    }

    // User logout
    @PostMapping(value = "/logout", produces = "application/json")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .build();

        response.addHeader("Set-Cookie", cookie.toString());
        return new ResponseEntity<>(Map.of("message", "Logout Successful!"), HttpStatus.OK);
    }

    // User login
    @PostMapping(value = "/login", produces = "application/json")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password, HttpServletResponse response) {
        if (username == null || username.isBlank() || password == null || password.isBlank()) {
            return new ResponseEntity<>(Map.of("message", "Username and password are required"), HttpStatus.BAD_REQUEST);
        }

        String token = service.verify(username, password);
        if (token == null) {
            return new ResponseEntity<>(Map.of("message", "Invalid username or password"), HttpStatus.UNAUTHORIZED);
        }

        Users currentUser = repository.findUserByUsername(username);
        String userType = currentUser != null && currentUser.getUserType() != null ? currentUser.getUserType() : "";

        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .path("/")
                .maxAge(1L * 60 * 60)
                .build();

        response.addHeader("Set-Cookie", cookie.toString());
        System.out.println(token);
        return new ResponseEntity<>(Map.of("message", "Login Successful!", "userType", userType), HttpStatus.OK);
    }
    
    // Create new user
    @RequestMapping(value="/addUser", produces = "application/json", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<ResponseModel> addUser(@RequestParam String username, @RequestParam String fname, @RequestParam String lname, @RequestParam String password, @RequestParam String userType) {
        try {

            if(!repository.existsByUsername(username)) {
                String id = String.format("uid_%s_%s", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-HH:mm")), username);
                Instant timestamp = Instant.now();

                service.addUser(new Users(id, username, password, fname, lname, timestamp, userType));
                return new ResponseEntity<>(new ResponseModel("User successfully added!", LocalDateTime.now(), null), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ResponseModel("Username already taken!", LocalDateTime.now(), null), HttpStatus.CONFLICT);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ResponseModel("Something went wrong!", LocalDateTime.now(), null), HttpStatus.CONFLICT);
        }
    }

    // Update user data
    @SuppressWarnings("null")
    @RequestMapping(value="/updateUser", produces = "application/json", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<ResponseModel> updateUser(@RequestParam String id, @RequestParam String username, @RequestParam String fname, @RequestParam String lname, @RequestParam String userType) {
        try {
            Users foundUser = repository.findUserByUsername(username);
        
            if (foundUser != null && !foundUser.getUserId().equals(id)) {
                return new ResponseEntity<>(new ResponseModel("Username Already taken!", LocalDateTime.now(), null), HttpStatus.CONFLICT);
            } else {
                foundUser.setUsername(username);
                foundUser.setUserFname(fname);
                foundUser.setUserLname(lname);
                foundUser.setUserType(userType);

                repository.save(foundUser);
                
                return new ResponseEntity<>(new ResponseModel("Update Successfull!", LocalDateTime.now(), null), HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseModel("Update failed!", LocalDateTime.now(), null), HttpStatus.CONFLICT);
        }
    }

    // Delete user
    @RequestMapping(value="/deleteUser", produces = "application/json", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<ResponseModel> deleteUser(@RequestParam String id) {
        try {
            repository.deleteById(id);
            return new ResponseEntity<>(new ResponseModel("Delete Successfull!", LocalDateTime.now(), null), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseModel("Delete failed!", LocalDateTime.now(), null), HttpStatus.CONFLICT);
        }
    }

    // Handle Change User Password
    @RequestMapping(value="/changeUserPassword", produces = "application/json", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<ResponseModel> changeUserPassword(@RequestParam String userID,
        @RequestParam String adminID, @RequestParam String adminPassword, @RequestParam String newPassword) {
        try {
            Users adminUser = repository.findById(adminID).orElse(null);

            if(adminUser == null || !service.verify(adminUser.getUsername(), adminPassword).equals(jwtService.generateToken(adminUser))) {
                return new ResponseEntity<>(new ResponseModel("Admin authentication failed!", LocalDateTime.now(), null), HttpStatus.UNAUTHORIZED);
            }

            service.changeUserPassword(userID, newPassword);
            return new ResponseEntity<>(new ResponseModel("Password changed successfully!", LocalDateTime.now(), null), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseModel("Change password failed!", LocalDateTime.now(), null), HttpStatus.CONFLICT);
        }
    }

    @GetMapping("/findUserByID")
    public Optional<Users> getMethodName(@RequestParam String userID) {
        return repository.findById(userID);
    }

    // Find User by Username
    @GetMapping("/findUserByUsername")
    public Users findUserByUsername(HttpServletRequest request) {
        // Retrieving cookie
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    // After checking if jwt cookie exists, retrieve token and 
                    // extract username from it, then find user by username
                    String token = cookie.getValue();
                    String username = jwtService.extractUsername(token);
                    return repository.findUserByUsername(username);
                }
            }
        }
        
        return null;
    }

    @GetMapping("/allUsers")
    public Iterable<Users> getAllUsers() {
        return repository.findAll();
    }
   
}