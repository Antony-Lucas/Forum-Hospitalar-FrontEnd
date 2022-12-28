package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Modules;
import com.example.demo.repositories.ModulesRepositories;

@Service
public class ModulesServices {
	@Autowired
	private ModulesRepositories userRepository;

	public List<Modules> findAll() {
		return userRepository.findAll();
	}
	
	public Modules findById(Long id) {
		Optional<Modules> obj = userRepository.findById(id);
		return obj.get();
	}
}
