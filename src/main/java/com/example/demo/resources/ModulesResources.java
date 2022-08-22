package com.example.demo.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.demo.entities.Modules;
import com.example.demo.services.ModulesServices;

@RestControllerAdvice
@RequestMapping(value = "/modules")
public class ModulesResources {
	@Autowired
	private ModulesServices services;
	@GetMapping
	public ResponseEntity<List<Modules>> findAll(){
		List<Modules> list = services.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Modules> findById(@PathVariable Long id){
		Modules obj = services.findById(id);
		return ResponseEntity.ok().body(obj);
	}
}
