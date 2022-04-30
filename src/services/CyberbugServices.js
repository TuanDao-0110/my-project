import axios from "axios"
import { DOMAIN_CYBERBUG, TOKEN } from "../ultilities/constants/settingSysterm"
import { baseService } from "./baseService"


export const cyberBugServices = {
    signInCyberBugs: (userLogin) => {
    //     new baseService.post('Users/signin', userLogin)
        return axios(
            {
                url: `${DOMAIN_CYBERBUG}Users/signin`,
                method: 'POST',
                data: userLogin
            }
        )
    },


    getAllProjectCategory: () => {
        return axios({
            url: `http://casestudy.cyberlearn.vn/api/ProjectCategory`,
            method: 'GET'
        })
    },
    createProject: (newProject) => {
        return axios({
            url: `http://casestudy.cyberlearn.vn/api/Project/createProject`,
            method: "POST",
            data: newProject
        })
    },

    createProjectAuthorization: (newProject) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}Project/createProjectAuthorize`,
            method: "POST",
            data: newProject,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    getListProject: () => {
        return axios({
            url: `${DOMAIN_CYBERBUG}Project/getAllProject`,
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })

    },
    deleteProject: (projectID) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}Project/deleteProject?projectId=${projectID}`,
            method: "DELETE",
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    },
    updateProject: (projectUpdate) => {
        return axios({
            url: `${DOMAIN_CYBERBUG}Project/updateProject?projectId=${projectUpdate.id}`,
            method: "PUT",
            data: projectUpdate,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        })
    }

}



