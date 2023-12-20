import React from 'react'

const authRoute = [
    {
        key: 'signIn',
        path: `/sign-in`,
        component: React.lazy(() => import('views/auth/SignIn')),
        // component: React.lazy(() => import('views/member_jaegun/SignIn')),
        authority: [],
    },
    {
        key: 'signUp',
        path: `/sign-up`,
        component: React.lazy(() => import('views/auth/SignUp')),
        // component: React.lazy(() => import('views/member_jaegun/SignUp')),
        authority: [],
    },
    {
        key: 'forgotPassword',
        path: `/forgotId`,
        component: React.lazy(() => import('views/auth/ForgotId')),
        // component: React.lazy(() => import('views/member_jaegun/ForgotPassword')),
        authority: [],
    },
    {
        key: 'resetPassword',
        path: `/reset-password`,
        component: React.lazy(() => import('views/auth/ResetPassword')),
        // component: React.lazy(() => import('views/member_jaegun/ResetPassword')),
        authority: [],
    },
    {
        key: 'landing',
        path: `/landing`,
        component: React.lazy(() => import('views/landing/landing')),
        authority: [],
        meta: {
            layout: 'blank'
        }
    },
]

export default authRoute