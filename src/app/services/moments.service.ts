import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Moment } from '../Moments';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MomentsService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`
  constructor(private http: HttpClient) { }


  createMoment(formData: FormData): Observable<FormData>{
    return this.http.post<FormData>(this.apiUrl, formData)
  }
}
