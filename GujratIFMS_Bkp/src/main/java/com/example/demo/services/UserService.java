package com.example.demo.services;


import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.exception.GOGException;


@Service("userService")
public interface UserService 
{
	void create(User user);
	
	HashMap<String, String> login(String login);
	
	void updateStatus(List<User> users) throws GOGException;
	
	User findUser(int uid);
	
	List<String> findAllFirstName();

	String deleteUser(int id);
    
    List<User> findAll();
	
    List<User> findUserbyStatus(boolean stat);    
    

}
