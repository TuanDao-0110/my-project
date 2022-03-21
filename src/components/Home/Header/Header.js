import React from 'react'
import { NavLink } from 'react-router-dom'
import './header.css'
export default function Header() {
    return (
        <div>

            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="/">Cyber Learn </NavLink>
                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item ">
                            <NavLink activeStyle={{ font: 'bold' }} className="nav-link" to="/home">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='activeNav' to="/contact">contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='activeNav' to="/about">about</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='activeNav' to="/login">login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='activeNav' to="/detail/444">detail</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='activeNav' to="/profile">profile</NavLink>
                        </li>



                        
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='DemoHOCModal' to="/DemoHOCModal">HOC</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown todo list</a>
                            <div className="dropdown-menu">
                                <NavLink className="dropdown-item" activeClassName='activeNav' to="/dotolistRFC">ToDoListRFC</NavLink>
                                <NavLink className="dropdown-item" activeClassName='activeNav' to="/dotolist">ToDoList</NavLink>
                                <NavLink className="dropdown-item" activeClassName='activeNav' to="/dotolistredux">redux</NavLink>
                                <NavLink className="dropdown-item" activeClassName='activeNav' to="/dotolistSaga">ToDoListSaGa</NavLink>

                            </div>
                        </li>



                    </ul>

                </div>
            </nav>

        </div>
    )
}
