import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: User;
  posts: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getPersonalData();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['auth']);
  }

  getPersonalData(): void {
    const idUser = localStorage.getItem('idUser');

    console.log(idUser)

    this.userService.getPersonalData(idUser!).subscribe((response) => {
      this.user = response;
    });
  }

}
