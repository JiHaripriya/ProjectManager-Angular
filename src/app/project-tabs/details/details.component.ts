import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectApiService } from 'src/app/shared/services/project-api.service';
import { ProjectsModel } from 'src/app/shared/services/projects-model.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  public projects: ProjectsModel[] = [];
  selectedProjectDetails:ProjectsModel;
  selectedId = 0;
  loading: boolean;
  
  cardSubjectSubscription : Subscription;
  projectIndexSubjectSubscription : Subscription;
  reloadComponentSubjectSubscription : Subscription;
  projectsSubscription : Subscription;

  constructor(private projectApi: ProjectApiService,
    private router: Router) { }

  ngOnInit(): void {

    this.loading = true;

    this.projectsSubscription = this.projectApi.fetchProjects().subscribe(
      data => {
        this.projects = JSON.parse(JSON.stringify(data.reverse()))
        this.selectedProjectDetails = this.projects[this.router.url.split('/')[2]] // Initial setup
        this.loading = false;
    });

    // Reload component : Add new project
    this.reloadComponentSubjectSubscription = this.projectApi.reloadComponent.subscribe(
      response => response == 1 ? this.ngOnInit() : 0
    )

    // Project switch
    this.cardSubjectSubscription = this.projectApi.selectedCardIndex.subscribe(
      index => {
        this.selectedProjectDetails = this.projects[index];
        this.loading = false;
    })

    // Get project id
    this.projectIndexSubjectSubscription = this.projectApi.selectedProjectId.subscribe(
      index => console.log('Inside Details tab: ' + index)
    )
  }

  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
    this.projectIndexSubjectSubscription.unsubscribe();
    this.cardSubjectSubscription.unsubscribe();
    this.reloadComponentSubjectSubscription.unsubscribe();
  }
}
