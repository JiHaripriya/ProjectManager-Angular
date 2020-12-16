import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormServiceService } from '../shared/services/form-service.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private router: Router, private formService: FormServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  loadProjectForm() {
    this.formService.isFormStatus.next(1); // 1 -> Popup form
    this.router.navigateByUrl('/details/add');
  }

}
