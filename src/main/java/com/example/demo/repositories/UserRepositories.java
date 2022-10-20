package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.User;

@Repository
public interface UserRepositories extends JpaRepository<User, Long>{
	public User findByName(String name);
	public User findByEmail(String email);
}
