export class ResourcesModel {
    constructor(
        public projectId: number,
        public resourceId: number,
        public resourceName: string,
        public resourceEmail: string,
        public role: string,
        public checkboxFlag: boolean,
        public billableAmount: number) 
    { }
}
