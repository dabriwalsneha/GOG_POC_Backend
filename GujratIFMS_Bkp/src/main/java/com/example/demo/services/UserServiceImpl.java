package com.example.demo.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;

import com.example.demo.entity.Address;
import com.example.demo.entity.Employee;
import com.example.demo.entity.Login;
import com.example.demo.entity.User;
import com.example.demo.exception.ApplicationError;
import com.example.demo.exception.GOGException;
import com.example.demo.repo.EmployeeRepo;
import com.example.demo.repo.LoginRepository;
import com.example.demo.repo.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	ch.qos.logback.classic.Logger logger = (ch.qos.logback.classic.Logger) LoggerFactory
			.getLogger(UserServiceImpl.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private LoginRepository logrepos;
	
	@Autowired
	private EmployeeRepo emplRepos;

	private ApplicationError error;

	@Override
	public void create(User user) throws GOGException {
		try {
			String jsessionid = RequestContextHolder.currentRequestAttributes().getSessionId();
			logger.info(jsessionid + " : Create User" + user.toString());
			userRepository.save(user);
		} catch (Exception e) {
			logger.error("Exception while creating user : " + user + " " + e);
			error = new ApplicationError(HttpStatus.BAD_REQUEST, new Date(), e.getMessage(), "HIGH");
			throw new GOGException(error);
		}
	}

	@Override
	public long totalCount() throws GOGException {
		String jsessionid = RequestContextHolder.currentRequestAttributes().getSessionId();
		logger.info(jsessionid + "Get user");
		try {
			long count = userRepository.count();
			return count;
		} catch (Exception e) {
			logger.error("Exception while retrieving users : " + e);
			error = new ApplicationError(HttpStatus.SERVICE_UNAVAILABLE, new Date(), e.getMessage(), "HIGH");
			throw new GOGException(error);
		}
	}
	
	@Override
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED, readOnly = false, timeout = 100, rollbackFor = Exception.class)
	public void addEmployee(Employee emp, List<Address> addr) {
		String jsessionid = RequestContextHolder.currentRequestAttributes().getSessionId(); 
		logger.info(jsessionid + "Add Employee");
		emp.setAddr(addr);
		emplRepos.save(emp);
	}
	
	@Override
	public Employee findEmpById(int eid) {
		Employee empl = new Employee();
		String jsessionid = RequestContextHolder.currentRequestAttributes().getSessionId(); 
		logger.info(jsessionid + "Get Employee by ID");
		try {
			List<Address> addr = emplRepos.findById(eid).get(0).getAddr();

			empl.setId(eid);
			empl.setFirstName(emplRepos.findById(eid).get(0).getFirstName());
			empl.setLastName(emplRepos.findById(eid).get(0).getLastName());

			Address a = null;
			List<Address> addrs = new ArrayList<>();
			for (Address adrs : addr) {
				a = new Address();
				a.set__Adrs___hno(adrs.get__Adrs___hno());
				a.set__Adrs___city(adrs.get__Adrs___city());
				a.set__Adrs___state(adrs.get__Adrs___state());
				addrs.add(a);
			}
			empl.setAddr(addrs);
			return empl;

		} catch (Exception e) {
			logger.error("Exception while retrieving Employee By ID : " + e);
			error = new ApplicationError(HttpStatus.SERVICE_UNAVAILABLE, new Date(), e.getMessage(), "HIGH");
			throw new GOGException(error);
		}		
	}

	@Override
	public void updateStatus(List<User> users) throws GOGException {

		String jsessionid = RequestContextHolder.currentRequestAttributes().getSessionId();
		logger.info(jsessionid + "Approve users " + users.toString());
		try {
			userRepository.saveAll(users);
		} catch (Exception e) {
			logger.error("Exception while approving users : " + e);
			error = new ApplicationError(HttpStatus.BAD_REQUEST, new Date(), e.getMessage(), "HIGH");
			throw new GOGException(error);
		}
	}

	@Override
	public HashMap<String, String> login(String login) {
		HashMap<String, String> map = new HashMap<String, String>();
		String jsessionid = RequestContextHolder.currentRequestAttributes().getSessionId();
		logger.info(jsessionid + " : Login : " + login);
		try {
			List<Login> logList = (List<Login>) logrepos.findAll();
			for (Login l : logList) {
				if (login.equals(l.getUsername())) {
					map.put("user", l.getUser());
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			map.put("error", "error");
		}
		return map;
	}

	@Override
	public User findUser(int uid) {
		String jsessionid = RequestContextHolder.currentRequestAttributes().getSessionId();

		logger.info(jsessionid + "***************** in findUser() of MainServiceImpl...");
		User user1 = userRepository.findById(uid).orElse(new User());

		return user1;

	}

	@Override
	public List<String> findAllFirstName() {
		String jsessionid = RequestContextHolder.currentRequestAttributes().getSessionId();

		logger.info(jsessionid + "***************** in findAllFirstName of MainServiceImpl...");
		List<String> listFname = new ArrayList<String>();
		List<User> listUser = (List<User>) userRepository.findAll();
		for (User a : listUser) {
			listFname.add(a.getFirstname());
		}

		return listFname;
	}

	@Override
	public String deleteUser(int id) {
		String jsessionid = RequestContextHolder.currentRequestAttributes().getSessionId();

		logger.info(jsessionid + "***************** in deleteUser of MainServiceImpl...");
		userRepository.deleteById(id);

		User verifyUser = findUser(id);
		if ((verifyUser.getFirstname() + "").equals("null")) {
			return "Success : User " + id + " is deleted.";
		} else
			return "Error";
	}

	@Override
	public List<User> findUserbyStatus(boolean stat) {
		String jsessionid = RequestContextHolder.currentRequestAttributes().getSessionId();
		logger.info(jsessionid + "***************** in findUserbyStatus of MainServiceImpl...");
		return userRepository.findByStatus(stat);

	}

	@Override
	public Page<User> getUser(int pageno) throws GOGException {
		String jsessionid = RequestContextHolder.currentRequestAttributes().getSessionId();
		logger.info(jsessionid + "Get user");
		try {
			Pageable pageable = PageRequest.of(pageno, 10);
			Page<User> findAll = userRepository.findAll(pageable);
			return findAll;
		} catch (Exception e) {
			logger.error("Exception while retrieving users : " + e);
			error = new ApplicationError(HttpStatus.SERVICE_UNAVAILABLE, new Date(), e.getMessage(), "HIGH");
			throw new GOGException(error);
		}
	}

}
