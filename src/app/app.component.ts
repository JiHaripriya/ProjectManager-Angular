import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormServiceService } from './shared/services/form-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  isForm: number;
  subsciption: Subscription;
  constructor(private formService: FormServiceService) {}

  ngOnInit() {
    this.subsciption = this.formService.isFormStatus.subscribe(
      status => {
        this.isForm = status;
        console.log(status)
      }
    )
  }

  ngOnDestroy() {
    this.subsciption.unsubscribe();
  }

}
