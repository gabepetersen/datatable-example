import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public activeUser: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // the the current user if there is one
    this.authService.checkUser().subscribe((user) => {
      this.activeUser = user;
    })
  }

  public async logout() {
    this.router.navigate(['/login'])
    await this.authService.logout();
  }

}
