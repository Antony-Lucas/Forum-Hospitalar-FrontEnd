package com.example.demo.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.demo.entities.Asks;
import com.example.demo.entities.Management;
import com.example.demo.services.ManagementServices;

@RestControllerAdvice
@RequestMapping(value = "/management")
public class ManagementResources {
	@Autowired
	private ManagementServices services;
	
	@GetMapping
	public ResponseEntity<List<Management>> findAll(){
		List<Management> list = services.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Management> findByid(@PathVariable Long id){
		Management obj = services.findByid(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@PostMapping
	public ResponseEntity<Management> insert(@RequestBody Management obj){
		obj = services.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Management> delete(@PathVariable Long id){
		services.delete(id);
		return ResponseEntity.noContent().build();
	}
}
