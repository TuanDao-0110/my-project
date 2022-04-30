import { USER_SIGN_IN_API } from "../saga/Constants/CyberBugs/Cyberbugs"

export const singIn_action = (values) => {
    return {
        type: USER_SIGN_IN_API,
        userLogin: {
            email: values.email,
            passWord: values.passWord
        },

    }
}


