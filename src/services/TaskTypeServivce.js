import { baseService } from "./baseService";

class TaskTypeService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    }


    // eslint-disable-next-line no-unreachable
    getAllTaskType = () => {
        return this.getTaskType()
    }
    getTaskDetailService =(taskId)=>{
        return this.getTaskDetailBaseService(taskId)
    }

}


export const taskTypeService = new TaskTypeService()