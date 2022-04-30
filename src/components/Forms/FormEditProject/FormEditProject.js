import React, { useRef, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useSelector, useDispatch } from 'react-redux';

import { withFormik } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux';
import { EDIT_PROJECT, GET_ALL_PROJECT_SAGA, GET_DATA_PROJECT_CATEGORY, SUBMIT_EDIT_PROJECT } from '../../../redux/saga/Constants/CyberBugs/Cyberbugs';
function FormEditProject(props) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_SAGA
        })
        dispatch({
            type: "SET_SUBMIT_PROJECT",
            submitFunction: handleSubmit
        })
    }, [])
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory)


    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props;

    const editorRef = useRef(null);
    // log when click will store HTML text
    const log = () => {
        if (editorRef.current) {
            // setValues is token from props ( Props : include RFC's props vs withFormik's props)
            setFieldValue('description', editorRef.current.getContent())
        }
    };
    return (
        <form className='container-fuild' onChange={handleChange} >
            <div className='row'>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>
                            Project ID
                        </p>
                        <input value={values.id} disabled name='id' onChange={(e) => {
                            setFieldValue('id', e.target.value)
                        }}></input>
                    </div>


                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>
                            Project Name
                        </p>
                        <input value={values.projectName} name='projectName' onChange={(e) => {
                            setFieldValue('projectName', e.target.value)
                        }}></input>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>
                            Project Category
                        </p>
                        <select name='categoryId' value={values.categoryId} className='form-control' onChange={handleChange}>
                            {arrProjectCategory.map((item, index) => {
                                return <option value={item.id} key={index}>
                                    {item.projectCategoryName}
                                </option>
                            })}

                        </select>
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>
                            Description
                        </p>
                        <Editor
                            onInit={(evt, editor) => editorRef.current = editor}

                            value={values.description}

                            tagName='description123'
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onEditorChange={log}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}
const EditProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { projectEdit } = props
        return {
            id: projectEdit?.id,
            projectName: projectEdit?.projectName,
            description: projectEdit?.description,
            categoryId: projectEdit?.categoryId


        }
    },


    validationSchema: Yup.object().shape({

    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: SUBMIT_EDIT_PROJECT,
            projectUpdate: values
        })

    },

    displayName: 'Submit Edit',

})(FormEditProject);


const mapStateToProps = (state) => {
    return {
        projectEdit: state.ProjectReducer.projectEdit
    }
}
export default connect(mapStateToProps)(EditProjectForm)