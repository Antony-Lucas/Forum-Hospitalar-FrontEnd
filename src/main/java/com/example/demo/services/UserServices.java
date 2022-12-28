package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepositories;
import com.example.demo.services.exception.DataBaseException;
import com.example.demo.services.exception.ResourceNotFoundException;

@Service
public class UserServices {
	@Autowired
	private UserRepositories userRepository;
	
	@Autowired
	private final PasswordEncoder encoder;
	
	public UserServices(UserRepositories userRepository, PasswordEncoder encoder) {
		this.userRepository = userRepository;
		this.encoder = encoder;
	}

	public List<User> findAll() {
		return userRepository.findAll();
	}
	
	public User findByName(String name){
		return userRepository.findByName(name);
	}
	
	public User findByEmail(String email){
		return userRepository.findByEmail(email);
	}
	
	public User findById(Long id) {
		Optional<User> obj = userRepository.findById(id);
		return obj.orElseThrow(() -> new ResourceNotFoundException(id));
	}
	
	public User insert(User obj) {
		try {
			obj.setPassword(encoder.encode(obj.getPassword()));
			return userRepository.save(obj);
		}catch (DataIntegrityViolationException e) {
			throw new DataBaseException(e.getMessage());
		}
	}
	
	public void delete(Long id) {
		try{
			userRepository.deleteById(id);
		} catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException(id);
		} catch(DataIntegrityViolationException e) {
			throw new DataBaseException(e.getMessage());
		}
	}
	
	public User update(Long id, User obj) {
		try {
			User entity = userRepository.getReferenceById(id);
			updateData(entity, obj);
			return userRepository.save(entity);
		}catch(EntityNotFoundException e) {
			throw new ResourceNotFoundException(id);
		}
	}

	private void updateData(User entity, User obj) {
		entity.setUserName(obj.getUserName());
		entity.setName(obj.getName());
		entity.setEmail(obj.getEmail());
		entity.setPassword(encoder.encode(obj.getPassword()));
	}
}
