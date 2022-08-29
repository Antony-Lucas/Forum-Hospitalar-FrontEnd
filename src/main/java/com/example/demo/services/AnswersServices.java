package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Answers;
import com.example.demo.repositories.AnswersRepositories;
import com.example.demo.services.exception.ResourceNotFoundException;

@Service
public class AnswersServices {
	@Autowired
	private AnswersRepositories answerRepository;

	public List<Answers> findAll() {
		return answerRepository.findAll();
	}
	
	public Answers findById(Long id) {
		Optional<Answers> obj = answerRepository.findById(id);
		return obj.orElseThrow(() -> new ResourceNotFoundException(id));
	}
	
	public Answers insert(Answers obj) {
		return answerRepository.save(obj);
	}
	
	public void delete(Long id) {
		answerRepository.deleteById(id);
	}
	
	public Answers update(Long id, Answers obj) {
		Answers entity = answerRepository.getReferenceById(id);
		updateData(entity, obj);
		return answerRepository.save(entity);
	}
	
	public void updateData(Answers entity, Answers obj) {
		entity.setContent(obj.getContent());
		entity.setMoment(obj.getMoment());
	}
}
