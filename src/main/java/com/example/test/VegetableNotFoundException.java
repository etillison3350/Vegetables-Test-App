package com.example.test;

public class VegetableNotFoundException extends RuntimeException {

	private static final long serialVersionUID = -3474986951554910015L;

	public VegetableNotFoundException(int id) {
		super("Could not find vegetable with id \"" + id + "\"");
	}

}
