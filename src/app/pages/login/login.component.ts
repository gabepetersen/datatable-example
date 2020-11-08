import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
  
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorText: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // set error text to ''
    this.errorText = '';
    // define formgroup for login - pass validators in
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([ 
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.required
      ])),
      pass: new FormControl('', Validators.compose([   
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.required
      ]))
    })
  }

  // Define get methods for login form
  get email() { return this.loginForm.get('email').value; }
  get password() { return this.loginForm.get('pass').value; }
  

  public login(loginData) {
    // if the form is valid 
    if (this.loginForm.valid) {
      // reset the form and errortext
      this.loginForm.reset();
      this.errorText = '';
      // login
      this.authService.login(loginData.email, loginData.pass).then((res) => {
        if (res.user) {
          this.router.navigate(['/enter']);
        }
      }).catch((error) => {
        console.log(error);
        this.errorText = error;
      })

    } else {
      this.errorText = 'email & password have to be greater than 5 characters but less than 100';
      console.log(this.errorText);
    }   
  }
}
