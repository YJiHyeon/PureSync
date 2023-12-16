import ApiService from './ApiService'
import SendHeaderCookie from 'utils/hooks/getHeaderCookie'

export async function apiGetMemberDashboardData(selectedDate) {
    const token = SendHeaderCookie(); 
    let url = process.env.REACT_APP_HOST_URL + '/api/dashboard';

    if (selectedDate) {
        url += `/${selectedDate}`;
    }

    return ApiService.fetchData({
        url,
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
}

export async function getPositive () {
    const token = SendHeaderCookie(); 
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/positive',
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}
