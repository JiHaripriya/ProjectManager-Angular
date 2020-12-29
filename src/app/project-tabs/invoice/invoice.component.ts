import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectApiService } from 'src/app/shared/services/project-api.service';
import { ResourcesModel } from 'src/app/shared/services/resources-model.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit, OnDestroy {
  
  resourceSubcription:Subscription;
  resourceList: ResourcesModel[];
  billables: ResourcesModel[];
  generate = false;
  totalAmounts = [];
  billAmount: Number;

  constructor(private projectApi: ProjectApiService, private router: Router) { }

  invoiceForm: FormGroup;

  ngOnInit(): void {
    this.generate = false;

    this.resourceSubcription = this.projectApi.fetchResources().subscribe(
      data => {
        this.resourceList = JSON.parse(JSON.stringify(data));
        this.billables = this.resourceList.filter((resource) => resource.projectId === JSON.parse(this.router.url.split('/')[2])).filter(val => val.checkboxFlag == true)
        console.log(this.billables);
    });

    this.invoiceForm = new FormGroup({
      'numDays': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    this.generate = true;
    this.totalAmounts = []; // to avoid re-submission of form from adding to previous values
    this.billables.map(resource => this.totalAmounts.push(Number(resource.billableAmount) * 8 * this.invoiceForm.value.numDays))
    this.billAmount = this.totalAmounts.reduce((a, b) => Number(a) + Number(b), [])
    this.invoiceForm.reset();
  }

  ngOnDestroy() {
    this.resourceSubcription.unsubscribe();
  }

}
