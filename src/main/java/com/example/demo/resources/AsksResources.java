package com.example.demo.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.demo.entities.Asks;
import com.example.demo.services.AsksServices;

@RestControllerAdvice
@RequestMapping(value = "/asks")
public class AsksResources {
	@Autowired
	private AsksServices services;
	@GetMapping
	public ResponseEntity<List<Asks>> findAll(){
		List<Asks> list = services.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Asks> findById(@PathVariable Long id){
		Asks obj = services.findById(id);
		return ResponseEntity.ok().body(obj);
	}
}
