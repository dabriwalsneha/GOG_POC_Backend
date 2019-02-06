package com.example.demo.services;

import java.util.Date;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Cities;
import com.example.demo.exception.ApplicationError;
import com.example.demo.exception.GOGException;
import com.example.demo.repo.CitiesRepository;

@Service
public class CitiesServiceImpl implements CitiesService {

	ch.qos.logback.classic.Logger logger =  (ch.qos.logback.classic.Logger) LoggerFactory.getLogger(CitiesServiceImpl.class);

	@Autowired
	private CitiesRepository CitiesRepository;

	private ApplicationError error;


	@Override
	public List<Cities> getCities(int id) throws GOGException {
		try {
			return CitiesRepository.getCitiesBycid(id);
		}catch (Exception e) {
			logger.error("Exception while creating user : "+e);	
			error=new ApplicationError(HttpStatus.SERVICE_UNAVAILABLE,new Date(), e.getMessage(),"HIGH");
			throw new GOGException(error);
		}
	}

}
