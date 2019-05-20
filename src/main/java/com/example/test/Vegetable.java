package com.example.test;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Vegetable {
	@Id @GeneratedValue
	private int id;
	private String name;
	private String color;
	private float price;

	void cloneInto(Vegetable other) {
		other.name = name;
		other.color = color;
		other.price = price;
	}
}
