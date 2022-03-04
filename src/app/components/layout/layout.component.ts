import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})

export class LayoutComponent implements OnInit {
  isAuthenticated: Boolean;
  selected: String;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) this.isAuthenticated = true;
    else this.isAuthenticated = false;
    this.selected = 'companies';
  }

  onSelect(type): void{
    this.selected = type
  }

  logout(): void {
    localStorage.setItem('user', null);
  }
}
