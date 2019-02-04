import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, NgForm,FormsModule, ReactiveFormsModule, FormArray,  } from '@angular/forms';

import { UserService } from '../user/user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {


signupForm:FormGroup;
  TotalRow:number;
  
  formaddarray: any;
  myfname: any;
  mylname: any;

  

  constructor(private fb:FormBuilder,private router: Router, private userService: UserService) 
   { }

  ngOnInit() {
    this.signupForm= this.fb.group({
      itemsRows: this.fb.array([this.initItemRows()])
    });

  }

  initItemRows(){
     return this.fb.group({
      __Adrs___hno:[''],
      __Adrs___city:[''],
      __Adrs___state:['']
     })
  }

addrow(){
  const control= <FormArray>this.signupForm.controls['itemsRows'];
  console.log()
  control.push(this.initItemRows());
}

deleteRow(){
  const control= <FormArray>this.signupForm.controls['itemsRows'];
  control.removeAt(this.initItemRows[0]);
}


onFormSubmit(formaddarray:NgForm,myfname:string,mylname:string){
this.userService.onFormSubmit(formaddarray,myfname, mylname)
.subscribe( data => {
  this.formaddarray.value = data,
  this.myfname = data,
  this.mylname = data
});
}

  // constructor() { }

  // ngOnInit() {
  // }

}
