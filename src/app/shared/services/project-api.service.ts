import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { ProjectsModel } from './projects-model.model';

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

  updateProjectData(data:ProjectsModel[]){
    this.http
    .put('https://project-management-syste-240c6-default-rtdb.firebaseio.com/projects.json', 
    data)
    .subscribe(responseData => {
      this.reloadComponent.next(1);
      console.log(responseData)
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
}
