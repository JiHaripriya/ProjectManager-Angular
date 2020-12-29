import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  isFormStatus = new Subject<number>();
  selectedResource = new Subject<number>();
  
  constructor() { }
}
