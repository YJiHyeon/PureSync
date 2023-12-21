import { APP_PREFIX_PATH } from 'constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'
import {  USER } from 'constants/roles.constant'

const appsNavigationConfig = [
    {
        // key: 'apps',
        // path: '',
        // title: 'APPS',
        // translateKey: 'nav.apps',
        // icon: 'dashboard',
        // type: NAV_ITEM_TYPE_TITLE,
        // authority: [ USER],
        // subMenu: [
            
                key: 'apps.home',
                path: `/home`,
                title: '대시보드',
                translateKey: 'nav.home',
                icon: 'dashboard',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],    
                // authority: [ USER],
                subMenu: [
                    
                ],
            


// 기존 ------------------------------------------------------------------------------------------
        // ],
    },
]

export default appsNavigationConfig
