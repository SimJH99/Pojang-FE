import OrderCart from '@/views/order/OrderCart.vue';
import OrderDetail from '@/views/order/OrderDetail.vue';

export const orderRoutes = [
    {
        path: '/cart', 
        name: 'OrderCart',
        component: OrderCart,
    },
    {
        path: '/order', 
        name: 'OrderDetail',
        component: OrderDetail,
    },
];