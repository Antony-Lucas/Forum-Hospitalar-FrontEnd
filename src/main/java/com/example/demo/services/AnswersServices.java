package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.entities.Answers;
import com.example.demo.repositories.AnswersRepositories;

@Component
public class AnswersServices {
	@Autowired
	private AnswersRepositories userRepository;

	public List<Answers> findAll() {
		return userRepository.findAll();
	}
	
	public Answers findById(Long id) {
		Optional<Answers> obj = userRepository.findById(id);
		return obj.get();
	}
}
