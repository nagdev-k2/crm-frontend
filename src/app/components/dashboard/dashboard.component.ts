import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../dialogs/delete/delete.component';
import { SharedService } from '../shared/shared.service';
import { AddUserComponent } from '../dialogs/add-user/add-user.component';
import { AddCompanyComponent } from '../dialogs/add-company/add-company.component';
import { CompaniesService } from '../companies/companies.service';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';

let ELEMENT_DATA: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  type;
  prevType;
  displayedColumns: string[] = [];
  dataSource: any;
  roles: any;
  name: any;
  loading: Boolean;

  constructor(
    private _Activatedroute:ActivatedRoute,
    public dialog: MatDialog,
    private s: SharedService,
    private allCompanies: CompaniesService,
    private allRoles: RolesService,
    private allUsers: UsersService,
  ) {
    this.allCompanies.getData();
  }

  AddcompaniesForm  = new FormGroup({
    profile: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    industry: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  })

  AddemployeesForm  = new FormGroup({
    profile: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
  })

  AddcustomersForm  = new FormGroup({
    profile: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.type = params.get('type');
      if (this.type == 'companies') {
        this.displayedColumns = ['ID','Image', 'Name', 'Location', 'Industry', 'Edit', 'Delete'];
      } else if (this.type == 'customers') {
        this.displayedColumns = ['ID','Image', 'Name', 'Email', 'D.O.B.', 'Location', 'Company', 'Edit', 'Delete'];
      } else {
        this.displayedColumns = ['ID','Image', 'Name', 'Email', 'D.O.B.', 'Location', 'Company', 'Title', 'Edit', 'Delete'];
      }
      this.getData();
    });
  }
  
  ngAfterViewChecked(): void {
    if (this.prevType !== this.type) {
      this.prevType = this.type;
      this.getData();
    }
  }

  getData(): void {
    this.loading = this.allCompanies.isLoading;
    this.roles = this.allRoles.getData();
    if (this.type == 'companies') {
      this.dataSource = this.allCompanies.getData();
      this.loading = this.allCompanies.isLoading;
    } else {
      let users = this.allUsers.getData();
      const currentData = [];
      users.filter((item) => {
      if (item.email != 'admin@admin.com') {
        const role = this.roles.find(i => i._id == item.role);
        if (this.type.includes(role.title))
          currentData.push(item);
        }
      })
      this.dataSource = currentData;
    }
  }

  getCompanyName(n): String{
    const allCompanies = this.allCompanies.getData();
    const company = allCompanies.find((item) => item._id == n);
    return company ? company.name : 'NA'
  }

  deleteElement(element): void{
    this.s.setMessage({data: element, type: this.type});
    this.dialog.open(DeleteComponent);
  }

  editElement(element): void{
    this.s.setMessage({element, type: this.type});
    if(this.type == 'companies') {
      this.dialog.open(AddCompanyComponent);
    } else {
      this.dialog.open(AddUserComponent);
    }
  }

  addElement(): void{
    this.s.setMessage({type: this.type});
    if(this.type == 'companies') {
      this.dialog.open(AddCompanyComponent);
    } else {
      this.dialog.open(AddUserComponent);
    }
  }
}
