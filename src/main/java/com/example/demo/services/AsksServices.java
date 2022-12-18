package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Asks;
import com.example.demo.repositories.AsksRepositories;
import com.example.demo.services.exception.DataBaseException;
import com.example.demo.services.exception.ResourceNotFoundException;

@Service
public class AsksServices {
	@Autowired
	private AsksRepositories askRepository;

	public List<Asks> findAll() {
		return askRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
	}
	
	public Asks findById(Long id) {
		Optional<Asks> obj = askRepository.findById(id);
		return obj.orElseThrow(() -> new ResourceNotFoundException(id));
	}
	
	public Asks insert(Asks obj) {
		return askRepository.save(obj);
	}
	
	public void delete(Long id) {
		try {
			askRepository.deleteById(id);
		}catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException(id);
		}catch(DataIntegrityViolationException e) {
			throw new DataBaseException(e.getMessage());
		}
	}
	
	public Asks update(Long id, Asks obj) {
		try {
			Asks entity = askRepository.getReferenceById(id);
			updateData(entity, obj);
			return askRepository.save(entity);
		}catch(RuntimeException e) {
			throw new ResourceNotFoundException(id);
		}
	}
	
	public void updateData(Asks entity, Asks obj) {
		entity.setContent(obj.getContent());
		entity.setMoment(obj.getMoment());
	}
}
