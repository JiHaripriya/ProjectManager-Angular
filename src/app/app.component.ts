import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormServiceService } from './shared/services/form-service.service';
import { ProjectApiService } from './shared/services/project-api.service';
import { ProjectsModel } from './shared/services/projects-model.model';

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
  projects: ProjectsModel[];
  
  constructor(
    private formService: FormServiceService, 
    private router: Router,
    private projectApi: ProjectApiService) {}

  ngOnInit() {

    this.subscription = this.formService.isFormStatus.subscribe(
      status => {
        this.isForm = status;
    })

    this.projectApi.fetchProjects().subscribe(
      data => {
        this.projects = JSON.parse(JSON.stringify(data.reverse()))
    });

    // Reload component : Add new project
    this.projectApi.reloadComponent.subscribe(
      response => response == 1 ? this.ngOnInit() : 0
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editProjectForm(){
    this.formService.isFormStatus.next(1);
    const index = this.router.url.split('/').slice(-2, -1).join('');
    this.router.navigateByUrl(`/projects/${index}/details/edit`);
  }

}
