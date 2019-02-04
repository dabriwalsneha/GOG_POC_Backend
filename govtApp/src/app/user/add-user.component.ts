import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { UserService } from './user.service';

import { City } from '../models/city.model';
import { Country } from '../models/country.model';

@Component({
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  countries: Country[];
  cities: City[];
  errorMsg: any;

  ngOnInit() {
    this.userService.getCountries().subscribe(
      data => { this.countries = data },
      error => {
        this.errorMsg = error;
        if (this.errorMsg.status == 503) {
          alert("There is some problem while fetching countries.")
        }
      }
    );
  }

  user: User = new User();
  isEnabled = false;

  constructor(private router: Router, private userService: UserService) {

  }

  response: any;

  fromUserslist = ["Engineer", "Senior Engineer", "Technical Lead", "Manager", "Analyst"];

  toUserslist = [];

  temptouserList = [];

  onChangeCountry(countryId) {
    console.log(countryId)
    if (!countryId) {
      this.cities = null;
      this.cities = null;
    }
    else {

      this.userService.getCities(countryId).subscribe(
        data => { this.cities = data },
        error => {
          this.errorMsg = error;
          if (this.errorMsg.status == 503) {
            alert("There is some problem while fetching cities.")
          }
        }
      );
      this.cities = null;
    }
  }


  createList(user, button1: HTMLButtonElement, btnval: string, button2: HTMLButtonElement) {
    this.temptouserList = [];
    var str_array: string[] = user.toString().split(',');
    this.temptouserList = str_array;

    if (btnval == "button1") {
      button1.disabled = false;
      button2.disabled = true;
    }
    else {
      button1.disabled = true;
      button2.disabled = false;
    }

  }


  updateToList() {
    this.user.designation = "";
    for (let i of this.temptouserList) {
      this.toUserslist.push(i);
    }
    this.user.designation = this.toUserslist.toString();
    for (let i of this.temptouserList) {
      let temp: string = i.toString();
      const index: number = this.fromUserslist.indexOf(temp);
      this.fromUserslist.splice(index, 1);
    }
    this.temptouserList = [];
  }

  removeFromList() {
    this.user.designation = "";
    for (let i of this.temptouserList) {
      this.fromUserslist.push(i);
    }
    for (let i of this.temptouserList) {
      let temp: string = i.toString();
      const index: number = this.toUserslist.indexOf(temp);
      this.toUserslist.splice(index, 1);
    }
    this.user.designation = this.toUserslist.toString();
    this.temptouserList = [];
  }

  createUser() {
    this.user.status = false;

    if (this.user.email != undefined || this.user.email != "") {
      if (this.ValidateEmail(this.user.email) == false)
        return;
    }

    if (this.user.contact != undefined) {
      if (this.phonenumber(this.user.contact) == false)
        return;
    }

    if (this.user.age != undefined) {
      if (this.phonenumber(this.user.age) == false)
        return;
    }

    if (this.toUserslist.length == 0) {
      alert("Select a particular Designation.")
      return;
    }

    else {
      this.userService.createUser(this.user)
        .subscribe(data => {
          this.response = data;
          alert("User created successfully.");
          this.router.navigateByUrl('/welcome');
        }, error => {
          this.errorMsg = error;
          if (this.errorMsg.status == 400) {
            alert("User cannot be created. Please try again later.")
          }
        });
    }
  };

  ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    else {
      alert("You have entered an invalid email address!")
      return false;
    }
  }

  phonenumber(inputtxt) {
    const phoneno = /^\d{10}$/;
    if (phoneno.test(inputtxt)) {
      return true;
    }
    else {
      alert("Please enter a valid Contact.");
      return false;
    }
  }

}
