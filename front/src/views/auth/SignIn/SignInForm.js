import React from 'react'
import {
    Input,
    Button,
    Checkbox,
    FormItem,
    FormContainer,
    Alert,
} from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'


const validationSchema = Yup.object().shape({
    memId: Yup.string().required('ID를 입력해주세요.'),
    memPassword: Yup.string().required('PASSWORD를 입력해주세요.'),
    rememberMe: Yup.bool(),
})

const SignInForm = (props) => {
    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
        resetPasswordUrl = '/reset-password',
        signUpUrl = '/sign-up',
    } = props

    const [message, setMessage] = useTimeOutMessage()


    const { signIn } = useAuth()

    const onSignIn = async (values, setSubmitting) => {
        const { memId, memPassword } = values
        setSubmitting(true)

        const result = await signIn({ memId, memPassword })
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
                    memPassword: '',
                    rememberMe: true,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignIn(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="아이디"
                                invalid={errors.memId && touched.memId}
                                errorMessage={errors.memId}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="memId"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="비밀번호"
                                invalid={errors.memPassword && touched.memPassword}
                                errorMessage={errors.memPassword}
                            >
                                <Field
                                    autoComplete="off"
                                    name="memPassword"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <div className="ml-auto">
                                <Field
                                    className="mb-0"
                                    name="rememberMe"
                                    component={Checkbox}
                                    variant="twoTone"
                                    color="green-600"
                                    children="로그인 정보 저장"
                                />
                            </div>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                                className="mr-2 mb-2 mt-2"
                                color="green-600"
                            >
                                {isSubmitting ? '로그인 중' : '로그인'}
                            </Button>
                            <div className="mt-2 text-center">
                                <div className="flex justify-center gap-3">
                                    <div>
                                        <ActionLink to={forgotPasswordUrl}>
                                            아이디 찾기
                                        </ActionLink>
                                    </div>
                                    <div>
                                        <ActionLink to={resetPasswordUrl}>
                                            비밀번호 찾기
                                        </ActionLink>
                                    </div>
                                </div>
                                <div className="mt-2">    
                                    <span>계정이 없으신가요? </span>
                                    <ActionLink to={signUpUrl}>회원가입</ActionLink>
                                </div>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignInForm
