package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Department;
import com.example.demo.repositories.DepartmentRepositories;

@Service
public class DepartmentServices {
	@Autowired
	private DepartmentRepositories departmentRepository;

	public List<Department> findAll() {
		return departmentRepository.findAll();
	}
	
	public Department findById(Long id) {
		Optional<Department> obj = departmentRepository.findById(id);
		return obj.get();
	}
	
	public Department insert(Department obj) {
		return departmentRepository.save(obj);
	}
}
