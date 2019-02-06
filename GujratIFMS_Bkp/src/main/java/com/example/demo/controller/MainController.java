package com.example.demo.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;

import com.example.demo.entity.Address;
import com.example.demo.entity.Cities;
import com.example.demo.entity.Countries;
import com.example.demo.entity.Employee;
import com.example.demo.entity.User;
import com.example.demo.services.CitiesService;
import com.example.demo.services.CountryService;
import com.example.demo.services.UserService;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class MainController {
	ch.qos.logback.classic.Logger logger = (ch.qos.logback.classic.Logger) LoggerFactory
			.getLogger(MainController.class);

	@Autowired
	private UserService userService;

	@Autowired
	private CountryService countryService;

	@Autowired
	private CitiesService cityService;

	@RequestMapping("/")
	public String home() {
		return "ShowUser.jsp";
	}

	@GetMapping("/api/countries")
	public List<Countries> getCountries(HttpSession session) {
		logger.info("Get countries");
		List<Countries> countries = countryService.getCountries();
		return countries;
	}

	@Cacheable(value = "citiesCache", key = "#countryId")
	@GetMapping("/api/cities/{countryId}")
	public List<Cities> getCities(@PathVariable("countryId") int countryId) {
		logger.info("Get cities for id : " + countryId);
		List<Cities> cities = cityService.getCities(countryId);
		return cities;
	}

	@RequestMapping(path = "/api/addperson")
	public User create(@RequestBody User user, HttpServletRequest request) {

		logger.info(request.getSession().getId() + " Create user : " + user.toString());
		userService.create(user);
		logger.info(request.getSession().getId() + " user created successfully");
		return user;
	}

	@Secured("ROLE_ADMIN")
	@RequestMapping(path = "/api/countUser")
	public long totalCountUsers() {
		String jsessionid = RequestContextHolder.currentRequestAttributes().getSessionId();
		logger.info(jsessionid + " Total Count of Users");

		return userService.totalCount();

	}

	@SuppressWarnings("unchecked")
	@RequestMapping(path = "/api/addEmployee_bkp", method = RequestMethod.POST)
	public void addEmployee_bkp(@RequestBody Map<String, Object> emp, HttpSession session) {

		String jsessionid = RequestContextHolder.currentRequestAttributes().getSessionId();
		logger.info(jsessionid + " Add Employee");
		session.setAttribute("uname", "abc");

		Map<String, Address> ad = (Map<String, Address>) emp.get("addr");
		List addee = (List) ad.get("itemsRows");
		String temp = "";
		Employee empl = new Employee();
		empl.setFirstName(emp.get("firstName") + "");
		empl.setLastName(emp.get("lastName") + "");

		List<Address> adrs = new ArrayList<>();
		for (int i = 0; i < addee.size(); i++) {
			temp = addee.get(i).toString();
			temp = temp.replace("{", "");
			temp = temp.replace("}", "");

			List<String> myList = new ArrayList<String>(Arrays.asList(temp.split(", __")));

			Address addrs = new Address();
			addrs.set__Adrs___hno(myList.get(0).substring(13));
			addrs.set__Adrs___city(myList.get(1).substring(12));
			addrs.set__Adrs___state(myList.get(2).substring(13));
			addrs.setEmployee(empl);

			adrs.add(addrs);
		}
		userService.addEmployee(empl, adrs);
	}
	
	@RequestMapping(path = "/api/getEmpByID", method = RequestMethod.POST)
	public Employee getEmpByID(@RequestBody String eid) {

		String jsessionid = RequestContextHolder.currentRequestAttributes().getSessionId();
		logger.info(jsessionid + " Get Employee by ID");

		Employee gEmpl = userService.findEmpById(Integer.parseInt(eid));
		List<Employee> gUser = new ArrayList<Employee>();
		gUser.add(gEmpl);
		return gEmpl;

	}

	@RequestMapping(path = "/api/loginUser")
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

	@PostMapping(path = "/api/approveUserParam")
	public void approveUser(@RequestBody List<User> arr, HttpServletRequest request) {

		logger.info(request.getSession().getId() + " Approve user : " + arr.toString());
		userService.updateStatus(arr);
	}

	@GetMapping(path = "/api/pagination/{pageno}")
	public Page<User> pagination(@PathVariable int pageno, HttpServletRequest request) {

		String jsessionid = RequestContextHolder.currentRequestAttributes().getSessionId();
		logger.info(jsessionid + " Get user");
		return userService.getUser(pageno);
	}

}