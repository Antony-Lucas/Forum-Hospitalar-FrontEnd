package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Answers;

@Repository
public interface AnswersRepositories extends JpaRepository<Answers, Long>{
	
}
