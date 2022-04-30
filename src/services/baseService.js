import axios from "axios"
import { DOMAIN, DOMAIN_CYBERBUG, TOKEN } from "../ultilities/constants/settingSysterm"

export class baseService {

    put = (urlAPI, model) => {
        return axios({
            url: `${DOMAIN}${urlAPI}${model.id}`,
            method: "PUT",
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    post = (urAPI, model) => {
        return axios({
            url: `${DOMAIN}${urAPI}`,
            method: "POST",
            data: model,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    get = (urAPI) => {
        return axios({
            url: `${DOMAIN}${urAPI}`,
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    delete = (modelID) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}Project/deleteProject?projectId=${modelID}`,
            method: "DELETE",
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    getUserList = (keyWord) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}Users/getUser?keyword=${keyWord}`,
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
    assignNewUser = (newAssignUser) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}Project/assignUserProject`,
            method: "POST",
            data: newAssignUser,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
    removeUserForProject = (userProject) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}Project/removeUserFromProject`,
            method: "POST",
            data: userProject,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
    getProjectDetails = (projectID) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}Project/getProjectDetail?id=${projectID}`,
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

    getAllProject = () => {
        return axios({
            url: `${DOMAIN_CYBERBUG}Project/getAllProject`,
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }
    getTaskType = () => {
        return axios({
            url: ` ${DOMAIN_CYBERBUG}TaskType/getAll`,
            method: "GET"
        })
    }
    getPriority = () => {
        return axios({
            url: `${DOMAIN_CYBERBUG}Priority/getAll?id=0`,
            method: "GET"
        })
    }
    postCreateTask = (newTask) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}Project/createTask`,
            data: newTask,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) },
            method: "GET"
        })
    }
    getAllStatusBaseService = () => {
        return axios({
            url: `${DOMAIN_CYBERBUG}Status/getAll`,
            method: "GET"
        })
    }

    postCreateTaskBaseService = (newTask) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}Project/createTask`,
            method: "POST",
            data: newTask,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) },
        })
    }
    getUserByProjectBaseService = (projectId) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}Users/getUserByProjectId?idProject=${projectId}`,
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) },
        })
    }
    getTaskDetailBaseService = (taskId) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}Project/getTaskDetail?taskId=${taskId}`,
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) },
        })
    }
    putUpdateStatusBaservice = (task) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}Project/updateStatus`,
            method: "PUT",
            data: task,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) },
        })
    }
    postUpdateTaskBaseService = (newTaskDetails) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}Project/updateTask`,
            method: "POST",
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) },
            data: newTaskDetails
        })
    }

}