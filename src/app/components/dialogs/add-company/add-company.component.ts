import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CompaniesService } from '../../companies/companies.service';

import { SharedService } from '../../shared/shared.service';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  type: any;
  data: any;
  buttonName: string;

  constructor(
    private s: SharedService,
    private dialogRef: MatDialogRef<AddUserComponent>,
    private allCompanies: CompaniesService
  ) { }

  ngOnInit(): void {
    this.type = this.s.getMessage()['type'];
    if (this.s.getMessage() && this.s.getMessage()['element'])  {
      this.data = this.s.getMessage()['element'];
      this.buttonName = 'Update';
      this.AddCompanyForm.setValue(this.data);
      this.s.setMessage({});
    } else {
      this.buttonName = 'Add';
    }
  }

  AddCompanyForm  = new FormGroup({
    _id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    profile: new FormControl('', Validators.required),
    industry: new FormControl('', Validators.required),
  })

  onSubmit(): void{
    const company = this.AddCompanyForm.value;
    if (this.buttonName == 'Add') {
      company['status'] = 'active';
      company['profile'] = 'http://localhost:3000/images/def.jpeg';
      delete company['_id'];
      this.allCompanies.createCompany(company)
    } else {
      this.allCompanies.updateCompany(company)
    }
      this.dialogRef.close();
    }
}
