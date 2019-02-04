import { Component } from '@angular/core';
import { ComponentService } from './service/component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private sharingService: ComponentService) {

  }

  createUser(): void { 
    this.sharingService.setData("login");   
    // this.userService.createUser(this.user)
    //     .subscribe( data => {
    //       alert("User created successfully.");       
    //     });
  };

}
