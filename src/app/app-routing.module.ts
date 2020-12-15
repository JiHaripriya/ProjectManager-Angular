import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './project-tabs/details/details.component';
import { ResourcesComponent } from './project-tabs/resources/resources.component';
import { InvoiceComponent } from './project-tabs/invoice/invoice.component';
import { StatusComponent } from './project-tabs/status/status.component';
import { ProjectFormComponent } from './shared/project-form/project-form.component';


const routes: Routes = [
  {path: 'details', component: DetailsComponent},
  {path: 'resources', component: ResourcesComponent},
  {path: 'invoice', component: InvoiceComponent},
  {path: 'status', component: StatusComponent},
  {path: 'projectForm', component: ProjectFormComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
