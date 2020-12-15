import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  loadProjectForm() {
    this.router.navigate(['/projectForm']);
  }

}
