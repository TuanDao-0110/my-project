import React from "react"

const stateDefault = {
    Component: <p>Noi dung mac dinh</p>
}

export const ModalReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case "OPEN_FORM": {
            return { ...state, Component: action.Component }
        }
        default: return { ...state }
    }
}