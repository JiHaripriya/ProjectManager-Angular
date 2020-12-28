import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './project-tabs/details/details.component';
import { ResourcesComponent } from './project-tabs/resources/resources.component';
import { InvoiceComponent } from './project-tabs/invoice/invoice.component';
import { StatusComponent } from './project-tabs/status/status.component';
import { ProjectFormComponent } from './shared/project-form/project-form.component';
import { ResourceFormComponent } from './shared/resource-form/resource-form.component';
import { StatusFormComponent } from './shared/status-form/status-form.component';


const routes: Routes = [
  {path: '', redirectTo: '/projects/0/details', pathMatch: 'full'},
  {path: 'projects', children :[
    {path: 'add', component: ProjectFormComponent}, 
    {path: ':id', children: [
      {path: 'details', children: [
        {path: '', component: DetailsComponent, pathMatch: 'full'},
        {path: 'edit', component: ProjectFormComponent}
      ]},
      {path: 'resources', children: [
        {path: '', component: ResourcesComponent, pathMatch: 'full'},
        {path: 'add', component: ResourceFormComponent},
        {path: 'edit', component: ResourceFormComponent},
        {path: 'delete', component: ResourcesComponent}
      ]},
      {path: 'invoice', component: InvoiceComponent},
      {path: 'status', children: [
        {path: '', component: StatusComponent, pathMatch: 'full'},
        {path: 'add', component: StatusFormComponent}
      ]}
    ]},
  ]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
