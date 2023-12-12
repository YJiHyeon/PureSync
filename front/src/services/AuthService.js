import ApiService from './ApiService'
import Axios from 'axios'
import TokenCookie from './tokenCookie'


export async function apiSignIn(data) {
    const POST_URL = `http://localhost:9000/api/member/login`;
    try {
        const response = await Axios.post(POST_URL, data, {withCredentials: true});
        TokenCookie(response.data.data.access_token);
        return response.data;
    } catch (error) {
        console.error('Login error', error);
        throw error;
    }
}

export async function apiSignUp(data) {
    return ApiService.fetchData({
        url: '/sign-up',
        method: 'post',
        data,
    })
}

export async function apiSignOut(data) {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
        data,
    })
}

export async function apiForgotPassword(data) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}