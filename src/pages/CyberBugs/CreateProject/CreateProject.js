import React, { useRef, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useSelector, useDispatch } from 'react-redux';

import { withFormik } from 'formik'
import * as Yup from 'yup'



import { connect } from 'react-redux';
import { CREATE_PROJECT_SAGA, GET_ALL_PROJECT_INFOR, GET_ALL_PROJECT_SAGA } from '../../../redux/saga/Constants/CyberBugs/Cyberbugs';
import { TOKEN } from '../../../ultilities/constants/settingSysterm';
function CreateProject(props) {
    const dispatch = useDispatch()
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory)


    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_SAGA
        })

    }, [])
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

        <div className='container'>
            <h3 >
                Create Project
            </h3>
            <form className='container' onSubmit={handleSubmit} onChange={handleChange}>
                <div className='form-group'>
                    <p>Name</p>
                    <input className='form-control' name='projectName'></input>
                </div>
                <div className='form-group'>
                    <p>Description</p>
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}

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
                <div className='form-group'>
                    <select name='categoryId' className='form-control' onChange={handleChange}>
                        {arrProjectCategory.map((item, index) => {
                            return <option value={item.id} key={index}>
                                {item.projectCategoryName}
                            </option>
                        })}

                    </select>
                </div>
                <button className='btn btn-outline-primary' type='submit'> Create Project</button>
            </form>

        </div>
    )
}



const createProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            projectName: "",
            description: "",
            categoryId: props.arrProjectCategory[0]?.id,
        }
    },


    validationSchema: Yup.object().shape({

    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: CREATE_PROJECT_SAGA,
            newProject: values
        })
    },

    displayName: 'Login CyberBugs',

})(CreateProject);

const mapStateToProps = (state) => {
    return {
        arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
    }
}
export default connect(mapStateToProps)(createProjectForm)
