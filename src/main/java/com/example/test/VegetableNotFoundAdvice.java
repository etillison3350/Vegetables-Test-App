package com.example.test;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class VegetableNotFoundAdvice {

	@ResponseBody
	@ExceptionHandler(VegetableNotFoundException.class)
	@ResponseStatus(code = HttpStatus.NOT_FOUND)
	String vegetableNotFound(VegetableNotFoundException e) {
		return e.getMessage();
	}

}
