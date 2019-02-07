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



  users: any;
  user: User[] = [];
  usersforapprove: User[] = [];
  idsForApprove: any = [];
  dataSource: MatTableDataSource<User>;
  selection = new SelectionModel<User>();
  errorMsg: any;
  status: boolean = true;
  value: any;
  page: number;
  count: number;
  nextPage: boolean = true;
  prevPage: boolean = false;


  constructor(private router: Router, private userService: UserService, private sharingService: ComponentService) {
  }


  ngOnInit() {
    this.page = 0;
    this.getusers(this.page);
    this.userService.totalUsers().subscribe(data => {
      this.count = data;
    }, error => {
      this.errorMsg = error;
      if (this.errorMsg.status == 503) {
        this.status = false;
        this.errorMsg = "There is some problem while fetching data. Please try again later.";
      }
    });
  }


  getusers(page) {
    this.userService.getUsers(page)
      .subscribe(data => {
        this.users = data.content;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.sort = this.sort;
        for (let i of this.users) {
          if (i.status == true)
            this.user.push(i);
        }
        this.selection = new SelectionModel<User>(true, this.user);
        if (page == 0) {
          this.prevPage = false;
          this.nextPage = true;
        }
        if (page == Math.floor(this.count / 10)) {
          this.nextPage = false;
        }
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
        else if (this.errorMsg.status == 503) {
          this.status = false;
          this.errorMsg = "There is some problem while fetching data. Please try again later.";
        }
      });

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

  // deleteUser(user: User): void {
  //   this.userService.deleteUser(user)
  //     .subscribe(data => {
  //       this.users = this.users.filter(u => u !== user);
  //     })
  // };

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
        alert("User changes made successfully.");
      },
        error => {
          this.errorMsg = error;
          if (this.errorMsg.status == 400) {
            alert("There is some problem while approving user(s).")
          }
        }
      );
  };

  skip_previous() {
    this.page = 0;
    this.getusers(this.page);
  }
  previous() {
    if (this.page >= 1)
      this.page = this.page - 1;
    else
      this.page = 0;
    this.nextPage = true;
    this.getusers(this.page);
  }
  next() {
    if (Math.floor(this.count / 10) != this.page) {
      this.page = this.page + 1;
      this.nextPage = true;
    }
    else {
      this.page = this.page;
    }
    this.prevPage = true;
    this.getusers(this.page);
  }
  skip_next() {
    if (this.count % 10 == 0)
      this.page = Math.floor(this.count / 10) - 1;
    else
      this.page = Math.floor(this.count / 10);
    this.nextPage = false;
    this.prevPage = true;
    this.getusers(this.page);
  }

}