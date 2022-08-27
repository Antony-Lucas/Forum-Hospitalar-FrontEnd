package com.example.demo.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.demo.entities.Answers;
import com.example.demo.services.AnswersServices;

@RestControllerAdvice
@RequestMapping(value = "/modules/departments/asks/answers")
public class AnswersResources {
	@Autowired
	private AnswersServices services;
	@GetMapping
	public ResponseEntity<List<Answers>> findAll(){
		List<Answers> list = services.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Answers> findById(@PathVariable Long id){
		Answers obj = services.findById(id);
		return ResponseEntity.ok().body(obj);
	}
}
