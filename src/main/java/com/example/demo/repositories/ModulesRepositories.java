package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Modules;

public interface ModulesRepositories extends JpaRepository<Modules, Long>{
	
}
