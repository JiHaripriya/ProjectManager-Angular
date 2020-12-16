import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

    let projectName = '';
    let clientName = '';
    let startDate = '';
    let endDate = '';
    let range = '';
    let description = '';

    this.projectForm = new FormGroup({
      'projectName': new FormControl(projectName, Validators.required),
      'clientName': new FormControl(clientName, Validators.required),
      'startDate': new FormControl(startDate, Validators.required),
      'endDate': new FormControl(endDate, Validators.required),
      'range': new FormControl(range, Validators.required),
      'description': new FormControl(description, Validators.required) 
    })
  }

  onSubmit(){
    console.log(this.projectForm.value)
  }

  cancelProject(){
    this.formService.isFormStatus.next(0);
    this.router.navigate(['/details']);
  }

}
