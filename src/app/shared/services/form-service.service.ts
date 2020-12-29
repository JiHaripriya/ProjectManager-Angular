import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  isFormStatus = new Subject<number>();
  statusFormWorkinghourOverdue = new Subject<number>();
  
  constructor() { }
}
