import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
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
  isProjectDetails = false;
  subscription: Subscription;
  constructor(private formService: FormServiceService, private router: Router) {}

  ngOnInit() {

    this.subscription = this.formService.isFormStatus.subscribe(
      status => {
        this.isForm = status;
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editProjectForm(){
    this.formService.isFormStatus.next(1);
    this.router.navigateByUrl('/details/edit');
  }

}
