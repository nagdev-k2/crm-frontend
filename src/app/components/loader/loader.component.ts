import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompaniesService } from '../companies/companies.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private router: Router, private allCompanies: CompaniesService) {
    this.allCompanies.getAllCompanies();
  }

  ngOnInit(): void {
    const isLoading = this.allCompanies.isLoading;
    if (isLoading) {
      this.hideloader()
      this.router.navigate(['dashboard/companies']);
    }
  }

  hideloader() {
    document.getElementById('loading').style.display = 'none';
  }
}
