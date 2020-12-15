import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormServiceService } from 'src/app/shared/services/form-service.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  constructor(private router: Router, private formService: FormServiceService) { }

  ngOnInit(): void {
  }

  loadResourceForm() {
    this.formService.isFormStatus.next(1);
    this.router.navigate(['/resourceForm']);
  }

}
