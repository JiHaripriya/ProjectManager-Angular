import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormServiceService } from '../services/form-service.service';
import { ProjectApiService } from '../services/project-api.service';
import { ResourcesModel } from '../services/resources-model.model';
import { StatusModel } from '../services/status-model.model';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.css'],
})
export class StatusFormComponent implements OnInit, OnDestroy {
  statusForm: FormGroup;
  activityTypeList = [
    'Project management',
    'Training',
    'Architecting',
    'Requirements analysis',
    'System design',
    'Coding',
    'Graphic design',
    'Testing',
    'HTML/CSS',
    'Pre-sales',
    'Tech Support',
    'UX design',
    'Marketing',
    'Business Analysis',
    'Other',
  ];

  // Append 0 to single digit time spent values
  hoursSequence = Array.from({ length: 17 }, (_, index) => String(index).length == 1 ? `0${index}` : `${index}`);
  minuteSequence = Array.from({ length: 4 }, (_, index) => String((index) * 15).length == 1 ? `0${(index) * 15}` : `${(index) * 15}`);
  dateArray: Array<string>[];
  
  projectsSubscription: Subscription;

  resources : ResourcesModel[];
  selectedProjectResources : ResourcesModel[];
  resourcesOption = [];
  statusList: StatusModel[];
  statusSubsscription: Subscription;
  overdue = false;

  constructor(
    private formService: FormServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private projectApi: ProjectApiService
  ) {
    // Get dates array in increasing order
    this.dateArray = this.generateDates(new Date(), this.subtractDays( new Date(), 7 )).reverse();
  }

  ngOnInit(): void {

    this.projectsSubscription = this.projectApi.fetchResources().subscribe(
      data => {
        this.resources = JSON.parse(JSON.stringify(data))
        this.selectedProjectResources = this.resources.filter((resource) => resource.projectId === JSON.parse(this.router.url.split('/')[2]))
        this.selectedProjectResources.map(resource => this.resourcesOption.push(`${resource.resourceName},${resource.resourceEmail}`));
    });

    this.statusSubsscription = this.projectApi.fetchStatus().subscribe(
      data => {
        this.statusList = JSON.parse(JSON.stringify(data)).filter((entry) => entry.projectId === JSON.parse(this.router.url.split('/')[2]));
    });

    this.statusForm = new FormGroup({
      resource: new FormControl(null, Validators.required),
      date: new FormControl(`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`),
      actvitytype: new FormControl('Coding'),
      hours: new FormControl('08'),
      minutes: new FormControl('00'),
    });
    
  }

  onSubmit() {
    let {resource:resourceDetails, ...rest} = this.statusForm.value;
    const statusUpdate = Object.assign(rest, 
      {'resourceName': resourceDetails.split(',')[0], 
      'resourceEmail': resourceDetails.split(',')[1],
      'postedOn': `${new Date().toLocaleDateString()} ${new Date().toTimeString().split(' ')[0]}`,
      'projectId': Number(this.router.url.split('/')[2]),
      'resourceId': this.selectedProjectResources.filter(val => val.resourceEmail === resourceDetails.split(',')[1])[0].resourceId
    })

    let statusCopy = this.statusList;
    statusCopy.push(statusUpdate);

    // 16 hours time limit per resource check
    if(this.calculateResourceWorkingHours(statusCopy, statusUpdate.date, statusUpdate.resourceEmail) <= 16){
      this.projectApi.storeStatus(statusUpdate);
      this.projectApi.reloadComponent.next(1);
      this.formService.isFormStatus.next(0);
      this.router.navigate(['../'], {relativeTo: this.route});
    }
    else {
      this.overdue = true; 
      setTimeout(() => {
        this.overdue = false;
        this.formService.isFormStatus.next(0);
        this.router.navigate(['../'], {relativeTo: this.route});
      }, 2000);
    }   
  }

  private calculateResourceWorkingHours(resourceStatusList, date, emailId) {
    return resourceStatusList.filter(report => report.date == date && report.resourceEmail == emailId.trim())
            .map (resource => {
                return Number(resource.hours) + (Number(resource.minutes)/60) 
            })
            .reduce((sum, value) => {return sum + value}, 0)
  }

  cancelStatusUpdate() {
    this.formService.isFormStatus.next(0);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // Generates dates between a given start and end date (both inclusive) and returns an array of dates
  private generateDates(startDate, stopDate) {
    let dateArray = new Array(), currentDate = startDate
    while (currentDate >= stopDate) {
        dateArray.push(`${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`)
        currentDate = this.subtractDays( currentDate, 1);
    }
    return dateArray
  }

  private subtractDays(dateInput, days) {
    let date = new Date(dateInput.valueOf())
    date.setDate(date.getDate() - days)
    return date
  }

  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
    this.statusSubsscription.unsubscribe();
  }
}
