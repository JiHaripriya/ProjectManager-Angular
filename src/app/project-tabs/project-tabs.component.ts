import { Component, OnInit } from '@angular/core';
import { ProjectApiService } from '../shared/services/project-api.service';

@Component({
  selector: 'app-project-tabs',
  templateUrl: './project-tabs.component.html',
  styleUrls: ['./project-tabs.component.css']
})
export class ProjectTabsComponent implements OnInit {

  projectIndex: string = '0';
  constructor(private projectApi: ProjectApiService) { }

  ngOnInit(): void {
    this.projectApi.selectedProjectId.subscribe(
      index => {
        this.projectIndex = String(index)
        console.log(this.projectIndex)
      }
    )
  }
}
