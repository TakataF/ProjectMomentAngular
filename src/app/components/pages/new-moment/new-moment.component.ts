import { Component } from '@angular/core';

import { Moment } from 'src/app/Moments';

import { MomentsService } from 'src/app/services/moments.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {
  btnText= 'Compartilhar';

  constructor(private momentService: MomentsService) {
    
    }

  async createHandler(moment: Moment){
    const formData = new FormData();

    formData.append('title', moment.title)
    formData.append('description', moment.description)

    if(moment.image){
      formData.append('image', moment.image,);
    }

    //todo

  await this.momentService.createMoment(formData).subscribe();

    //exibir msg

    //redirect
  }
}
