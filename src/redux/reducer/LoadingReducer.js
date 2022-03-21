import { HIDE, LOADING } from '../../ultilities/constants/loadingContants'

const initialState = {


    isLoading: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {

        case LOADING: return { ...state, isLoading: true }
        case HIDE: return { ...state, isLoading: false }
        default:
            return state
    }
}
