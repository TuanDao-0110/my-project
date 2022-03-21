import React from 'react'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

export default function Profile() {
    if (localStorage.getItem('userLogin:')) {

        return (
            <div>

                profile

            </div>
        )
    } else {
        alert('vui long dang nhap de vao trang nay')
        return <Redirect to={'/login'}></Redirect>
    }
}
