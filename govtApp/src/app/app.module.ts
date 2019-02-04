import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app.routing.module';
import {UserService} from './user/user.service';
import {HttpClientModule} from "@angular/common/http";
import {AddUserComponent} from './user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { LoginComponent } from './login/login.component';
import { GetidComponent } from './getid/getid.component';
import { AddressComponent } from './address/address.component';
import { ComponentService } from './service/component.service';
import {MatPaginatorModule, } from '@angular/material/paginator';
import {MatNativeDateModule, MatCheckboxModule, MatSortModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ApiService } from './app.service';
import { WelcomeComponent } from './welcome/welcome.component'
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { Sample1Component } from './sample1/sample1.component';
import { UploadEstimatesComponent } from './upload-estimates/upload-estimates.component';
import { CreateEstimateComponent } from './create-estimate/create-estimate.component';
import { NestedtreeComponent } from './nestedtree/nestedtree.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { AppMaterialModule } from './app-material/app-material.module'
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AddUserComponent,
    EditUserComponent,
    LoginUserComponent,
    LoginComponent,
    GetidComponent,
    AddressComponent,
    WelcomeComponent,
    Sample1Component,
    UploadEstimatesComponent,
    CreateEstimateComponent,
    NestedtreeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ScrollDispatchModule,
    AppMaterialModule,
    MatIconModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [UserService, ComponentService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
