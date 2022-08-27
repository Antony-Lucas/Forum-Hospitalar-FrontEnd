package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Asks;

@Repository
public interface AsksRepositories extends JpaRepository<Asks, Long>{
	
}
