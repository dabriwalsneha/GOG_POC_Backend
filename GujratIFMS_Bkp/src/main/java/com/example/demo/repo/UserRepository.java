package com.example.demo.repo;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.example.demo.entity.User;

public interface UserRepository extends PagingAndSortingRepository<User, Integer> 
{
	List<User> findByStatus(Boolean stat);

}