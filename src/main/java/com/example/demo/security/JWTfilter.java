package com.example.demo.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.demo.config.GUIDconfig;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JWTfilter extends OncePerRequestFilter{
	public static final String HEADER_ATRIBUTE = "Authorization";
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		if(request.getServletPath().equals("/login") || request.getServletPath().equals("/token/refresh")) {
			filterChain.doFilter(request, response);
		}else {
			String atribute = request.getHeader(HEADER_ATRIBUTE);
			if(atribute != null && atribute.startsWith(JWTvalidate.ATRIBUTE_PREFIX)) {
				try {
					String token = atribute.substring(JWTvalidate.ATRIBUTE_PREFIX.length());
					Algorithm algorithm = Algorithm.HMAC512(GUIDconfig.TOKEN_PASSWORD);
					JWTVerifier jwtVerifier = JWT.require(algorithm).build();
					DecodedJWT decodedJWT = jwtVerifier.verify(token);
					String userName = decodedJWT.getSubject();
					UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userName, null, new ArrayList<>());
					SecurityContextHolder.getContext().setAuthentication(authenticationToken);
					filterChain.doFilter(request, response);
				}catch (Exception e) {
					response.setHeader("error", e.getMessage());
					Map<String, String> error = new HashMap<>();
					error.put("error_message", e.getMessage());
					response.setContentType(MediaType.APPLICATION_JSON_VALUE);
					new ObjectMapper().writeValue(response.getOutputStream(), error);
				}
			}else {
				filterChain.doFilter(request, response);
			}
		}
	}
}
