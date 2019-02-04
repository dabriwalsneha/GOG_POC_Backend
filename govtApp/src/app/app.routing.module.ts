import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { LoginComponent } from './login/login.component';
import { GetidComponent } from './getid/getid.component';
import { AddressComponent } from './address/address.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NestedtreeComponent } from './nestedtree/nestedtree.component';
import { Sample1Component } from './sample1/sample1.component';
import { UploadEstimatesComponent } from './upload-estimates/upload-estimates.component';
import { CreateEstimateComponent } from './create-estimate/create-estimate.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },

  { path: 'edit', component: EditUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login_user', component: LoginUserComponent },
  { path: 'users', component: UserComponent },
  { path: 'add_user', component: AddUserComponent },
  { path: 'gog', component: AddressComponent },
  { path: 'getid', component: GetidComponent },
  { path: 'welcome', component: WelcomeComponent },

  { path: 'nestedtree', component: NestedtreeComponent , children:[
    { path: '', component: Sample1Component,  pathMatch:'full'},
    { path: 'uploadEstimates', component: UploadEstimatesComponent},
     { path: 'createEstimate', component: CreateEstimateComponent}     
    ] 
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
