import MyInfoOwner from '@/views/Store/MyInfoOwner';
import MyStores from '@/views/Store/MyStores';
import UpdateOwner from '@/views/Store/UpdateMyInfo';
import MyStoreInfo from '@/views/Store/MyStoreInfo';
import StoreCreate from '@/views/Store/StoreCreate';
import StoreUpdate from '@/views/Store/StoreUpdate';

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
        path: '/:id/my-store-info',
        name: 'MyStoreInfo',
        component: MyStoreInfo,
        props: true,
    },
    {
        path: '/update-my-info',
        name: 'UpdateOwner',
        component: UpdateOwner,
    },
    {
        path: '/store-create',
        name: 'StoreCreate',
        component: StoreCreate,
    },
    {
        path: '/:id/store-update',
        name: 'StoreUpdate',
        component: StoreUpdate,
    },
];