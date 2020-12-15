import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormServiceService } from '../shared/services/form-service.service';


@Component({
  selector: 'app-project-tabs',
  templateUrl: './project-tabs.component.html',
  styleUrls: ['./project-tabs.component.css']
})
export class ProjectTabsComponent implements OnInit {

  constructor(private formService: FormServiceService, private router: Router) { }

  ngOnInit(): void {
  }


}
