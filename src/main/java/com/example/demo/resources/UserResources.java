package com.example.demo.resources;

import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.demo.entities.User;
import com.example.demo.security.JWTauth;
import com.example.demo.services.UserServices;
import com.fasterxml.jackson.core.exc.StreamWriteException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestControllerAdvice
@RequestMapping(value = "/users")
public class UserResources {
	public static final String HEADER_ATRIBUTE = "Authorization";
	public static final String ATRIBUTE_PREFIX = "Bearer ";
	public static final int TOKEN_EXPIRATION = 900_000;
	public static final int REFRESH_TOKEN_EXPIRATION = 1800_000;
	public static final String TOKEN_PASSWORD = "6be446fa-0a90-4175-aed6-de4180b9893b";
	
	
	@Autowired
	private UserServices services;
	@Autowired
	private final PasswordEncoder encoder;
	
	public UserResources(UserServices services, PasswordEncoder encoder) {
		this.services = services;
		this.encoder = encoder;
	}
	
	@GetMapping
	public ResponseEntity<List<User>> findAll(){
		List<User> list = services.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<User> findById(@PathVariable Long id){
		User obj = services.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@GetMapping(value = "/validation")
	public ResponseEntity<Boolean> validPass(@RequestParam String name, @RequestParam String password) {
		Optional<User> optuser = services.findByName(name);
		if(optuser.isEmpty()){
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
		}		
		
		User user = optuser.get();
		boolean valid = encoder.matches(password, user.getPassword());
		HttpStatus status = (valid) ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
	
		return ResponseEntity.status(status).body(valid);
	}
	
	@PostMapping
	public ResponseEntity<User> insert(@RequestBody User obj){
		obj = services.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id){
		services.delete(id);
		return ResponseEntity.noContent().build();	
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User obj){
		obj = services.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
	
	@GetMapping("/token/refresh")
	public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws StreamWriteException, DatabindException, IOException{
		String atribute = request.getHeader(HEADER_ATRIBUTE);
		if(atribute != null && atribute.startsWith(ATRIBUTE_PREFIX)) {
			try {
				String refresh_token = atribute.replace(ATRIBUTE_PREFIX, "");
				Algorithm algorithm = Algorithm.HMAC512(JWTauth.TOKEN_PASSWORD);
				JWTVerifier jwtVerifier = JWT.require(algorithm).build();
				DecodedJWT decodedJWT = jwtVerifier.verify(refresh_token);
				String userName = decodedJWT.getSubject();
				String access_token = JWT.create().
						withSubject(userName)
						.withExpiresAt(new Date(System.currentTimeMillis() + TOKEN_EXPIRATION))
						.withIssuer(request.getRequestURL().toString())
						.sign(algorithm);
					
				Map<String, String> tokens = new HashMap<>();
				tokens.put("access_token", access_token);
				tokens.put("refresh_token", refresh_token);
				response.setContentType(MediaType.APPLICATION_JSON_VALUE);
				new ObjectMapper().writeValue(response.getOutputStream(), tokens);
			}catch (Exception e) {
				response.setHeader("error", e.getMessage());
				Map<String, String> error = new HashMap<>();
				error.put("Error_message", e.getMessage());
				response.setContentType(MediaType.APPLICATION_JSON_VALUE);
				new ObjectMapper().writeValue(response.getOutputStream(), error);
			}
		}else {
			throw new RuntimeException("RefreshToken missing");
		}
	}
}