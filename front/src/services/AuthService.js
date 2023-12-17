import ApiService from './ApiService'
import Axios from 'axios'
import TokenCookie from './tokenCookie'



export async function apiSignIn(data) {
    const POST_URL = process.env.REACT_APP_HOST_URL + `/api/member/login`;
    
    // 서비스단에서 try catch 없애기
    try {
        const response = await Axios.post(POST_URL, data, {withCredentials: true});
        console.log(response);
        if (response.status !== 404)  {
            TokenCookie(response.data.data.access_token);
            return response.data;       
        }

        console.log(response);
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
    // const POST_URL = `http://localhost:9000/api/member/logout`;
    try{
        // const response = await Axios.post(POST_URL, data, {withCredentials: false});
        // return response.data;
    }catch(e){
        console.log(e);
    }
}

export async function apiForgotPassword(data) {
    const GET_URL = `http://localhost:9000/api/member/searchId/${data.email}`;
    try{
        const response = await Axios.get(GET_URL)
        return response;
    }catch(e){
        return e;
    }
}

export async function apiResetPassword(data) {
    console.log(data)
    const POST_URL = `http://localhost:9000/api/member/searchPassword`
   try{
    const response = await Axios.post(POST_URL,data);
    return response
   }catch(e){
    console.log(e);
    return e;
   }
}