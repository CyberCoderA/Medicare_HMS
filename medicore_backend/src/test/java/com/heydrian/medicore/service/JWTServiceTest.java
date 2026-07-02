package com.heydrian.medicore.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Instant;

import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import com.heydrian.medicore.model.Users;

class JWTServiceTest {

    @Test
    void shouldStoreUserModelInTokenAndStillExposeUsername() {
        JWTService jwtService = new JWTService();
        ReflectionTestUtils.setField(jwtService, "secretKey", "0123456789abcdef0123456789abcdef");

        Users user = new Users(
                "uid_1",
                "jdoe",
                "encoded-password",
                "Jane",
                "Doe",
                Instant.now(),
                "ADMIN"
        );

        String token = jwtService.generateToken(user);

        Users extractedUser = jwtService.extractUser(token);

        assertThat(extractedUser).isNotNull();
        assertThat(extractedUser.getUsername()).isEqualTo("jdoe");
        assertThat(extractedUser.getUserType()).isEqualTo("ADMIN");
        assertThat(jwtService.extractUsername(token)).isEqualTo("jdoe");
    }
}
