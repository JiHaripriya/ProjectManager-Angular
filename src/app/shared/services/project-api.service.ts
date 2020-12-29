import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { ProjectsModel } from './projects-model.model';
import { ResourcesModel } from './resources-model.model';
import { StatusModel } from './status-model.model';

@Injectable({
  providedIn: 'root'
})

export class ProjectApiService {

  reloadComponent = new Subject<number>();
  selectedProjectId = new Subject<number>();

  constructor(private http: HttpClient) { }

  storeProjectData(data:ProjectsModel) {
    this.http
      .post('https://project-management-syste-240c6-default-rtdb.firebaseio.com/projects.json', 
      data)
      .subscribe(responseData => {
        this.reloadComponent.next(1);
        console.log(responseData)
      })
  }

  storeResourceData(data: ResourcesModel) {
    this.http
      .post('https://project-management-syste-240c6-default-rtdb.firebaseio.com/resources.json',
        data)
      .subscribe(responseData => {
        this.reloadComponent.next(1);
        console.log(responseData)
      })
  }

  storeStatus(data: StatusModel){
    this.http
      .post('https://project-management-syste-240c6-default-rtdb.firebaseio.com/status.json',
        data)
      .subscribe(responseData => {
        this.reloadComponent.next(1);
        console.log(responseData)
      })
  }

  updateProjectData(data:ProjectsModel[]){
    this.http
    .put('https://project-management-syste-240c6-default-rtdb.firebaseio.com/projects.json', 
    data)
    .subscribe(responseData => {
      this.reloadComponent.next(1);
    })
  }

  updateResourceData(data: ResourcesModel[]) {
    this.http
      .put('https://project-management-syste-240c6-default-rtdb.firebaseio.com/resources.json',
        data)
      .subscribe(responseData => {
        this.reloadComponent.next(1);
      })
  }

  fetchProjects(){
    return this.http
    .get('https://project-management-syste-240c6-default-rtdb.firebaseio.com/projects.json')
    .pipe(
      map(responseData => {
        const projectsArray: ProjectsModel[] = []
        for(const key in responseData) {
          if(responseData.hasOwnProperty(key)){
            projectsArray.push({...responseData[key]})
          }
        }
        return projectsArray;
      })
    )
  }

  fetchResources() {
    return this.http
      .get('https://project-management-syste-240c6-default-rtdb.firebaseio.com/resources.json')
      .pipe(
        map(responseData => {
          const resourcesArray: ResourcesModel[] = []
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              resourcesArray.push({ ...responseData[key] })
            }
          }
          return resourcesArray;
        })
      )
  }

  fetchStatus() {
    return this.http
      .get('https://project-management-syste-240c6-default-rtdb.firebaseio.com/status.json')
      .pipe(
        map(responseData => {
          const resourcesArray: StatusModel[] = []
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              resourcesArray.push({ ...responseData[key] })
            }
          }
          return resourcesArray;
        })
      )
  }
}
