import React, { useState } from 'react'
import { Input, InputGroup, Button, FormItem, FormContainer, Alert, Radio } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup' //유효성검사
import useAuth from 'utils/hooks/useAuth'


const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Please enter your user name'),
    email: Yup.string()
        .email('Invalid email')
        .required('Please enter your email'),
    password: Yup.string().required('Please enter your password'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Your passwords do not match'
    ),
})

const SignUpForm = (props) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const { signUp } = useAuth()

    const [message, setMessage] = useTimeOutMessage()

    const onSignUp = async (values, setSubmitting) => {
        const { userName, password, email } = values
        setSubmitting(true)
        const result = await signUp({ userName, password, email })

        if (result.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    memId: '',
                    memNick: '',
                    email: '',
                    memBirth: '',
                    memGender: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignUp(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            {/* 아이디 인풋박스 -  */}
                            <FormItem
                                label="아이디"
                                invalid={errors.memId && touched.memId}
                                errorMessage={errors.memId}
                            >
                                <InputGroup className="mb-4">
                                    <Input placeholder="아이디를 입력해주세요" />
                                    <Button>아이디 중복 검사</Button>
                                </InputGroup>
                            </FormItem>
                            {/* 아이디 끝 */}
                            {/* 닉네임 인풋박스 */}
                            <FormItem
                                label="닉네임"
                                invalid={errors.memNick && touched.memNick}
                                errorMessage={errors.memNick}
                            >
                                <InputGroup className="mb-4">
                                    <Input placeholder="닉네임을 입력해주세요" />
                                    <Button>닉네임 중복 검사</Button>
                                </InputGroup>

                            </FormItem>
                            {/* 이메일 */}
                            {/* 이메일 중복검사 */}
                            <FormItem
                                label="Email"
                                invalid={errors.email && touched.email}
                                errorMessage={errors.email}
                            >
                                <InputGroup className="mb-4">
                                    <Input placeholder="이메일 입력해주세요" />
                                    <Button>이메일 중복 검사</Button>
                                </InputGroup>

                            </FormItem>
                            {/* 출생년도 */}
                            <FormItem
                                label="출생년도"
                                invalid={errors.memBirth && touched.memBirth}
                                errorMessage={errors.memBirth}
                            >
                                <Field
                                    type="Date"
                                    autoComplete="off"
                                    name="memBirth"
                                    component={Input}
                                />
                            </FormItem>
                            {/* 성별 */}
                            <FormItem
                                label="성별"
                                invalid={errors.memGender && touched.memGender}
                                errorMessage={errors.memGender}
                            >
                                <FormItem>
                                    <Radio.Group className="mr-4">
                                        <Radio value={'M'}>남성</Radio>
                                        <Radio value={'W'}>여성</Radio>
                                    </Radio.Group>
                                </FormItem>
                            </FormItem>
                            <FormItem
                                label="Password"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Password"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <FormItem
                                label="Confirm Password"
                                invalid={
                                    errors.confirmPassword &&
                                    touched.confirmPassword
                                }
                                errorMessage={errors.confirmPassword}
                            >
                                <Field
                                    autoComplete="off"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting
                                    ? 'Creating Account...'
                                    : 'Sign Up'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>Already have an account? </span>
                                <ActionLink to={signInUrl}>Sign in</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUpForm
