
import { baseService } from "./baseService"

class UserService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }
    getUser = (keyWord) => {
        return this.getUserList(keyWord)
    }

    addNewUser = (newUser) => {
        return this.assignNewUser(newUser)
    }
}

export const userService = new UserService()
