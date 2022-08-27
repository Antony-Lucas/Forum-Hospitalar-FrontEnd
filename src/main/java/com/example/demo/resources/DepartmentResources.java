package com.example.demo.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.demo.entities.Department;
import com.example.demo.services.DepartmentServices;

@RestControllerAdvice
@RequestMapping(value = "/modules/departments")
public class DepartmentResources {
	@Autowired
	private DepartmentServices services;
	@GetMapping
	public ResponseEntity<List<Department>> findAll(){
		List<Department> list = services.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Department> findById(@PathVariable Long id){
		Department obj = services.findById(id);
		return ResponseEntity.ok().body(obj);
	}
}
