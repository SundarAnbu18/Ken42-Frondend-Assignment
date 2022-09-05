import { Router } from '@angular/router';
import { User } from './../shared/user.model';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
declare var M: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers:[UserService]
})
export class UserProfileComponent implements OnInit {
  userDetails;
  constructor(public userService: UserService,private router: Router) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();

  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.userService.selectedUser = {
      _id: "",
      name: "",
      designation: "",
      company: "",
      salary: '',



    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.userService.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        console.log(res)
        console.log("successfully")
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.userService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        console.log(res)
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshEmployeeList() {
    this.userService.getEmployeeList().subscribe((res) => {
      this.userService.users = res as User[];
    });
  }

  onEdit(user:User ) {
    this.userService.selectedUser = user;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.userService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        console.log(res)
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }


}
