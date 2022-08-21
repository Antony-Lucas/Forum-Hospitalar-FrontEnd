package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Asks;

public interface AsksRepositories extends JpaRepository<Asks, Long>{
	
}
