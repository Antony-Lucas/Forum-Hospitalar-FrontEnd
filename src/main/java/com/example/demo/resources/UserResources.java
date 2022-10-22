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
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.ModelMap;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.demo.config.GUIDconfig;
import com.example.demo.entities.User;
import com.example.demo.services.UserServices;
import com.fasterxml.jackson.core.exc.StreamWriteException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestControllerAdvice
@RequestMapping(value = "/users")
public class UserResources {
	public static final String HEADER_ATRIBUTE = "Authorization";
	public static final String ATRIBUTE_PREFIX = "Bearer ";
	public static final int TOKEN_EXPIRATION = 1200_000;
	public static final int REFRESH_TOKEN_EXPIRATION = 2800_000;
	
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
	
	@PostMapping
	public ResponseEntity<User> insert(@Validated @RequestBody User obj) throws Exception {
		User usernameEntry = services.findByName(obj.getName());
		User emailEntry = services.findByEmail(obj.getEmail());
		if(usernameEntry != null){
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nome de usuário indisponível");
		}
		if(emailEntry != null){
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Endereço de email indisponível");
		}
		else {
			obj = services.insert(obj);
			URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
			return ResponseEntity.created(uri).body(obj);
		}
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
				Algorithm algorithm = Algorithm.HMAC512(GUIDconfig.TOKEN_PASSWORD);
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