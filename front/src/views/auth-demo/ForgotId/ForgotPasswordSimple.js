import React from 'react'
import ForgotIdForm from 'views/auth/ForgotId/ForgotIdForm'
import Simple from 'components/layout/AuthLayout/Simple'

const ForgotPasswordSimple = (props) => {
    return (
        <Simple>
            <ForgotIdForm
                disableSubmit={true}
                signInUrl="/auth/sign-in-simple"
                {...props}
            />
        </Simple>
    )
}

export default ForgotPasswordSimple
