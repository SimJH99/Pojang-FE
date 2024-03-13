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
            // const sameMenus = state.cartMenus.filter(m => m.menuId == orderInfo.menuId);
            const existOrderInfo = state.cartMenus.find(m => m.menuId == orderInfo.menuId);
            console.log("cartMenus: " + JSON.stringify(existOrderInfo));
            if (existOrderInfo){
                // const existOptions = existOrderInfo.selectedMenuOptions;
                // const options = orderInfo.selectedMenuOptions;
                // const existOptions = existOrderInfo.selectedMenuOptions.sort((a, b) => a.id - b.id);
                // const options = orderInfo.selectedMenuOptions.sort((a, b) => a.id - b.id);
                existOrderInfo.menuQuantity += orderInfo.menuQuantity;
                existOrderInfo.totalPrice += orderInfo.totalPrice;
                // let count = 0;
                // for (const existOption in existOptions) {
                //     for (const option in options){
                //         if (existOption.id == option.id) {
                //             count++;
                //             break;
                //         }
                //     }
                // }
                // console.log("count: " + count);
                // console.log("options length: " + options.length);
                // if (count == options.length){
                //     existOrderInfo.menuQuantity += orderInfo.menuQuantity;
                //     existOrderInfo.totalPrice += orderInfo.totalPrice;
                // } else {
                //     state.cartMenus.push(orderInfo);
                // }
            } else {
                state.cartMenus.push(orderInfo);
            }
            state.totalPrice = parseInt(state.totalPrice) + orderInfo.totalPrice;
            state.totalQuantity = parseInt(state.totalQuantity) + orderInfo.menuQuantity;
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