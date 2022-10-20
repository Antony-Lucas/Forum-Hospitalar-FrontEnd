package com.example.demo.services;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepositories;
import com.example.demo.repositories.data.DetailUserData;

@Component
public class DetailUserServicesImpl implements UserDetailsService{
	
	private final UserRepositories userRepository;
	
	public DetailUserServicesImpl(UserRepositories userRepository) {
		super();
		this.userRepository = userRepository;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByName(username);
		
		if(user == null) {
			throw new UsernameNotFoundException("Usuário [" + username + "] não encontrado");
		}
		
		return new DetailUserData(user);
	}

}
