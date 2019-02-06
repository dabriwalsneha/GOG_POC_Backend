import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User, PageUser } from '../models/user.model';
import { Login } from '../models/login.model';
import { Employee } from '../models/emp.model';
import { City } from '../models/city.model';
import { Country } from '../models/country.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  idsForApprove: any = [];
  Empl: Employee;

  constructor(private http: HttpClient) { }

  private addUserUrl = 'http://localhost:8080/user-portal/api/addperson';
  private loginUserURL = 'http://localhost:8080/user-portal/api/loginUser'
  //private userUrl = 'http://localhost:8080/user-portal/api/getNAUser';
  private countUrl = 'http://localhost:8080/user-portal/api/countUser';
  private userUrl = 'http://localhost:8080/user-portal/api/pagination/'
  private approveUserUrl = 'http://localhost:8080/user-portal/api/approveUser';
  private approveUserParamUrl = 'http://localhost:8080/user-portal/api/approveUserParam';

  private addEmpUrl = 'http://localhost:8080/user-portal';


  private getEmpById = 'http://localhost:8080/user-portal/api/getEmpByID';
  private getempdetails = 'http://localhost:8080/user-portal/api/getEmpByID';


  getCountriesURL = 'http://localhost:8080/user-portal/api/countries';
  getCitiesURL = 'http://localhost:8080/user-portal/api/cities';

  //private userUrl = '/api';

  public totalUsers() {
    console.log(this.countUrl);
    return this.http.get<number>(this.countUrl + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  public getUsers(pageno) {
    return this.http.get<PageUser>(this.userUrl + pageno + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }


  // public deleteUser(user) {
  //   console.log(this.userUrl + "/" + user.id);
  //   return this.http.delete(this.userUrl + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token + "/" + user.id);
  // }

  public updateUser(idsForApprove) {
    return this.http.post<Int32Array[]>(this.approveUserUrl + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, idsForApprove);
  }

  public updateUserbyParam(usersforapprove) {
    return this.http.post<User[]>(this.approveUserParamUrl + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, usersforapprove);
  }

  public createUser(user) {
    return this.http.post(this.addUserUrl + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, user);
  }

  public loginUser(log) {
    return this.http.post(this.loginUserURL + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, log);
  }

  public onFormSubmit(formaddarray, myfname, mylname) {
    console.log("dsfdsfdsf");

    //this.firstname = "myname";
    //this.Empl.firstName="ewrewr";

    this.Empl = {
      id: 0,
      firstName: myfname,
      lastName: mylname,
      addr: formaddarray.value
    }
    return this.http.post<Employee>(this.addEmpUrl + "/api/addEmployee_bkp" + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, this.Empl);
  }

  public postidData(id: any) {
    return this.http.post<Employee>(this.getempdetails + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, id);
  }


  public getCountries() {
    return this.http.get<Country[]>(this.getCountriesURL + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
  }


  getCities(countryId: number) {
    return this.http.get<City[]>(this.getCitiesURL + "/" + countryId + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
  }

}
