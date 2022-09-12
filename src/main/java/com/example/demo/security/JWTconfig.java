package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import com.example.demo.services.DetailUserServicesImpl;

@EnableWebSecurity
public class JWTconfig {
	private final DetailUserServicesImpl userService;
	private final PasswordEncoder passwordEncoder;
	
	public JWTconfig(DetailUserServicesImpl userService, PasswordEncoder passwordEncoder) {
		super();
		this.userService = userService;
		this.passwordEncoder = passwordEncoder;
	}
	
	@Bean
	public AuthenticationManager authManager(HttpSecurity http) throws Exception{
		return http
				.getSharedObject(AuthenticationManagerBuilder.class)
				.userDetailsService(userService)
				.passwordEncoder(passwordEncoder)
				.and()
				.build();
	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception{
		http
			.csrf()
			.disable()
			.authorizeRequests()
			.antMatchers(HttpMethod.GET, "/refreshtoken")
			.permitAll()
			.antMatchers(HttpMethod.POST, "/users")
			.permitAll()
			.anyRequest()
			.authenticated()
			.and()
			.addFilter(new JWTauth(authenticationManager))
			.addFilter(new JWTvalidate(authenticationManager))
			.addFilterBefore(new JWTfilter(), UsernamePasswordAuthenticationFilter.class)
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		return http.build();
	}
	
	@Bean
	UrlBasedCorsConfigurationSource corsConfigurationSource() {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		
		CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
		source.registerCorsConfiguration("/**", corsConfiguration);
		return source;
	}
}
