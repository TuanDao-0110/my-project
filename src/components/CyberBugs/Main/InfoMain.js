import React from 'react'
import parse from 'html-react-parser';

export default function InfoMain(props) {

    const { members, description,  } = props.projectDetail
    const renderAvatar = () => {
        return members?.map((user, index) => {
            return <div className='avatar'>
                <img alt='' src={user.avatar}></img>
            </div>
        })
    }



    return (
        <div className="info" style={{ display: 'flex' }}>
            <div>{description != null ? parse(description) : ''}</div>
            <br></br>
            <div className="search-block">
                <input className="search" />
                <i className="fa fa-search" />
            </div>
            <div className="avatar-group" style={{ display: 'flex' }}>
                {renderAvatar()}
            </div>
            <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
            <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
        </div >

    )
}
