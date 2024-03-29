package com.hexaware.lms.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Admin{
	@Id
	@SequenceGenerator(name="admin_sequence",initialValue=10001)
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator="admin_sequence")
	private long adminId;
	
	@Column(name="profile")
	private String profileImage;
	
	@Column(name = "firstName")
	private String adminFirstName;
	
	@Column(name = "lastName")
	private String adminLastName;

	private String email;

	private String password;
	
	@Lob
	private byte[] image;
	
	@Column(columnDefinition = "varchar(5) default 'ADMIN'",nullable=false)
	private String role="ADMIN";
	
	public Admin() {
		super();
	}

	public void setAdminId(long adminId) {
		this.adminId = adminId;
	}

	public Admin(String adminFirstName, String adminLastName, String email, String password) {
		super();
		this.adminFirstName = adminFirstName;
		this.adminLastName = adminLastName;
		this.email = email;
		this.password = password;
	}

	public long getAdminId() {
		return adminId;
	}

	public String getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}

	public String getAdminFirstName() {
		return adminFirstName;
	}

	public void setAdminFirstName(String adminFirstName) {
		this.adminFirstName = adminFirstName;
	}

	public String getAdminLastName() {
		return adminLastName;
	}

	public void setAdminLastName(String adminLastName) {
		this.adminLastName = adminLastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	@Override
	public String toString() {

		return "Admin [AdminId=" + adminId + ", adminFirstName=" + adminFirstName + ", adminLastName=" + adminLastName

				+ ", email=" + email + ", password=" + password + ", role=" + role + "]";
	}	
}
