import { USER_LOGIN } from "../../ultilities/constants/settingSysterm"
import { GET_ALL_STATUS_REDUCER, GET_USER_BY_PROJECT, GET_USER_LIST, USLOGIN } from "../saga/Constants/CyberBugs/Cyberbugs"

let userLogIn = {

}



if (localStorage.getItem(USER_LOGIN)) {
    userLogIn = JSON.parse(localStorage.getItem(USER_LOGIN))
} else {

}
const stateDefault = {
    usLogin: userLogIn,
    userSearch: [],
    // arrUser: [],
    arrUserProject: []

}


export const UserLoginCyberBugsReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case USLOGIN: {
            state.usLogin = action.userLogin
            return { ...state }
        }
        case GET_USER_LIST: {
            return { ...state, userSearch: action.userList }
        }
        case GET_USER_BY_PROJECT: {
            return { ...state, arrUserProject: action.arrUserProject }
        }
        default: return { ...state }
    }
}