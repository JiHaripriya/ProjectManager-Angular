import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormServiceService } from '../shared/services/form-service.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private router: Router, private formService: FormServiceService) { }

  ngOnInit(): void {
  }

  loadProjectForm() {
    this.formService.isFormStatus.next(1); // 1 -> Popup form
    this.router.navigate(['/projectForm']);
  }

}
