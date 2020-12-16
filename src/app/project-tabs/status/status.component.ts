import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormServiceService } from 'src/app/shared/services/form-service.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(private router: Router, private formService: FormServiceService) { }

  ngOnInit(): void {
  }

  loadStatusForm() {
    this.formService.isFormStatus.next(1);
    this.router.navigateByUrl('/status/add');
  }

}
