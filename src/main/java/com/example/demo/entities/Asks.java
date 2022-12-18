package com.example.demo.entities;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "asks")
public class Asks implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String imageUrl;
	@Column(nullable = false, columnDefinition = "text")
	private String content;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss", timezone="GMT")
	private Instant moment;
	@ManyToOne
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@JoinColumn(name = "clientId")
	private Department client;
	@ManyToOne
	@JoinColumn(name = "manageId")
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Management management;
	@ManyToOne
	@JoinColumn(name = "userNameId")
	private User userName;
	@OneToMany(mappedBy = "asks", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Answers> answers = new ArrayList<>();
	public Asks() {
		
	}

	public Asks(Long id, String imageUrl, User userName, String content, Instant moment, Department client, Management management) {
		super();
		this.id = id;
		this.userName = userName;
		this.imageUrl = imageUrl;
		this.content = content;
		this.moment = moment;
		this.client = client;
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

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Instant getMoment() {
		return moment;
	}

	public void setMoment(Instant moment) {
		this.moment = moment;
	}

	public Department getClient() {
		return client;
	}

	public void setClient(Department client) {
		this.client = client;
	}
	
	public Management getmanagement() {
		return management;
	}

	public void setUser(Management management) {
		this.management = management;
	}

	public List<Answers> getAnswers(){
		return answers;
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
		Asks other = (Asks) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
}
