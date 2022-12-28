package com.example.demo.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.amazonaws.services.alexaforbusiness.model.Sort;
import com.example.demo.entities.Asks;
import com.example.demo.services.AsksServices;

@RestControllerAdvice
@RequestMapping(value = "/modules/departments/asks")
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
	
	@PostMapping
	public ResponseEntity<Asks> insert(@RequestBody Asks obj){
		obj = services.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Asks> delete(@PathVariable Long id){
		services.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Asks> update(@PathVariable Long id, @RequestBody Asks obj){
		obj = services.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
}
