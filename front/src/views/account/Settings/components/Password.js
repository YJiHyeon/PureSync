import React from 'react'
import {
    Input,
    Button,
    Notification,
    toast,
    FormContainer,
} from 'components/ui'
import SendHeaderCookie from 'utils/hooks/getHeaderCookie'
import FormDesription from './FormDesription'
import FormRow from './FormRow'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';


const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('현재 비밀번호를 입력하세요.'),
    newPassword: Yup.string()
        .required('신규 비밀번호를 입력하세요.')
        .min(8, '8자 이상의 영문, 숫자, 특수문자로 입력해주세요.')
        .max(17, '16자 이하의 영문, 숫자, 특수문자로 입력해주세요.')
        .matches(/^[A-Za-z0-9_-]*$/, '비밀번호 생성규칙에 알맞지 않습니다.'),
    confirmNewPassword: Yup.string().oneOf(
        [Yup.ref('newPassword'), null],
        '비밀번호가 일치하지 않습니다.'
    ),
})

const Password = () => {
    const token = SendHeaderCookie();
    const onFormSubmit = async (values, {setSubmitting, resetForm}) => {
        try {
            const { oldPassword, newPassword } = values
            const response = await axios.put(process.env.REACT_APP_HOST_URL+ '/api/my/password', 
            JSON.stringify({ oldPassword, newPassword }), 
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
    
            
            toast.push(<Notification title={'비밀번호가 변경되었습니다.'} type="success" />, { placement: 'top-center' });
            resetForm();
        } catch (error) {
            console.error('API Error:', error.response.data);

            toast.push(<Notification title={'비밀번호가 일치하지 않습니다.'} type="danger" />, { placement: 'top-center' });
        } finally {
            setSubmitting(false);
        }

    }

    return (
        <>
            <Formik
                initialValues={{
                    oldPassword: '',
                    newPassword: '',
                    confirmNewPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        onFormSubmit(values, {setSubmitting, resetForm})
                    }, 1000)
                }}
            >
                {({ values, touched, errors, isSubmitting, resetForm }) => {
                    const validatorProps = { touched, errors }
                    return (
                        <Form>
                            <FormContainer>
                                <FormDesription
                                    title="비밀번호 변경"
                                    // desc="Enter your current & new password to reset your password"
                                />
                                <FormRow
                                    name="oldPassword"
                                    label="현재 비밀번호"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="password"
                                        autoComplete="off"
                                        name="oldPassword"
                                        component={Input}
                                    />
                                </FormRow>
                                <FormRow
                                    name="newPassword"
                                    label="새 비밀번호"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="password"
                                        autoComplete="off"
                                        name="newPassword"
                                        component={Input}
                                    />
                                </FormRow>
                                <FormRow
                                    name="confirmNewPassword"
                                    label="비밀번호 확인"
                                    {...validatorProps}
                                >
                                    <Field
                                        type="password"
                                        autoComplete="off"
                                        name="confirmNewPassword"
                                        component={Input}
                                    />
                                </FormRow>
                                <div className="mt-4 ltr:text-right">
                                    <Button
                                        variant="solid"
                                        loading={isSubmitting}
                                        type="submit"
                                    >
                                        {isSubmitting
                                            ? '비밀번호 변경 중'
                                            : '비밀번호 변경'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default Password
