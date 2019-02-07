package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;

import com.example.demo.entity.Cities;
import com.example.demo.entity.Countries;
import com.example.demo.entity.User;
import com.example.demo.services.CitiesService;
import com.example.demo.services.CountryService;
import com.example.demo.services.UserService;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class MainController 
{
	ch.qos.logback.classic.Logger logger =  (ch.qos.logback.classic.Logger) LoggerFactory.getLogger(MainController.class);


	@Autowired
	private UserService userService;

	@Autowired
	private CountryService countryService;

	@Autowired
	private CitiesService cityService;

	@RequestMapping("/") 
	public String home()
	{
		return "ShowUser.jsp";
	} 

	@GetMapping("/api/countries")
	public List<Countries> getCountries(HttpSession session)
	{	
		logger.info("Get countries");
		List<Countries> countries=countryService.getCountries();
		return countries;
	}


	@Cacheable(value="citiesCache" , key="#countryId")
	@GetMapping("/api/cities/{countryId}")
	public List<Cities> getCities(@PathVariable("countryId")int countryId)
	{
		logger.info("Get cities for id : "+countryId);
		List<Cities> cities=cityService.getCities(countryId);
		return cities;
	}


	@RequestMapping(path="/api/addperson") 
	public User create(@RequestBody User user,HttpServletRequest request){

		logger.info(request.getSession().getId()+" Create user : "+user.toString());
		userService.create(user);	
		logger.info(request.getSession().getId()+" user created successfully");
		return user;
	}


	@Secured("ROLE_ADMIN")
	@RequestMapping(path="/api/getUser") 
	public List<User> getUsers()
	{
		String jsessionid = RequestContextHolder.currentRequestAttributes().getSessionId(); 
		logger.info(jsessionid + " Get user");
		List<User> users = userService.findAll();
		return users;

	}
	
	@RequestMapping(path="/api/loginUser") 
	public HashMap<String, String> loginUser(@RequestBody String login) {

		String jsessionid = RequestContextHolder.currentRequestAttributes().getSessionId(); 
		logger.info(jsessionid + "Inside login User");
		HashMap<String, String> map = new HashMap<String, String>();
		try {
			
			map = userService.login(login);
			
		} catch (Exception e) {
			System.out.println(e);
			map.put("error", "error");
		}
		
		return map;
	}


	@PostMapping(path="/api/approveUserParam")
	public void approveUser(@RequestBody List<User> arr,HttpServletRequest request) { 

		logger.info(request.getSession().getId() +" Approve user : "+arr.toString());   
		userService.updateStatus(arr);
	}


}