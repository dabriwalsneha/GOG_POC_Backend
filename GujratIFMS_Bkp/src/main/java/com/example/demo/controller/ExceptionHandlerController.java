package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.demo.exception.GOGException;

@RestControllerAdvice
public class ExceptionHandlerController  {

	@ExceptionHandler({GOGException.class})
	public ResponseEntity handleUserException(GOGException ex)
	{
		ResponseEntity responseMsg=new ResponseEntity<>(ex.getError(),HttpStatus.BAD_REQUEST);     
		return responseMsg;
	}



}
