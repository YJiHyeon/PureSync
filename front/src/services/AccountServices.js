import ApiService from './ApiService'
import SendHeaderCookie from 'utils/hooks/getHeaderCookie'

export async function apiGetAccountSettingData() {
    const token = SendHeaderCookie(); 
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/my',
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
}

// export async function apiPutSettingData() {
//     const token = SendHeaderCookie(); 
//     return ApiService.fetchData({
//         url: 'http://localhost:9000/api/my',
//         method: 'put',
//         headers: {
//             'Authorization': `Bearer ${token}`,
//         },
//     })
// }


export async function apiGetAccountSettingIntegrationData() {
    return ApiService.fetchData({
        url: '/account/setting/integration',
        method: 'get',
    })
}

export async function apiGetAccountSettingBillingData() {
    return ApiService.fetchData({
        url: '/account/setting/billing',
        method: 'get',
    })
}

export async function apiGetAccountInvoiceData(params) {
    return ApiService.fetchData({
        url: '/account/invoice',
        method: 'get',
        params,
    })
}

export async function apiGetAccountLogData(data) {
    return ApiService.fetchData({
        url: '/account/log',
        method: 'post',
        data,
    })
}

export async function apiGetAccountFormData() {
    return ApiService.fetchData({
        url: '/account/form',
        method: 'get',
    })
}
