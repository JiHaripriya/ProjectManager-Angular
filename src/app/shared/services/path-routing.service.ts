import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PathRoutingService {

  currentPath = new Subject<string>();
  
  constructor() { }
}
