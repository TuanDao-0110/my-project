import { baseService } from "./baseService"

class ProjectService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }
    deleteProject = (model) => {
        return this.delete(model)
    }
    removeUserFromProject = (userProject) => {
        return this.removeUserForProject(userProject)
    }

    getProjectDetailsFromAPi = (projectID) => {
        return this.getProjectDetails(projectID)
    }
    getAllProjectInfor = () => {
        return this.getAllProject()
    }
    getPriorityService = () => {
        return this.getPriority()
    }

    getAllStatusProjectService = () => {
        return this.getAllStatusBaseService()
    }
    getUserByProjectForMainService = (projectId) => {
        return this.getUserByProjectBaseService(projectId)
    }
}

export const projectService = new ProjectService()
