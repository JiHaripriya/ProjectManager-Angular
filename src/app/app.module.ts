import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectTabsComponent } from './project-tabs/project-tabs.component';
import { DetailsComponent } from './project-tabs/details/details.component';
import { ResourcesComponent } from './project-tabs/resources/resources.component';
import { InvoiceComponent } from './project-tabs/invoice/invoice.component';
import { StatusComponent } from './project-tabs/status/status.component';
import { AppRoutingModule } from './app-routing.module';
import { ResourceFormComponent } from './shared/resource-form/resource-form.component';
import { ProjectFormComponent } from './shared/project-form/project-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusFormComponent } from './shared/status-form/status-form.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectTabsComponent,
    DetailsComponent,
    ResourcesComponent,
    InvoiceComponent,
    StatusComponent,
    ResourceFormComponent,
    ProjectFormComponent,
    StatusFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
