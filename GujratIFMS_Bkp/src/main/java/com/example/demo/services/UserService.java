package com.example.demo.services;


import java.util.HashMap;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Address;
import com.example.demo.entity.Employee;
import com.example.demo.entity.User;
import com.example.demo.exception.GOGException;


@Service("userService")
public interface UserService 
{
	void create(User user) throws GOGException;
	
	HashMap<String, String> login(String login);
	
	void updateStatus(List<User> users) throws GOGException;
	
	User findUser(int uid);
	
	List<String> findAllFirstName();

	String deleteUser(int id);
    
    long totalCount() throws GOGException;
    
    void addEmployee(Employee emp,List<Address> addr);
    
    Employee findEmpById(int eid);
	
    List<User> findUserbyStatus(boolean stat);    
    
    Page<User> getUser(int pageno) throws GOGException;
    
}