/* eslint-disable import/no-anonymous-default-export */


const initialState = {
    visible: false,
    ComponentContentDrawer: <p>default content</p>,
    callBackSubmit: () => {
        alert('click demo')
    },
    title: ''
}

export const drawerReducer = (state = initialState, action) => {
    switch (action.type) {

        case "OPEN_DRAWER": {
            return { ...state, visible: true }
        }
        case "CLOSE": return { ...state, visible: false }
        case "OPEN_FORM_EDIT_PROJECT": {
            return { ...state, visible: true, ComponentContentDrawer: action.Component, title: 'Edit Project' }
        }
        case "SET_SUBMIT_PROJECT": {
            return {

                ...state, callBackSubmit: action.submitFunction
            }
        }
        case "CREATE_TASK": return {
            ...state, visible: true, ComponentContentDrawer: action.Component, title: 'Create Task'
        }
        case "CLOSE_CREATE_TASK": return {
            ...state, visible: false
        }
        default:
            return state
    }
}
