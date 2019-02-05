import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service'

export interface Department {
  value: string;
  viewValue: string;
}

export interface Financial_Year {
  value: string;
  viewValue: string;
}

export interface Demand {
  value: string;
  viewValue: string;
}

export interface Estimation_Form {
  viewValue: string;
  value: string;
}

@Component({
  selector: 'app-upload-estimates',
  templateUrl: './upload-estimates.component.html',
  styleUrls: ['./upload-estimates.component.css']
})
export class UploadEstimatesComponent implements OnInit {

budget_search_details_table : boolean;
budget_uploadEstimate_forms: FormGroup;
message: any;

  constructor(private fb : FormBuilder, private router: Router, private data: DataService) { }

  ngOnInit() {
    this.budget_uploadEstimate_forms = this.fb.group({
      department_value: [''],
      financial_year_value:[''],
      demand_value:[''],
      estimation_form_value:['']
    });
  }


  Department: Department[] = [
    {value: 'TEST-1', viewValue: 'TEST-1'},
    {value: 'TEST-2', viewValue: 'TEST-2'},
    {value: 'TEST-3', viewValue: 'TEST-3'}
  ];

 Financial_Year: Financial_Year[] = [
    {value: '2014-2015', viewValue: '2014-2015'},
    {value: '2015-2016', viewValue: '2015-2016'},
    {value: '2016-2017', viewValue: '2016-2017'},
    {value: '2017-2018', viewValue: '2017-2018'},
    {value: '2018-2019', viewValue: '2018-2019'},
  ];

 Demand: Demand[] = [
    {value: '079:Relief On Account Natural Calamities', viewValue: '079:Relief On Account Natural Calamities'},
    {value: '084:Non-Residential Buildings', viewValue: '084:Non-Residential Buildings'},
    {value: '085:Residential Buildings', viewValue: '085:Residential Buildings'},
    {value: '091:Social Justice And Empowerment Department', viewValue: '091:Social Justice And Empowerment Department'},
    {value: '093:Welfare Of Scheduled Tribes', viewValue: '093:Welfare Of Scheduled Tribes'},
    {value: '094:Other Expenditure Pertaining To Social Justice And Empowerment Department', viewValue: '094:Other Expenditure Pertaining To Social Justice And Empowerment Department'},
    {value: '095:Scheduled Castes Sub Plan', viewValue: '095:Scheduled Castes Sub Plan'},
    {value: '096:Tribal Area Sub-Plan', viewValue: '096:Tribal Area Sub-Plan'}
  ];
 Estimation_Form: Estimation_Form[] = [
    { value: 'Administrative Branch', viewValue: 'Administrative Branch'},
    { value: 'DOH - Director of Horticulture', viewValue:'DOH - Director of Horticulture'},
    { value:'HOD1', viewValue:'HOD1'},
    { value: 'HOD2', viewValue:'HOD2'}
  ];


onSubmit(){
  this.budget_search_details_table = true;
  console.log("search Clicked");
  console.log(this.budget_uploadEstimate_forms.value);
  this.data.changemessage(this.budget_uploadEstimate_forms.value);
}

CreateEstimation_onclick(){
  console.log("Create Estimation is Clicked");
  this.router.navigate(['/nestedtree/createEstimate']);
}

// CreateConnection_onclick(){
// this.router.navigate(["/nestedtree/createCorrection"]);
// }

}