import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './project-tabs/details/details.component';
import { ResourcesComponent } from './project-tabs/resources/resources.component';
import { InvoiceComponent } from './project-tabs/invoice/invoice.component';
import { StatusComponent } from './project-tabs/status/status.component';
import { ProjectFormComponent } from './shared/project-form/project-form.component';
import { ResourceFormComponent } from './shared/resource-form/resource-form.component';


const routes: Routes = [
  {path: '', redirectTo: '/details', pathMatch: 'full'},
  {path: 'details', component: DetailsComponent},
  {path: 'resources', component: ResourcesComponent},
  {path: 'invoice', component: InvoiceComponent},
  {path: 'status', component: StatusComponent},
  {path: 'projectForm', component: ProjectFormComponent, children: [
    {path: 'edit', component: ProjectFormComponent}
  ]},
  {path: 'resourceForm', component: ResourceFormComponent, children: [
    {path: 'edit', component: ResourceFormComponent}
  ]}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
