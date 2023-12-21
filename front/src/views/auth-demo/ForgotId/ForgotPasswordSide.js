import React from 'react'
import ForgotIdForm from 'views/auth/ForgotId/ForgotIdForm'
import Side from 'components/layout/AuthLayout/Side'

const ForgotPasswordCover = (props) => {
    return (
        <Side>
            <ForgotIdForm
                disableSubmit={true}
                signInUrl="/auth/sign-in-side"
                {...props}
            />
        </Side>
    )
}

export default ForgotPasswordCover
