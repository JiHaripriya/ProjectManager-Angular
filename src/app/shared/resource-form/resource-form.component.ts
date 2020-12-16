import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    if(String(this.router.url).toLocaleLowerCase().includes('edit')){
      this.buttonText = 'Update Resource';
    }
    else {
      this.buttonText = 'Add Resource';
    }
  }

  cancelResource(){
    this.formService.isFormStatus.next(0);
    this.router.navigate(['../resources']);
  }

}
