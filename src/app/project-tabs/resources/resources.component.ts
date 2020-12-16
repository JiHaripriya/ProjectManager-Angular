import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormServiceService } from 'src/app/shared/services/form-service.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  isDelete = false;

  constructor(private router: Router, private formService: FormServiceService, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  loadResourceForm() {
    this.isDelete = false;
    this.formService.isFormStatus.next(1);
    this.router.navigateByUrl('/resources/add');
  }

  editResource(){
    this.isDelete = false;
    this.formService.isFormStatus.next(1);
    this.router.navigateByUrl('/resources/edit');
  }

  deleteResource() {
    this.isDelete = true;
    this.formService.isFormStatus.next(1);
  }

  cancelDeleteResource(){
    this.isDelete = false;
    this.formService.isFormStatus.next(0);
    this.router.navigateByUrl('/resources');
  }
}
