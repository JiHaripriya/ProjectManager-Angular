import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class StatusComponent implements OnInit, OnDestroy {

  statusSubsscription: Subscription;
  reloadSubscription: Subscription;
  statusList: StatusModel[];
  dateList: string[];
  statusPerDate = {}
  loading:boolean;

  constructor(
    private router: Router, 
    private formService: FormServiceService,
    private projectApi: ProjectApiService) { }

  ngOnInit(): void {
    this.loading = true;
    this.statusSubsscription = this.projectApi.fetchStatus().subscribe(
      data => {
        this.statusList = JSON.parse(JSON.stringify(data)).filter((entry) => entry.projectId === JSON.parse(this.router.url.split('/')[2]));
        this.dateList = Array.from(new Set(this.statusList.map(val => val.date))).sort().reverse();
        console.log(this.dateList);
        for(let eachDate of this.dateList){
          this.statusPerDate[eachDate] = this.statusList.filter(report => report.date == eachDate)
        }
        this.loading = false;  
    });

    this.reloadSubscription = this.projectApi.reloadComponent.subscribe(
      res => res == 1 ? this.ngOnInit() : 0
    )
  }

  loadStatusForm() {
    this.formService.isFormStatus.next(1);
    this.router.navigateByUrl(`${this.router.url}/add`);
  }

  ngOnDestroy() {
    this.statusSubsscription.unsubscribe();
    this.reloadSubscription.unsubscribe();
  }

}
