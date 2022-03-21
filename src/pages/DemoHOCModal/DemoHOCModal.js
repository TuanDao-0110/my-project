import React from 'react'
import { useDispatch } from 'react-redux'
import Register from '../Register/Register.js'
import login from '../Login/login.js'
import SlideDown from '../../HOC/Modal/SlideDown.js'
export default function DemoHOCModal() {
    const loginWithSlideDown = new SlideDown(login);
    const dispatch = useDispatch()
    return (
        <div>
            <button onClick={() => {
                dispatch({
                    type: 'OPEN_FORM',
                    Component: <login></login>

                })
            }} type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
                đăng nhập
            </button>

            <button onClick={() => {
                dispatch({
                    type: 'OPEN_FORM',
                    Component: <Register />
                })
            }} type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
                đăng kí
            </button>
            {/* <SlideDown></SlideDown> */}
            {loginWithSlideDown}
        </div>
    )
}
