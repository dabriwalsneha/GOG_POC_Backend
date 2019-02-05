import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
export interface Financial_Year {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-estimate',
  templateUrl: './create-estimate.component.html',
  styleUrls: ['./create-estimate.component.css']
})
export class CreateEstimateComponent implements OnInit {
Financial_Year: Financial_Year[] = [
    {value: '2014-2015', viewValue: '2014-2015'},
    {value: '2015-2016', viewValue: '2015-2016'},
    {value: '2016-2017', viewValue: '2016-2017'},
    {value: '2017-2018', viewValue: '2017-2018'},
    {value: '2018-2019', viewValue: '2018-2019'},
  ];
fileUrl;
gia_jilla;
gia_taluka;
gia_gram;
budget_createEstimate_form : FormGroup;


  constructor(private fb: FormBuilder) { }
 
  ngOnInit() {
  this.fileUrl = "../../assets/file_download/Worksheet_in_Budget_Module.xls";
  this.gia_jilla =  "../../assets/file_download/GIA_Jilla_Panchayat_Template.xls";
  this.gia_taluka = "../../assets/file_download/GIA_Taluka_Panchayat_Template.xls";
  this.gia_gram = "../../assets/file_download/GIA_Gram_Panchayat_Template.xls";
this.budget_createEstimate_form = this.fb.group({
 createEstimate_charged_voted: ['']
});

   }

isSelected(){
  if(this.budget_createEstimate_form.value.createEstimate_charged_voted==='yes'){
      return 'yes';
  }
}


}
