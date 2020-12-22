import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectApiService } from 'src/app/shared/services/project-api.service';
import { ProjectsModel } from 'src/app/shared/services/projects-model.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public projects: ProjectsModel[] = [];
  selectedProjectDetails:ProjectsModel;

  constructor(private projectApi: ProjectApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.projectApi.fetchProjects().subscribe(
      data => {
        this.projects = JSON.parse(JSON.stringify(data.reverse()))
        this.selectedProjectDetails = this.projects[this.router.url.split('/')[2]] // Initial setup
    });

    // Reload component : Add new project
    this.projectApi.reloadComponent.subscribe(
      response => response == 1 ? this.ngOnInit() : 0
    )
    this.projectApi.selectedProjectIndex.subscribe(
      index => {
        this.selectedProjectDetails = this.projects[Number(index)]
      }
    )
  }
}
