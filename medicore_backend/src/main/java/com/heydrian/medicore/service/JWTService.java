package com.heydrian.medicore.service;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.heydrian.medicore.model.JwtUserPayload;
import com.heydrian.medicore.model.Users;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {

    @Value("${jwt.secret:medicore-super-secret-key-that-is-at-least-32-bytes-long}")
    private String secretKey;

    public String generateToken(Users user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("user", new JwtUserPayload(user));
        return Jwts
            .builder()
            .claims()
            .add(claims)
            .subject(user.getUsername())
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date(System.currentTimeMillis() + 60 * 60 * 30))
            .and()
            .signWith(getKey())
            .compact();
    }

    private SecretKey getKey() {
        String normalizedKey = secretKey;
        if (normalizedKey.length() < 32) {
            normalizedKey = String.format("%-32s", normalizedKey).replace(' ', '0');
        }
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(Base64.getEncoder().encodeToString(normalizedKey.getBytes())));
    }

    public String extractUsername(String token) {
        Claims claims = extractAllClaims(token);
        Object userClaim = claims.get("user");
        if (userClaim instanceof JwtUserPayload payload) {
            return payload.getUsername();
        }

        Object usernameClaim = claims.get("username");
        if (usernameClaim instanceof String username && !username.isBlank()) {
            return username;
        }

        return claims.getSubject();
    }

    public Users extractUser(String token) {
        Claims claims = extractAllClaims(token);
        Object userClaim = claims.get("user");
        if (userClaim instanceof JwtUserPayload payload) {
            return payload.toUser();
        }
        return null;
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
            .verifyWith(getKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractEpiration(token).before(new Date());
    }

    private Date extractEpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
