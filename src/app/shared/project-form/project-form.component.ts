import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormServiceService } from '../services/form-service.service';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  slider: string = '0';
  subscription: Subscription;
  buttonText: string;
  showSlider = false;
  projectForm: FormGroup;
  startDateError =  false;
  endDateError = false;
  
  constructor(private formService: FormServiceService, private router: Router) {}

  ngOnInit(): void {
    if(String(this.router.url).toLocaleLowerCase().includes('edit')){
      this.buttonText = 'Update Project';
      this.showSlider = true;
    }
    else {
      this.buttonText = 'Create Project';
      this.showSlider = false;
    }

    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, Validators.required),
      'clientName': new FormControl(null, Validators.required),
      'startDate': new FormControl(null, Validators.required),
      'endDate': new FormControl(null, Validators.required),
      'range': new FormControl(null),
      'description': new FormControl(null, Validators.required) 
    })
  }

  onSubmit(){

    // Date validations
    // Start date less than current date check -> Invalid start date
    if(new Date(this.projectForm.root.get('startDate').value) < new Date()) {
      this.startDateError = true;
    }
    else this.startDateError = false;
    // End date less than current start date check -> Valid end date
    if(new Date(this.projectForm.root.get('endDate').value) <= new Date(this.projectForm.root.get('startDate').value)) {
      this.endDateError = true;
    }
    else this.endDateError = false;

    // Submit actual form
    if((this.projectForm.valid) && (!this.endDateError) && (!this.startDateError)) {
      alert('Form submitted successfully');
      this.projectForm.reset();
    }
  }

  cancelProject(){
    this.formService.isFormStatus.next(0);
    this.router.navigate(['/details']);
  }

}
