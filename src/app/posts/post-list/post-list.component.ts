import { Component, OnDestroy, OnInit } from "@angular/core";
import {Subscription} from 'rxjs';

import { Post } from '../post.model'
import { PostsService } from "../posts.service";

@Component({
 selector : 'app-post-list',
 templateUrl : './post-list.component.html',
 styleUrls : ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  //  posts = [
  //    {title:"First post", content:"This is the first post\'s"},
  //    {title:"second post", content:"This is the second post\'s"},
  //    {title:"Third post", content:"This is the third post\'s"},
  //  ];

 posts: Post[] = [];;
 private postSub: Subscription;

 constructor(public postsService: PostsService) { }

 ngOnInit() {
   this.posts = this.postsService.getPosts();
   this.postSub  = this.postsService.getPostUpdateListener()
   .subscribe((posts: Post[])=>{
      this.posts = posts;
   });
 }

 ngOnDestroy() {
   this.postSub.unsubscribe();
 }
}
