package com.example.demo.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.demo.entities.User;
import com.example.demo.repositories.data.DetailUserData;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JWTauth extends UsernamePasswordAuthenticationFilter{
	public static final int TOKEN_EXPIRATION = 900_000;
	public static final int REFRESH_TOKEN_EXPIRATION = 1800_000;
	public static final String TOKEN_PASSWORD = "6be446fa-0a90-4175-aed6-de4180b9893b";
	
	private final AuthenticationManager authenticationManager;
	
	public JWTauth(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
		throws AuthenticationException {
		try {
			User user = new ObjectMapper().readValue(request.getInputStream(), User.class);
			return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					user.getName(),
					user.getPassword(),
					new ArrayList<>()
			));
		}catch (IOException e) {
			throw new RuntimeException("Falha ao autenticar usuario", e);
		}
	}
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
		Authentication authResult) throws IOException, ServletException {
		DetailUserData userdata = (DetailUserData)authResult.getPrincipal();
		String token = JWT.create().
			withSubject(userdata.getUsername())
			.withExpiresAt(new Date(System.currentTimeMillis() + TOKEN_EXPIRATION))
			.sign(Algorithm.HMAC512(TOKEN_PASSWORD));
		String refresh_token = JWT.create().
			withSubject(userdata.getUsername())
			.withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION))
			.sign(Algorithm.HMAC512(TOKEN_PASSWORD));
		
		Map<String, String> tokens = new HashMap<>();
		tokens.put("access_token", token);
		tokens.put("refresh_token", refresh_token);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		new ObjectMapper().writeValue(response.getOutputStream(), tokens);
	}
}
