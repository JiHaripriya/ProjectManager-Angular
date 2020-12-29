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
  resourceSubcription: Subscription;

  constructor(private router:Router, private formService:FormServiceService, private projectApi: ProjectApiService) { }

  resourceForm : FormGroup;

  ngOnInit(): void {

    this.resourceSubcription = this.projectApi.fetchResources().subscribe(
      data => {
        this.resourceList = JSON.parse(JSON.stringify(data));
        console.log('Form comp', this.resourceList)
    });


    // Form button text 
    if(String(this.router.url).toLocaleLowerCase().includes('edit')) {
      this.buttonText = 'Update Resource';
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
    console.log(this.resourceForm.value);
    if(String(this.router.url).toLocaleLowerCase().includes('edit')) {

    }
    else {
      // New resource
      // If billable is not checked, the value is undefined --> set value to false 
      this.resourceForm.value.checkboxFlag = this.resourceForm.value.checkboxFlag === undefined ? false : true;
      const resourceData = Object.assign({}, this.resourceForm.value, { 'resourceId': this.resourceList.length }, { 'projectId': JSON.parse(this.router.url.split('/')[2]) });
      console.log(resourceData);
      this.projectApi.storeResourceData(resourceData);
      this.projectApi.reloadComponent.next(1);
      this.router.navigateByUrl(this.router.url.split('/').slice(0, 4).join('/'));
    }

    this.formService.isFormStatus.next(0);
    this.resourceForm.reset();
  }

  ngOnDestroy() {
    this.resourceSubcription.unsubscribe();
  }

}
