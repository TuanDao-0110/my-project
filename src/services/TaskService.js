import { baseService } from "./baseService";

class TaskService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super(
        )
    }

    postCreatNewTaskService(newTask) {
        return this.postCreateTaskBaseService(newTask)
    }
    getTaskDetailService(taskId) {
        return this.getTaskDetailBaseService(taskId)
    }
    putUpdateStatusService(task) {
        return this.putUpdateStatusBaservice(task)
    }
    postUpdateTaskService(newTask) {
        return this.postUpdateTaskBaseService(newTask)
    }
  
}



export const taskService = new TaskService()