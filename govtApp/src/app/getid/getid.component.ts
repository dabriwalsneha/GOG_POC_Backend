import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { first } from 'rxjs/operators';
import { pipe, Observable } from 'rxjs';
import { Employee } from 'src/app/models/emp.model';
import { ComponentService } from '../service/component.service';
import { Address } from '../models/address1.model';

@Component({
  selector: 'app-getid',
  templateUrl: './getid.component.html',
  styleUrls: ['./getid.component.css']
})
export class GetidComponent implements OnInit {

getid:FormGroup;
mydetails: Employee;
addresses: Address[];
status:boolean = false;
empdata : Employee = new Employee;
  constructor( private fb: FormBuilder, private userService: UserService, private sharingService: ComponentService) { }
  employees: Employee;

  ngOnInit() {
    this.getid = this.fb.group({
      getmyid:['']
    })

  }

get f(){
  return  this.getid.controls;
}

onSubmit(){
  this.status=true;

this.userService.postidData(this.f.getmyid.value)
.subscribe(data => { 
  this.mydetails = data;
  this.addresses = this.mydetails.addr;
});
};

}


