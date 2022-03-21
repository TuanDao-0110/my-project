import React from 'react'

export default function detail(props) {
    console.log(props)
    return (
        <div>
            gia tri tham so : {props.match.params.id}
            <br>
            </br>
            duong dang hien tai : {props.match.path}
            <br></br>
            duong link url : {props.match.url}
        </div>
    )
}
