package com.example.demo.repositories.data;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.demo.entities.Management;
import com.example.demo.entities.User;

public class DetailUserData implements UserDetails{
	private static final long serialVersionUID = 1L;
	
	private User user;

	public DetailUserData(User user) {
		super();
		this.user = user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return new ArrayList<>();
	}
	
	public Long getUserId() {
		return this.user.getId();
	}
	
	public String getFullUserName() {
        return this.user.getUserName();
    }
	
	public String GetEmail() {
		return this.user.getEmail();
	}
	
	public Management getManagement() {
		return this.user.getManagement();
	}

	@Override
	public String getUsername() {
		return this.user.getName();
	}

	@Override
	public String getPassword() {
		return this.user.getPassword();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
