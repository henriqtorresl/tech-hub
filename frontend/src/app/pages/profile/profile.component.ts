import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
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
  idUser!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getIdUser();
    this.getPersonalData();
  }

  getIdUser(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe((response) => {
      const { id } = response;
      this.idUser = id;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['auth']);
  }

  getPersonalData(): void {
    this.userService.getPersonalData(this.idUser).subscribe((response) => {
      this.user = response;
    });
  }

}
