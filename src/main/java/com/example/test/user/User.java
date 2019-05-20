package com.example.test.user;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;

@Entity
@Data
public class User implements UserDetails {

	private static final long serialVersionUID = 1969306598471254010L;

	@GeneratedValue
	@Id
	private long id;

	private String lastName, firstName;

	@Column(nullable = false, unique = true)
	private String username;

	private String password;

	private String permissions;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Arrays.stream(permissions.split("\\|")).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
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
