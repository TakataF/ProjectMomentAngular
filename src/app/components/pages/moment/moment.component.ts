import { Component } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validator, FormGroupDirective, Form, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';

import { MomentsService } from 'src/app/services/moments.service';
import { MessagesService } from 'src/app/services/messages.service';
import { CommentService } from 'src/app/services/comment.service';

import { Moment } from 'src/app/Moments';
import { Comment } from 'src/app/Comment';

import {faTimes, faEdit} from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!: FormGroup;


  
  constructor(
    private momentService: MomentsService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router : Router,
    private commentService: CommentService
    ) {}

  ngOnInit(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => (this.moment = item.data));
    //id da URL

    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number){
    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.add("Momento Excluido com Sucesso!");

    this.router.navigate(['/']);
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }

    const data: Comment = this.commentForm.value;

    data.momentId = Number(this.moment!.id);

    await this.commentService
      .createComment(data)
      .subscribe((comment) => this.moment!.comments!.push(comment.data));

    this.messagesService.add(`Comentário adicionado!`);

    this.commentForm.reset();

    formDirective.resetForm();
  }
}
