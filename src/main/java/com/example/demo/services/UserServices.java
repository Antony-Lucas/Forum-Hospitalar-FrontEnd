package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepositories;

public class UserServices {
	@Autowired
	private UserRepositories userRepository;

	public List<User> findAll() {
		return userRepository.findAll();
	}
}
