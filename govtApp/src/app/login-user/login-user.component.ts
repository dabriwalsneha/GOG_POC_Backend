import { Component, OnInit } from '@angular/core';
import { ComponentService } from '../service/component.service';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  constructor(private router: Router , private userService: UserService, private sharingService: ComponentService) {
    this.dateString = new Date().toDateString();
   }

  login: any;
  welcome:boolean;
  loginvar : any;
  errorMsg: any;

  dateString : String;

  title = 'Government of Gujarat';

  logout(){
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {

    this.userService.loginUser(this.sharingService.getUser())
      .subscribe(data => {
        this.loginvar = data;
        this.login = this.loginvar['user'];
      },
      error => {
        this.errorMsg = error;
        if (this.errorMsg.status == 400) {
          this.sharingService.setStatus(true);
          //this.router.navigateByUrl("/login");
        }
      });
    this.welcome = this.sharingService.getWel();

    
  }

}
