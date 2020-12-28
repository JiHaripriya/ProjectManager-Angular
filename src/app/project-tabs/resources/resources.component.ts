import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormServiceService } from 'src/app/shared/services/form-service.service';
import { ProjectApiService } from 'src/app/shared/services/project-api.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit, OnDestroy {

  isDelete = false;
  projectIndexSubjectSubscription : Subscription;
  
  constructor(private router: Router, private formService: FormServiceService, private projectApi: ProjectApiService) { }

  ngOnInit(): void {
    // Get project id
    this.projectIndexSubjectSubscription = this.projectApi.selectedProjectId.subscribe(
      index => console.log('Inside resources tab: ' + index)
    )
  }

  loadResourceForm() {
    this.isDelete = false;
    this.formService.isFormStatus.next(1);
    this.router.navigateByUrl('/resources/add');
  }

  editResource(){
    this.isDelete = false;
    this.formService.isFormStatus.next(1);
    this.router.navigateByUrl('/resources/edit');
  }

  deleteResource() {
    this.isDelete = true;
    this.formService.isFormStatus.next(1);
  }

  cancelDeleteResource(){
    this.isDelete = false;
    this.formService.isFormStatus.next(0);
    this.router.navigateByUrl('/resources');
  }

  ngOnDestroy() {
    this.projectIndexSubjectSubscription.unsubscribe();
  }
}
