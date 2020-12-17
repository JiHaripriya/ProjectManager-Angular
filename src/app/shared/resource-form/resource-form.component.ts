import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormServiceService } from '../services/form-service.service';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css']
})
export class ResourceFormComponent implements OnInit {

  buttonText: string;
  checkboxFlag: boolean;
  showRate  = false;

  constructor(private router:Router, private formService:FormServiceService) { }

  resourceForm : FormGroup;

  ngOnInit(): void {

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
    this.router.navigate(['../resources']);
  }

  onSubmit(){
    console.log(this.resourceForm);
    this.resourceForm.reset();
  }

}
