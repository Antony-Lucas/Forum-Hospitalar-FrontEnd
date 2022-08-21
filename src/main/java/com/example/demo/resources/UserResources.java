package com.example.demo.resources;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.demo.entities.User;

@RestControllerAdvice
@RequestMapping(value = "/users")
public class UserResources {
	
	@GetMapping
	public ResponseEntity<User> findAll(){
		User user = new User(1L, "Antony Lucas", "antonylucas7540@gmail.com", "gusFievel224");
		return ResponseEntity.ok().body(user);
	}
}
