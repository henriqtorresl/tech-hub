import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: User;
  posts: Post[] = [];
  loadedPosts: boolean = false;
  idUser!: string;
  isMyProfile!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.getIdUser();
    console.log('id do usuario: ', this.idUser);
    this.verifyProfile();
    this.getPersonalData();
    this.getUserPosts();
  }

  getIdUser(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe((response) => {
      const { id } = response;
      this.idUser = id;
    });
  }

  verifyProfile(): void {
    this.isMyProfile = this.idUser == localStorage.getItem('idUser') ? true : false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['auth']);
  }

  sendMessage(): void {
    // Logica de enviar mensagem
  }

  getPersonalData(): void {
    this.userService.getPersonalData(this.idUser).subscribe((response) => {
      this.user = response;
    });
  }

  getUserPosts(): void {
    this.postService.getUserPosts(this.idUser!).subscribe((response) => {
      this.posts = response;
      this.loadedPosts = true;
    },
      () => {
        this.loadedPosts = true;

      });
  }

}
