package com.example.demo.services;

import java.util.Date;
import java.util.List;

import org.hibernate.exception.SQLGrammarException;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Countries;
import com.example.demo.exception.ApplicationError;
import com.example.demo.exception.GOGException;
import com.example.demo.repo.CountriesRepository;
import com.example.demo.utils.Constants;

@Service
public class CountryServiceImpl implements CountryService {

	ch.qos.logback.classic.Logger logger =  (ch.qos.logback.classic.Logger) LoggerFactory.getLogger(CountryServiceImpl.class);
	
	@Autowired
	private CountriesRepository countriesRepository;
	
	private ApplicationError error;
	

	@Override
	public List<Countries> getCountries() throws GOGException {
		
		try {
			return (List<Countries>) countriesRepository.findAll();
		}		
		catch (Exception e) {
			logger.error("Exception while retriveing countries : "+e);	
			error=new ApplicationError(HttpStatus.SERVICE_UNAVAILABLE,new Date(),Constants.GET_COUNTRIES_ERROR,"HIGH");
			throw new GOGException(error);
		}
	}

}
