import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormServiceService } from 'src/app/shared/services/form-service.service';
import { ProjectApiService } from 'src/app/shared/services/project-api.service';
import { StatusModel } from 'src/app/shared/services/status-model.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  statusSubsscription: Subscription;
  statusList: StatusModel[];
  dateList: string[];

  constructor(
    private router: Router, 
    private formService: FormServiceService,
    private projectApi: ProjectApiService) { }

  ngOnInit(): void {
    this.statusSubsscription = this.projectApi.fetchStatus().subscribe(
      data => {
        console.log(JSON.parse(JSON.stringify(data)).filter((entry) => entry.projectId === JSON.parse(this.router.url.split('/')[2])));
    });
  }

  loadStatusForm() {
    this.formService.isFormStatus.next(1);
    this.router.navigateByUrl(`${this.router.url}/add`);
  }

}
