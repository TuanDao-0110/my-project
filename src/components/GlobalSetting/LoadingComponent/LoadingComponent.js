import React from 'react'
import style from './LoadingComponent.module.css'
import { useSelector } from 'react-redux'

export default function LoadingComponent() {
    const { isLoading } = useSelector(state => state.LoadingReducer)
    if (isLoading) {
        return (
            <div className={style.bgLoading}>
                <img className={style.loading} src={require('../../../assets/imgLoading/loading.gif')}></img>

            </div>)
    } else {
        return ('')
    }

}
