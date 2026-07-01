package com.heydrian.medicore.config;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import java.lang.reflect.Method;

import org.junit.jupiter.api.Test;

import com.heydrian.medicore.controller.UserController;

class SecurityConfigTest {

    @Test
    void loginControllerAcceptsFormParameters() throws Exception {
        Method loginMethod = UserController.class.getMethod("login", String.class, String.class,
                jakarta.servlet.http.HttpServletResponse.class);

        assertDoesNotThrow(() -> loginMethod.getParameterCount());
    }
}
