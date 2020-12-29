export class StatusModel {
    constructor(
        public projectId: number,
        public resourceId: number,
        public resourceName: string,
        public resourceEmail: string,
        public actvitytype: string,
        public hours: string,
        public minutes: string,
        public postedOn: string,
        public date: string) 
    { }
}
