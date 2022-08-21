package com.example.demo.config;

import java.time.Instant;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.example.demo.entities.Asks;
import com.example.demo.entities.User;
import com.example.demo.repositories.AsksRepositories;
import com.example.demo.repositories.UserRepositories;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner{
	@Autowired
	private UserRepositories userRepository;
	
	@Autowired
	private AsksRepositories askRepository;

	@Override
	public void run(String... args) throws Exception {
		User u1 = new User(null, "Maria Brown", "maria@gmail.com", "123456");
		User u2 = new User(null, "Alex Green", "alex@gmail.com", "123456"); 
		
		Asks o1 = new Asks(null, Instant.parse("2019-06-20T19:53:07Z"), u1);
		Asks o2 = new Asks(null, Instant.parse("2019-07-21T03:42:10Z"), u2);
		Asks o3 = new Asks(null, Instant.parse("2019-07-22T15:21:22Z"), u1); 
		
		userRepository.saveAll(Arrays.asList(u1, u2));
		askRepository.saveAll(Arrays.asList(o1,o2,o3));
	}

}
