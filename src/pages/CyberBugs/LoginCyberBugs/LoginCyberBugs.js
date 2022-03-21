import React from 'react'
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined, FacebookOutlined, TwitterCircleFilled, FacebookFilled } from '@ant-design/icons'
import { withFormik } from 'formik'
import * as Yup from 'yup'
function LoginCyberBugs(props) {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;


    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className='d-flex justify-content-center align-items-center' style={{ height: window.innerHeight, flexDirection: 'column' }}>
                <h3 className='text-center'>{props.displayName}</h3>
                <div>
                    <Input onChange={handleChange} name='email' size="large" placeholder="Email" prefix={<UserOutlined></UserOutlined>} />
                    <div className='error text-danger'>
                        {errors.email}
                    </div>
                </div>
                <div className='mt-2'>
                    <Input type='password' onChange={handleChange} name='password' size="large" placeholder="Password" prefix={<LockOutlined />} />
                    <div className='error text-danger'>
                        {errors.password}
                    </div>
                </div>


                <Button htmlType='submit' className='mt-5' type='ghost' style={{ width: '50%', minWidth: 300, backgroundColor: '#6A73E2', color: '#fff' }} size='large' >Login</Button>
                <div className='social mt-4'>
                    <Button className='mr-3' type='ghost' size='large' shape='circle' icon={<FacebookFilled size={'large'} style={{ border: 'none' }}></FacebookFilled>}>
                    </Button>
                    <Button type='primary' size='large' shape='circle' icon={<TwitterCircleFilled size={'large'} style={{ border: 'none' }}></TwitterCircleFilled>}>
                    </Button>
                </div>

            </div>
        </form >
    )
}


const LoginCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({ email: '', password: '' }),


    validationSchema: Yup.object().shape({
        email: Yup.string().email('email invalid').required('Email is required'),
        password: Yup.string().min(6, 'password have min 6 charaters').max(32, 'password have max 32 characters')
    }),

    handleSubmit: (values, { setSubmitting }) => {
        console.log(values)
    },

    displayName: 'Login CyberBugs',

})(LoginCyberBugs);


export default LoginCyberBugsWithFormik