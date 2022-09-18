package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Management;
import com.example.demo.repositories.ManagementRepositories;
import com.example.demo.services.exception.ResourceNotFoundException;

@Service
public class ManagementServices {
	@Autowired
	private ManagementRepositories managementRepositories;
	
	public List<Management> findAll(){
		return managementRepositories.findAll();
	}
	
	public Management findByid(Long id){
		Optional<Management> obj = managementRepositories.findById(id);
		return obj.orElseThrow(() -> new ResourceNotFoundException(id));
	}
	
	public Management insert(Management obj) {
		return managementRepositories.save(obj);
	}
	
}
