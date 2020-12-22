import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormServiceService } from '../services/form-service.service';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.css'],
})
export class StatusFormComponent implements OnInit {
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
  

  constructor(
    private formService: FormServiceService,
    private router: Router
  ) {
    // Get dates array in increasing order
    this.dateArray = this.generateDates(new Date(), this.subtractDays( new Date(), 7 )).reverse();
  }

  ngOnInit(): void {
    this.statusForm = new FormGroup({
      resource: new FormControl(null, Validators.required),
      date: new FormControl(`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`),
      actvitytype: new FormControl('Coding'),
      hours: new FormControl('08'),
      minutes: new FormControl('00'),
    });
  }

  onSubmit() {
    console.log(this.statusForm);
  }

  cancelStatusUpdate() {
    this.formService.isFormStatus.next(0);
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
}
