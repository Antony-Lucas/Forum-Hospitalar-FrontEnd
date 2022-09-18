package com.example.demo.config;

import java.time.Instant;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.example.demo.entities.Answers;
import com.example.demo.entities.Asks;
import com.example.demo.entities.Department;
import com.example.demo.entities.Modules;
import com.example.demo.entities.User;
import com.example.demo.repositories.AnswersRepositories;
import com.example.demo.repositories.AsksRepositories;
import com.example.demo.repositories.DepartmentRepositories;
import com.example.demo.repositories.ModulesRepositories;
import com.example.demo.repositories.UserRepositories;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner{
	@Autowired
	private UserRepositories userRepository;
	
	@Autowired
	private ModulesRepositories modulesRepository;
	
	@Autowired
	private DepartmentRepositories departmentRepository;
	
	@Autowired
	private AsksRepositories askRepository;
	
	@Autowired
	private AnswersRepositories answerRepository;

	@Override
	public void run(String... args) throws Exception {
		/*User u1 = new User(null, "Maria Brown", "maria@gmail.com", "123456");
		User u2 = new User(null, "Alex Green", "alex@gmail.com", "123456"); 
		
		Modules m1 = new Modules(null, "Assistencial");
		Modules m2 = new Modules(null, "SADT");
		Modules m3 = new Modules(null, "Hotelaria");
		
		Department d1 = new Department(null, "Anatomia Patológica", m1);
		Department d2 = new Department(null, "Banco de Sangue", m2);
		Department d3 = new Department(null, "Hemodiálise", m3);
		
		Asks o1 = new Asks(null, "Quanto à endocardite trombótica não bacteriana (ETNB)", Instant.parse("2019-06-20T19:53:07Z"), d1);
		Asks o2 = new Asks(null, "Que forma de identificação é necessária para a doação de sangue?", Instant.parse("2019-07-21T03:42:10Z"), d2);
		Asks o3 = new Asks(null, "Quais são os cuidados com a fístula antes e depois da hemodiálise?", Instant.parse("2019-07-22T15:21:22Z"), d3); 
		
		Answers cat1 = new Answers(null, Instant.parse("2019-06-20T19:53:07Z"), "A ETNB, ao contrário da endocardite infecciosa, apresenta formação vegetante única.", o1);
		Answers cat2 = new Answers(null, Instant.parse("2019-07-21T03:42:10Z"), "Documento oficial com foto, por exemplo: Carteira de Identidade, Carteira Nacional de Habilitação, Carteira de Trabalho, Passaporte ou Carteira Profissional.", o2);
		Answers cat3 = new Answers(null, Instant.parse("2019-07-21T03:42:10Z"), "A fístula é a ligação da artéria com a veia, que se dilata e cresce. No dia a dia, o cuidado deve ser não traumatizar aquele local, não bater, porque pode formar hematoma e comprimir a circulação", o3); 
		Answers cat4 = new Answers(null, Instant.parse("2019-07-21T03:42:10Z"), "Outro cuidado é não deixar infeccionar. Por exemplo, o paciente não deve tirar sangue em laboratório no braço da fístula, pois sua finalidade específica é puncionar durante a diálise.", o3); 
		Answers cat5 = new Answers(null, Instant.parse("2019-07-21T03:42:10Z"), "Quimioterapia é um tratamento que utiliza medicamentos para destruir as células doentes que formam um tumor ou se multiplicam desordenadamente. Estes medicamentos se misturam com o sangue e são levados a todas.", o3);
		
		userRepository.saveAll(Arrays.asList(u1, u2));
		modulesRepository.saveAll(Arrays.asList(m1, m2, m3));
		departmentRepository.saveAll(Arrays.asList(d1, d2, d3));
		askRepository.saveAll(Arrays.asList(o1,o2,o3));
		answerRepository.saveAll(Arrays.asList(cat1,cat2,cat3, cat4, cat5));*/
	}

}
