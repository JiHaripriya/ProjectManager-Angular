import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormServiceService } from '../shared/services/form-service.service';
import { PathRoutingService } from '../shared/services/path-routing.service';
import { ProjectApiService } from '../shared/services/project-api.service';
import { ProjectsModel } from '../shared/services/projects-model.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {

  public projects: ProjectsModel[] = [];
  selectedId = 0;

  projectsSubscription : Subscription;
  reloadComponentSubjectSubscription : Subscription;

  constructor(private router: Router, 
    private formService: FormServiceService, 
    private path: PathRoutingService,
    private projectApi: ProjectApiService) { }

  ngOnInit(): void { 
    this.projectApi.fetchProjects().subscribe(
      data => {
        this.projects = data.reverse()
        // Highlight selected
        this.projectApi.selectedProjectId.subscribe(
          index => this.selectedId = index
      )
    });

    // Reload component : Add new project
    this.projectApi.reloadComponent.subscribe(
      response => response === 1 ? this.ngOnInit() : 0
    )
  }

  loadProjectForm() {
    this.formService.isFormStatus.next(1); // 1 -> Popup form
    this.path.currentPath.next(this.router.url); // save current path to re-direct
    this.router.navigateByUrl('/projects/add');
  }

  getProjectIndex(projectId: number) {
    this.projectApi.selectedProjectId.next(projectId); // for project details fetch
    this.router.navigateByUrl(`projects/${projectId}/details`);
  }

  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
    this.reloadComponentSubjectSubscription.unsubscribe();
  }

}