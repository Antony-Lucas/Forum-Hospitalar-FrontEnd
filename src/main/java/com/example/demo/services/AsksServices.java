package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.entities.Asks;
import com.example.demo.repositories.AsksRepositories;

@Component
public class AsksServices {
	@Autowired
	private AsksRepositories askRepository;

	public List<Asks> findAll() {
		return askRepository.findAll();
	}
	
	public Asks findById(Long id) {
		Optional<Asks> obj = askRepository.findById(id);
		return obj.get();
	}
}
