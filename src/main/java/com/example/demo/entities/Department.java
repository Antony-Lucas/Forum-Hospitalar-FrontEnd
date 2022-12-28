package com.example.demo.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "department")
public class Department implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nameDepartment;
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "moduleId")
	private Modules modules;
	@OneToMany(mappedBy = "client")
	private List<Asks> asks = new ArrayList<>();
	
	public Department() {
		
	}

	public Department(Long id, String nameDepartment, Modules modules) {
		super();
		this.id = id;
		this.nameDepartment = nameDepartment;
		this.modules = modules;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNameDepartment() {
		return nameDepartment;
	}

	public void setNameDepartment(String nameDepartment) {
		this.nameDepartment = nameDepartment;
	}
	
	public Modules getModules() {
		return modules;
	}

	public void setModules(Modules modules) {
		this.modules = modules;
	}

	public List<Asks> getAsks(){
		return asks;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Department other = (Department) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	
}
