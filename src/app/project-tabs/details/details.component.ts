import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormServiceService } from 'src/app/shared/services/form-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private formService: FormServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  editProjectForm(){
    this.formService.isFormStatus.next(1);
    this.router.navigateByUrl('/details/edit');
  }
}
