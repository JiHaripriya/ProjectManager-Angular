export class ProjectsModel {
    constructor(
        public projectName:string, 
        public clientName: string, 
        public startDate: string, 
        public endDate: string,
        public range : number,
        public description: string,
        public technologies? : [], 
        public projectID? : string)
    {}
}
