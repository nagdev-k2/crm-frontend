import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.registerForm;
  }

  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  })

  onSubmit() {
    this.http.post(environment.apiUrl+'/users/createUser', this.registerForm.value)
      .subscribe(response => {
        if (response['status'] == 200 && response)
          this.router.navigate(['dashboard'])
      })
  }
}
