import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormServiceService } from 'src/app/shared/services/form-service.service';
import { ProjectApiService } from 'src/app/shared/services/project-api.service';
import { ResourcesModel } from 'src/app/shared/services/resources-model.model';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit, OnDestroy {

  isDelete = false;
  loading: boolean;

  resourceLength = 0;

  selectedProjectResources:ResourcesModel[];
  resources:ResourcesModel[];
  updatedResources: ResourcesModel[];

  projectsSubscription : Subscription;
  reloadSubscription: Subscription;
  
  constructor(private router: Router, private formService: FormServiceService, private projectApi: ProjectApiService) { }

  ngOnInit(): void {

    this.loading = true;

    this.projectsSubscription = this.projectApi.fetchResources().subscribe(
      data => {
        this.resources = JSON.parse(JSON.stringify(data))
        
        this.selectedProjectResources = this.resources.filter((resource) => resource.projectId === JSON.parse(this.router.url.split('/')[2]))
        this.resourceLength = this.selectedProjectResources.length;

        this.reloadSubscription = this.projectApi.reloadComponent.subscribe(response => response == 1 ? this.ngOnInit() : 0)

        this.loading = false;
    });
  }

  loadResourceForm() {
    this.isDelete = false;
    this.formService.isFormStatus.next(1);
    this.router.navigateByUrl(`${this.router.url}/add`);
  }

  editResource(resourceId: number){
    this.isDelete = false;
    this.formService.isFormStatus.next(1);
    this.router.navigateByUrl('/resources/edit');
  }

  deleteResource(resourceId: number) {
    this.updatedResources = this.resources.filter((resource) => resource.resourceId !== resourceId)
    this.projectApi.updateResourceData(this.updatedResources)
    this.router.navigateByUrl(`${this.router.url}`);
  }

  cancelDeleteResource(){
    this.isDelete = false;
    this.formService.isFormStatus.next(0);
    this.router.navigateByUrl('/resources');
  }

  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
    this.reloadSubscription.unsubscribe();
  }
}
