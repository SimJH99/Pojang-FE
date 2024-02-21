import MyInfoOwner from '@/views/Store/MyInfoOwner';
import MyStores from '@/views/Store/MyStores';
import MyStoreInfo from '@/views/Store/MyStoreInfo';
import MyInfoUpdate from '@/views/Store/MyInfoUpdate';
import StoreCreate from '@/views/Store/StoreCreate';

export const storeRoutes = [
    {
        path: '/my-info-owner',
        name: 'MyInfoOwner',
        component: MyInfoOwner,
    },
    {
        path: '/my-stores',
        name: 'MyStores',
        component: MyStores,
    },
    {
        path: '/my-store-info',
        name: 'MyStoreInfo',
        component: MyStoreInfo,
    },
    {
        path: '/my-info-update',
        name: 'MyInfoUpdate',
        component: MyInfoUpdate,
    },
    {
        path: '/store-create',
        name: 'StoreCreate',
        component: StoreCreate,
    },
];