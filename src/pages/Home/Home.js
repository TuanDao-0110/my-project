import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { USER_LOGIN } from '../../ultilities/constants/settingSysterm'

export default function Home(props) {
  console.log('home props', props)
  const userLogin = useSelector(state => state.UserLoginCyberBugsReducer)
  return (
    <div>Home
      <br></br>

      user_Email      {userLogin.usLogin?.email}
      <br></br>
      <img src={userLogin.usLogin?.avatar} alt='userloginavatar'></img>
    </div>
  )
}
