import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { CompaniesService } from '../../companies/companies.service';
import { RolesService } from '../../roles/roles.service';
import { SharedService } from '../../shared/shared.service';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  buttonName: String;
  type: String;
  data: any;
  constructor(
    private http: HttpClient,
    private s: SharedService,
    private allRoles: RolesService,
    private allUsers: UsersService,
    private allCompanies: CompaniesService,
    private dialogRef: MatDialogRef<AddUserComponent>
  ) { }

  ngOnInit(): void {
    this.type = this.s.getMessage()['type'];
    if (this.s.getMessage() && this.s.getMessage()['element'])  {
      this.data = this.s.getMessage()['element'];
      this.buttonName = 'Update';
      this.AddUserForm.setValue(this.data);
      this.s.setMessage('');
    } else {
      this.buttonName = 'Add';
    }
  }

  AddUserForm  = new FormGroup({
    _id: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    profile: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required)
  })

  getUserRole(): String{
    const allRoles = this.allRoles.getData();
    const userRole = allRoles.find((item) => this.type.includes(item.title));
    return userRole._id;
  }

  getCompanyId(name): String{
    if (this.type == 'customers')
      return 'NA';
    const allCompanies = this.allCompanies.getData();
    const company = allCompanies.find((item) => item.name == name);
    return company ? company._id : 'NA';
  }

  onSubmit(): void{
    const user = this.AddUserForm.value;
    let endpoint = 'updateUser';
    if (this.buttonName == 'Add') {
      user['status'] = 'active';
      user['profile'] = 'http://localhost:3000/images/def.jpeg';
      user['role'] = this.getUserRole();
      user['company'] = this.getCompanyId(user['company']);
      
      delete user['_id'];
      endpoint = 'createUser';
    }
    this.http.post(environment.apiUrl+`/users/${endpoint}`, {user: user})
      .subscribe(response => {
        if (response['status'] == 200 && response) {
          window.location.reload();
        }
      })
      this.dialogRef.close();
    }
}
