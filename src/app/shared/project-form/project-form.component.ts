import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormServiceService } from '../services/form-service.service';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  slider: string = '0';
  
  constructor(private formService: FormServiceService, private router: Router) { 
    
  }

  ngOnInit(): void {
  }

  cancelProject(){
    this.formService.isFormStatus.next(0);
    this.router.navigate(['/details']);
  }

}
