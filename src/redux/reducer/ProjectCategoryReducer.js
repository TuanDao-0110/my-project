import { Switch } from "react-router-dom"
import { GET_DATA_PROJECT_CATEGORY } from "../saga/Constants/CyberBugs/Cyberbugs"

const stateDefault = {
    arrProjectCategory: []
}



export const ProjectCategoryReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_DATA_PROJECT_CATEGORY: {

            state.arrProjectCategory = action.content
            return { ...state }
        }
        default: return { ...state }
    }


}