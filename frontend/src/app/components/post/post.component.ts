import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  @Input() haveTitle!: boolean;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  navigateToUserProfile(idUser: number): void {
    this.router.navigate(['/profile', idUser]);
  }

}
