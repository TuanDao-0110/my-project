import React, { useState } from 'react'
import { Prompt } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

export default function login(props) {
    console.log(props)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userLogin, setUserLogin] = useState({ userName: '', password: '', status: false });
    const handleChange = (event) => {
        const { name, value } = event.target
        const newUserLogin = {
            ...userLogin,
            [name]: value
        }

        let valid = true;

        for (let key in newUserLogin) {
            if (key !== 'status') {
                if (newUserLogin[key].trim() === '') {
                    valid = false
                }
            }
        }

        !valid ? newUserLogin.status = true : newUserLogin.status = false
        setUserLogin(newUserLogin)
    }


    const handleLogin = (e) => {
        e.preventDefault();
        if (userLogin.userName === 'cyberleanr' && userLogin.password === 'cyberleanr') {
            // props.history.goBack()
            // move to new component 
            // replace l
            props.history.goBack()
            localStorage.setItem('userLogin:', JSON.stringify(userLogin))
        } else {
            alert('fail login')
        }
    }
    return (
        <form className='container' onSubmit={
            handleLogin
        }>
            <h2>Login</h2>
            <div className='form-group'>
                <p> Account</p>
                <input name='userName' className='form-control' onChange={(e) => {
                    handleChange(e)
                }}></input>

            </div>
            <div className='form-group'>
                <p>password</p>
                <input name='password' className='form-control' onChange={(e) => {
                    handleChange(e)
                }}></input>

            </div>
            <div className='form-group'>

                <button name='button' className="btn btn-success" type='submit'> login</button>

            </div>
            <Prompt when={true} message={(location) => {
                console.log(location)
                return 'are u sure to quit'
            }}></Prompt>
        </form>
    )
}