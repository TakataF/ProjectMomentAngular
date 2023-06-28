import { Component } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { MomentsService } from 'src/app/services/moments.service';
import { MessagesService } from 'src/app/services/messages.service';

import { Moment } from 'src/app/Moments';

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

  
  constructor(
    private momentService: MomentsService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router : Router
    ) {}

  ngOnInit(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => (this.moment = item.data));
    //id da URL
  }

  async removeHandler(id: number){
    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.add("Momento Excluido com Sucesso!");

    this.router.navigate(['/']);

  }
}
