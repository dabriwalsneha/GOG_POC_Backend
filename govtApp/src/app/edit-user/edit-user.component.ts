import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../user/user.service';
import { ComponentService } from '../service/component.service'
import { Country } from '../models/country.model';
import { City } from '../models/city.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private userService: UserService, private sharingService: ComponentService) { }

  user: User = new User();
  countries: Country[];
  cities: City[];
  errorMsg: any;

  toUserslist = [];
  temptouserList = [];
  fromUserslist = ["Engineer", "Senior Engineer", "Technical Lead", "Manager", "Analyst"];

  ngOnInit() {
    this.user = this.sharingService.getData();
    this.userService.getCountries().subscribe(
      data => { this.countries = data },
      error => {
        this.errorMsg = error;
        if (this.errorMsg.status == 503) {
          alert("There is some problem while fetching countries.")
        }
      }
    );
    this.userService.getCities(+this.user.address.country).subscribe(
      data => { this.cities = data },
      error => {
        this.errorMsg = error;
        if (this.errorMsg.status == 503) {
          alert("There is some problem while fetching countries.")
        }
      }
    );


    var str_array: string[] = this.user.designation.toString().split(',');
    this.toUserslist = str_array;
    for (let i of this.toUserslist) {
      let temp: string = i.toString();
      const index: number = this.fromUserslist.indexOf(temp);
      this.fromUserslist.splice(index, 1);
    }
  }

  onChangeCountry(countryId) {
    console.log(countryId)
    if (!countryId) {
      this.cities = null;
      this.cities = null;
    }
    else {

      this.userService.getCities(countryId).subscribe(
        data => this.cities = data
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

  createUser(): void {
    this.userService.createUser(this.user)
      .subscribe(data => {
        alert("User Edited successfully.");
      },
        error => {
          alert("There is some error during editing the User.")
        });
  }
}
