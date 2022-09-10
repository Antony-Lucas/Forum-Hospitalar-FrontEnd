package com.example.demo.resources;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepositories;
import com.example.demo.services.UserServices;

@RestControllerAdvice
@RequestMapping(value = "/users")
public class UserResources {
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
	
}