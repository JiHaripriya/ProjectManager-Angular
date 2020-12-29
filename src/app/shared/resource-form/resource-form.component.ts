import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormServiceService } from '../services/form-service.service';
import { ProjectApiService } from '../services/project-api.service';
import { ResourcesModel } from '../services/resources-model.model';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit, OnDestroy {

  buttonText: string;
  checkboxFlag: boolean;
  showRate  = false;
  resourceList: ResourcesModel[];
  selectedProjectResourceList: ResourcesModel[];
  resourceSubcription: Subscription;
  resourceDetails: ResourcesModel;
  selectedResource: number;

  constructor(private router:Router, private formService:FormServiceService, private projectApi: ProjectApiService) {
    if(String(this.router.url).toLocaleLowerCase().includes('edit')) this.selectedResource = JSON.parse(this.router.url.split('/')[5]);
  }

  resourceForm : FormGroup;

  ngOnInit(): void {

    this.resourceSubcription = this.projectApi.fetchResources().subscribe(
      data => {
        this.resourceList = JSON.parse(JSON.stringify(data))
        this.selectedProjectResourceList = this.resourceList.filter((resource) => resource.projectId === JSON.parse(this.router.url.split('/')[2]));
    });

    // Form button text 
    if(String(this.router.url).toLocaleLowerCase().includes('edit')) {
      this.buttonText = 'Update Resource';

      this.resourceSubcription = this.projectApi.fetchResources().subscribe(
        data => {

          this.resourceList = JSON.parse(JSON.stringify(data))
          this.selectedProjectResourceList = this.resourceList.filter((resource) => resource.projectId === JSON.parse(this.router.url.split('/')[2]));
          
          this.resourceDetails = this.selectedProjectResourceList.filter(resource => resource.resourceId == this.selectedResource)[0]

          this.resourceForm.setValue({
            'resourceName': this.resourceDetails.resourceName,
            'resourceEmail': this.resourceDetails.resourceEmail,
            'role': this.resourceDetails.role,
            'checkboxFlag': this.resourceDetails.checkboxFlag,
            'billableAmount': this.resourceDetails.billableAmount
          });
      });
    }
    else {
      this.buttonText = 'Add Resource';
    }

    // Form initialization
    this.resourceForm = new FormGroup({
      'resourceName': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.minLength(2)]),
      'resourceEmail': new FormControl(null, [Validators.required, Validators.email]),
      'role': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      'checkboxFlag': new FormControl(null),
      'billableAmount': new FormControl(0, [Validators.required, Validators.pattern('^[0-9]+$')])
    });

  }

  cancelResource(){
    this.formService.isFormStatus.next(0);
    this.router.navigateByUrl(this.router.url.split('/').slice(0, 4).join('/'));
  }

  onSubmit(){
    
    if(String(this.router.url).toLocaleLowerCase().includes('edit')) {
      // add projectid  id and resource id check
      const resourceIndex = this.resourceList.map((val, index) => val.resourceId === this.selectedResource && val.projectId === Number(this.router.url.split('/')[1])? index : -1).filter(val => val != -1)[0];
      this.resourceList[resourceIndex] = Object.assign(this.resourceDetails, this.resourceForm.value);
      this.projectApi.updateResourceData(this.resourceList);
    }
    else {
      // New resource
      // If billable is not checked, the value is undefined --> set value to false 
      this.resourceForm.value.checkboxFlag = this.resourceForm.value.checkboxFlag === undefined ? false : true;
      const resourceData = Object.assign({}, this.resourceForm.value, { 'resourceId': this.selectedProjectResourceList.length }, { 'projectId': JSON.parse(this.router.url.split('/')[2]) });
      this.projectApi.storeResourceData(resourceData);
      this.projectApi.reloadComponent.next(1);
    }

    this.formService.isFormStatus.next(0);
    this.resourceForm.reset();
    this.router.navigateByUrl(this.router.url.split('/').slice(0, 4).join('/'));
  }

  ngOnDestroy() {
    this.resourceSubcription.unsubscribe();
  }

}
