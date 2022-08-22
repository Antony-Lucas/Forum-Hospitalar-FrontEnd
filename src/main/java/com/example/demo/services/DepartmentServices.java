package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.entities.Department;
import com.example.demo.repositories.DepartmentRepositories;

@Component
public class DepartmentServices {
	@Autowired
	private DepartmentRepositories userRepository;

	public List<Department> findAll() {
		return userRepository.findAll();
	}
	
	public Department findById(Long id) {
		Optional<Department> obj = userRepository.findById(id);
		return obj.get();
	}
}
