package com.example.test.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class UserErrorAdvice {

	@ResponseBody
	@ExceptionHandler(DuplicateUserException.class)
	@ResponseStatus(code = HttpStatus.CONFLICT)
	public String duplicateUser(DuplicateUserException e) {
		return e.getMessage();
	}

}
