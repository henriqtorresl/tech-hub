import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { CreateConversation, CreateConversationResponse } from 'src/app/interfaces/conversations';
import { Post } from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ConversationService } from 'src/app/services/conversation.service';
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
    private postService: PostService,
    private conversationService: ConversationService
  ) { }

  ngOnInit(): void {
    this.getIdUser();
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
    const senderUser: number = Number(localStorage.getItem('idUser'));
    const body: CreateConversation = {
      usuario_1: senderUser,
      usuario_2: Number(this.idUser)
    }

    this.conversationService.insertIfNotExists(body).pipe(
      switchMap((response: CreateConversationResponse) =>
        this.conversationService.getOne(response.id_conversa, senderUser)
      )
    ).subscribe((conversation) => {
      const queryParams: Params = {
        ['openConversation']: true
      }

      // Conteudo que vai ser emitido pelo observable...
      this.conversationService.shareConversation(conversation);
      this.router.navigate(['chat'], { queryParams });
    });
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
