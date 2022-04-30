/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Space, Tag } from 'antd';
import parse from 'html-react-parser';
import { CheckCircleOutlined, CloseCircleOutlined, ConsoleSqlOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_NEW_USER, DELETE_PROJECT, EDIT_PROJECT, GET_ALL_PROJECT, GET_PROJECT_DETAIL_SAGA, GET_USER, REMOVE_USER_FROM_PROJECT } from '../../../redux/saga/Constants/CyberBugs/Cyberbugs';
import { act } from 'react-dom/test-utils';
import { Popconfirm, message } from 'antd';
import { Avatar, Image, Popover, AutoComplete } from 'antd';

import FormEditProject from '../../../components/Forms/FormEditProject/FormEditProject';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';


export default function ProjectManagement(props) {

    const projectList = useSelector(state => state.ProjectCyberBugReducer.projectList)
    const listUser = useSelector(state => state.UserLoginCyberBugsReducer.userSearch)
    const [selectNameValue, setSelectName] = useState('')
    const dispatch = useDispatch()


    const searchRef = useRef(null)
    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT
        })
    }, [])

    const onSearch = (value) => {
        dispatch({
            type: GET_USER,
            keyword: value
        })
    }

    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    })
    const handleChange = (pagination, filters, sorter) => {
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    const clearFilters = () => {
        setState({ filteredInfo: null });
    };


    const clearAll = () => {
        setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };


    const setAgeSort = () => {
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'projectName',
            },
        });
    };

    let { sortedInfo, filteredInfo } = state;

    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            // key: 'id',

            sorter: (a, b) => a.id - b.id,
            sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',

            sortOrder: sortedInfo.columnKey === 'projectName' && sortedInfo.order,
            sorter: (item1, item2) => {
                let projectName1 = item1.projectName?.trim().toLowerCase();
                let projectName2 = item1.projectName?.trim().toLowerCase()
                if (projectName2 > projectName1) {
                    return -1
                }
                return 1

            },
            ellipsis: true,
            render: (text, record, index) => {
                return <NavLink to={`/projectdetail/${record.id}`} style={{ cursor: 'pointer' }}
                    onClick={() => {
                       
                    }}

                >
                    {text}
                </NavLink>
            }
        },
        {
            title: 'creator',
            dataIndex: 'creator',
            key: 'creator',
            sorter: (a, b) => a.creator.name.length - b.creator.name.length,
            sortOrder: sortedInfo.columnKey === 'creator' && sortedInfo.order,
            ellipsis: false,
            render: ((text, record, index) => {
                return <>
                    <Tag color="geekblue">{record.creator?.name} </Tag>
                </>
            })
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: ((text, record, index) => {
                let jxsContent = parse(text);
                //  text = value of key , record = data for each object , index = order number of each object.
                return < >
                    {jxsContent}
                </>
            })
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                < Space size="middle" >
                    <a onClick={() => {
                        const action = {
                            type: 'OPEN_FORM_EDIT_PROJECT',
                            Component: <FormEditProject></FormEditProject>,
                        }
                        dispatch(action)
                        //dispatch dong hien tai len reducer 

                        const actionEditProject = {
                            type: EDIT_PROJECT,
                            projectEditModel: record
                        }
                        dispatch(actionEditProject)
                    }}><CheckCircleOutlined style={{ color: '#2f54eb' }} /></a>
                    <Popconfirm
                        title="Are you sure to delete this project?"
                        onConfirm={() => {
                            dispatch({
                                type: DELETE_PROJECT,
                                projectID: text.id
                            })
                        }}
                        onCancel={() => {

                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a ><CloseCircleOutlined style={{ color: '#f5222d' }} /></a>
                    </Popconfirm>

                </ Space >
            ),
        },
        {
            title: "Member",
            dataIndex: 'members',
            key: "members",
            render: (text, record, index) => {
                return <>
                    {text?.slice(0, 3).map((item) => {
                        return <Popover
                            placement='top'
                            title={"Member"}
                            content={() => {
                                return <table className='table'>
                                    <thead>

                                        <th>id</th>
                                        <th>avatar</th>
                                        <th>Name</th>
                                        <th></th>
                                    </thead>
                                    <tbody>
                                        {text?.map((item, index) => {
                                            return <tr key={index}>
                                                <td>
                                                    {item.userId}
                                                </td>
                                                <td>
                                                    <img src={item?.avatar} width='50' height='50' alt=''></img>
                                                </td>
                                                <td>
                                                    {item.name}
                                                </td>
                                                <td>
                                                    <button onClick={() => {
                                                        dispatch({
                                                            type: REMOVE_USER_FROM_PROJECT,
                                                            userProject: {
                                                                "projectId": record.id,
                                                                "userId": item.userId
                                                            }
                                                        })
                                                    }} className='btn btn-danger'>Delelte</button>
                                                </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            }}>
                            <Avatar src={<Image src={item.avatar} style={{ width: 32 }} key={index} />} />
                        </Popover>
                    })}
                    {text?.length > 3 ? <Popover
                        placement='top'
                        title={"Member"}
                        content={() => {
                            return <table className='table'>
                                <thead>

                                    <th>id</th>
                                    <th>avatar</th>
                                    <th>Name</th>
                                    <th></th>
                                </thead>
                                <tbody>
                                    {text?.map((item, index) => {
                                        return <tr key={index}>
                                            <td>
                                                {item.userId}
                                            </td>
                                            <td>
                                                <img src={item?.avatar} width='50' height='50' alt=''></img>

                                            </td>
                                            <td>
                                                {item.name}
                                            </td>
                                            <td>
                                                <button onClick={() => {
                                                    dispatch({
                                                        type: REMOVE_USER_FROM_PROJECT,
                                                        userProject: {
                                                            "projectId": record.id,
                                                            "userId": item.userId
                                                        }
                                                    })

                                                }} className='btn btn-danger'>Delelte</button>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        }}
                    ><Avatar style={{ cursor: 'pointer' }}>...</Avatar></Popover> : <></>}
                    <Popover content={() => {
                        return <AutoComplete
                            options={listUser?.map((user, index) => {
                                return { label: user.name, value: user.userId.toString() }
                            })}
                            style={{ width: 200 }}
                            placeholder="input here" onSearch={(value) => {

                                // kiem tra xem nguoi dung co nhap them ten nua hay khong ? 
                                // neu co thi ==> thuc hien viec xoa setTimeOut di,
                                // vi setTimeOut : 
                                if (searchRef.current) {
                                    clearTimeout(searchRef.current)
                                }
                                searchRef.current = setTimeout(() => {
                                    onSearch(value)
                                }, 1000);
                            }}
                            value={selectNameValue}
                            onChange={(text) => {
                                setSelectName(text)
                            }}
                            onSelect={(valueId, option) => {
                                setSelectName('')
                                dispatch({
                                    type: ADD_NEW_USER,
                                    newUser: {
                                        "projectId": record.id,
                                        "userId": valueId,
                                    }
                                })
                            }}

                        ></AutoComplete>
                    }} title="Add_Users">
                        <Button type="primary">+</Button>
                    </Popover>,
                </>


            }
        }
    ];
    return (
        <div className='mt-5 container-fuild'>
            <h3>Project Management</h3>
            <Space style={{ marginBottom: 16 }}>
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table columns={columns} dataSource={projectList} onChange={handleChange} />
        </div>
    )
}

