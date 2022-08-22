package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Answers;

public interface AnswersRepositories extends JpaRepository<Answers, Long>{
	
}
