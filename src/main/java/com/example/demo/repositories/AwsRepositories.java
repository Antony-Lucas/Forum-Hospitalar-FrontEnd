package com.example.demo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entities.Aws;
@Repository
public interface AwsRepositories extends CrudRepository<Aws, Integer>{
	
}
