package com.example.demo.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.entity.Employee;

public interface EmployeeRepo  extends CrudRepository<Employee, Integer> 
{
	List<Employee> findById(int aid);

}
