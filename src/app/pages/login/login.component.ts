import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlDirective, Validators } from '@angular/forms';
import { ifStatement } from '@babel/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
  
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorText: string;

  constructor() { 
    
  }

  ngOnInit(): void {
    // set error text to ''
    this.errorText = '';
    // define formgroup for login - pass validators in
    this.loginForm = new FormGroup({
      user: new FormControl('', Validators.compose([ 
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
  get username() { return this.loginForm.get('user').value; }
  get password() { return this.loginForm.get('pass').value; }
  

  public login(loginData) {
    if (this.loginForm.valid) {
      console.log(loginData);
      this.loginForm.reset();
      this.errorText = '';
    } else {
      this.errorText = 'username & password have to be greater than 5 characters but less than 100';
      console.log(this.errorText);
    }   
  }
}
