import {Component, OnInit} from '@angular/core';
import {PostService} from '../service/post.service';
import {AppError} from '../common/app-error';
import {NotFoundError} from '../common/not-found-error';
import {BandInput} from '../common/band-input';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts;

  constructor(private service: PostService) {
  }

  ngOnInit() {
    this.service.getAll()
      .subscribe(value => this.posts = value);
  }

  createPost(input: HTMLInputElement) {
    const post: any = {
      title: input.value
    };
    input.value = '';

    this.service.create(post)
      .subscribe((newPost: any) => {
          post.id = newPost.id;
          this.posts.splice(0, 0, post);
        },
        (error: AppError) => {
          if (error instanceof BandInput) {
            // this.form.setErrors(error.json());
          } else {
            throw error;
          }
        });
  }

  // Optimistic - Pessimistic thing
  createPostOptimistic(input: HTMLInputElement) {
    const post: any = {title: input.value};
    this.posts.splice(0, 0, post);

    input.value = '';

    this.service.create(post)
      .subscribe((newPost: any) => {
          post.id = newPost.id;
        },
        (error: AppError) => {
          this.posts.splice(0, 1);

          if (error instanceof BandInput) {
            // this.form.setErrors(error.json());
          } else {
            throw error;
          }
        });
  }

  updatePost(post: any) {
    this.service.update(post)
      .subscribe(value => console.log(value));
    // this.http.put(this.url, JSON.stringify(post));
  }

  deletePost(post: any) {
    this.service.delete(post.id)
      .subscribe(() => this.posts.splice(this.posts.indexOf(post), 1),
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            alert('This post has already been deleted.');
          } else {
            throw error;
          }
        }
      );
  }
}
