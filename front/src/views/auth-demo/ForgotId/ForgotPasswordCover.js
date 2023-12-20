import React from 'react'
import ForgotIdForm from 'views/auth/ForgotId/ForgotIdForm'
import Cover from 'components/layout/AuthLayout/Cover'

const ForgotPasswordCover = (props) => {
    return (
        <Cover>
            <ForgotIdForm
                disableSubmit={true}
                signInUrl="/auth/sign-in-cover"
                {...props}
            />
        </Cover>
    )
}

export default ForgotPasswordCover
