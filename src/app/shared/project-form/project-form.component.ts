import { Component, OnInit } from '@angular/core';
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
  }

  cancelProject(){
    this.formService.isFormStatus.next(0);
    this.router.navigate(['../']);
  }


}
