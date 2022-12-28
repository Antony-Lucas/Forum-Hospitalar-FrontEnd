package com.example.demo.entities;

import java.io.Serializable;
import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "answers")
public class Answers implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false, columnDefinition = "text")
	private String content;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss", timezone="GMT")
	private Instant moment;
	@ManyToOne
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@JoinColumn(name = "askId")
	private Asks asks;
	@ManyToOne
	@JoinColumn(name = "managementId")
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Management management;
	@ManyToOne
	@JoinColumn(name = "userNameId")
	private User userName;
	
	public Answers() {}
	
	public Answers(Long id, User userName, Instant moment, String content, Asks asks, Management management) {
		super();
		this.id = id;
		this.userName = userName;
		this.content = content;
		this.moment = moment;
		this.asks = asks;
		this.management = management;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUserName() {
		return userName;
	}

	public void setUserName(User userName) {
		this.userName = userName;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Instant getMoment() {
		return moment;
	}

	public void setMoment(Instant moment) {
		this.moment = moment;
	}

	public Asks getAsks() {
		return asks;
	}

	public void setAsks(Asks asks) {
		this.asks = asks;
	}
	
	public Management getmanagement() {
		return management;
	}
	
	public void setmanagement(Management management) {
		this.management = management;
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
		Answers other = (Answers) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
}
