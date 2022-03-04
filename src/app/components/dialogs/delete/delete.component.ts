import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CompaniesService } from '../../companies/companies.service';
import { SharedService } from '../../shared/shared.service';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  data: any;
  type: String;
  constructor(
    private http: HttpClient,
    private s: SharedService,
    private dialogRef: MatDialogRef<DeleteComponent>,
    private allCompanies: CompaniesService,
    private allUsers: UsersService,
    ) { }

  ngOnInit(): void {
    if(this.s.getMessage()){
      this.data = this.s.getMessage()['data'];
      this.type = this.s.getMessage()['type'];
      this.s.setMessage('')
    }
  }

  confirm(): void {
    this.data['status'] = 'inactive';
    if (this.type == 'companies') {
      this.allCompanies.updateCompany(this.data);
    } else {
      this.allUsers.updateUser(this.data)
    }
    this.dialogRef.close();
  }
}
