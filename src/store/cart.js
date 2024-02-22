import {createStore} from 'vuex';

function initState(){
    return {
        cartMenus: JSON.parse(localStorage.getItem('cartMenus')) || [],
        totalPrice: localStorage.getItem('totalPrice') || 0,
        totalQuantity: localStorage.getItem('totalQuantity') || 0,
        storeId: localStorage.getItem('storeId') || 0
    }
}

function updateLocalStorage(cartMenus, totalPrice, totalQuantity, storeId){
    localStorage.setItem('cartMenus', JSON.stringify(cartMenus));
    localStorage.setItem('totalPrice', totalPrice);
    localStorage.setItem('totalQuantity', totalQuantity);
    localStorage.setItem('storeId', storeId);
}

export default createStore({
    state: initState,
    mutations: {
        addToCart(state, orderInfo){
            console.log("mutations 진입!");
            const existOrderInfo = state.cartMenus.find(m => m.id == orderInfo.id);
            if (existOrderInfo){
                existOrderInfo.quantity += orderInfo.quantity;
                existOrderInfo.price += orderInfo.price;
            } else {
                state.cartMenus.push(orderInfo);
            }
            state.totalPrice = parseInt(state.totalPrice) + orderInfo.price;
            state.totalQuantity = parseInt(state.totalQuantity) + orderInfo.quantity;
            state.storeId = orderInfo.storeId;
            updateLocalStorage(state.cartMenus, state.totalPrice, state.totalQuantity, state.storeId);
        }, 
        clearCart(state){
            state.cartMenus = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            state.storeId = 0;
            updateLocalStorage(state.cartMenus, state.totalPrice, state.totalQuantity, state.storeId);
        }
    },
    actions: {
        addToCart(context, orderInfo){
            context.commit('addToCart', orderInfo);
        },
        clearCart(context){
            context.commit('clearCart');
        }
    },
    getters: {
        getCartMenus: state => state.cartMenus,
        getTotalPrice: state => state.totalPrice,
        getTotalQuantity: state => state.totalQuantity,
        getStoreId: state => state.storeId
    }
});