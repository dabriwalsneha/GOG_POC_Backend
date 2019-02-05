import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { identifierModuleUrl } from '@angular/compiler';
import { ComponentService } from '../service/component.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { element } from '@angular/core/src/render3';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'contact', 'age', 'city',
    'gender', 'dob', 'designation', 'status', 'approve'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  users: User[];
  user: User[] = [];
  usersforapprove: any = [];
  idsForApprove: any = [];
  dataSource: MatTableDataSource<User>;
  selection = new SelectionModel<User>();
  errorMsg: any;
  status: boolean = true;
  value: any;
  showSpinner: boolean = false;


  constructor(private router: Router, private userService: UserService, private sharingService: ComponentService) {
  }


  ngOnInit() {
    this.showLoadingSpinner();
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data;
        this.hideLoadingSpinner();
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        for (let i of this.users) {
          if (i.status == true) {
            this.user.push(i);
          }
        }
        this.selection = new SelectionModel<User>(true, this.user);
      }, error => {
        this.errorMsg = error;
        if (this.errorMsg.error.error_description != undefined) {
          this.status = false;
          this.errorMsg = error.error.error_description
        }
        else if (this.users == undefined && this.errorMsg == undefined) {
          this.status = false;
          this.errorMsg = "No Records Found!";
        }
        else if(this.errorMsg.status == 503){
          this.status = false;
          this.errorMsg ="There is some problem while fetching data. Please try again later.";
        }
      });
  }


  showLoadingSpinner() {
    this.showSpinner = true;
  }

  hideLoadingSpinner() {
    this.showSpinner = false;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkAll() {
    if (!this.isAllSelected()) {
      this.usersforapprove = [];
      for (let i of this.users) {
        this.usersforapprove.push(i)
      }
    }
    else
      this.usersforapprove = [];
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user)
      .subscribe(data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  updateUser(user: User): void {
    this.idsForApprove = [];
    for (let i of this.users) {
      if (i.selector) {
        this.idsForApprove.push(i.id);
      }
    }
    this.userService.updateUser(this.idsForApprove)
      .subscribe(data => {
        this.idsForApprove = data;
      });
  };

  editUser(user: User) {
    this.sharingService.setData(user);
    this.router.navigateByUrl('/edit');
  }

  toggleVisibility(e: User) {
    this.value = this.selection.isSelected(e);
    if (this.value == false) {
      e.status = true;
      this.usersforapprove.push(e);
    }
    else {
      e.status = false;
      this.usersforapprove.push(e);
    }
  }

  updateUserbyParam() {
    this.userService.updateUserbyParam(this.usersforapprove)
      .subscribe(data => {
        this.usersforapprove = data;
        alert("User Approved successfully.");
      },
      error => {
        this.errorMsg = error;
        if (this.errorMsg.status == 400) {
          alert("There is some problem while approving user(s).")
        }
      }
      );
  };

}