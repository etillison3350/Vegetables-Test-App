package com.example.test.user;

public class DuplicateUserException extends RuntimeException {

	private static final long serialVersionUID = 7308525892143242080L;

	public DuplicateUserException(String username) {
		super("A user with the username '" + username + "' already exists.");
	}

}
