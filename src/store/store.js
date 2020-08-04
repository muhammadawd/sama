import Vue from 'vue'
import Vuex from 'vuex'

import ls from './localStorageService'
import idbs from './indexedDBService'
import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        favourites: [],
        cart: [],
        offers: [],
        auth: null,
        currency: 'د.ك',
        total_offers: 0,
        selected_offers: [],
        dataFields: ['cart', 'favourites', 'offers', 'auth']
    },
    getters: {
        getCurrency: state => {
            let current = localStorage.getItem('current_currency');
            if (current) {
                return current;
            }
            return state.currency;
        },
        getTotalOffers: state => {
            return state.total_offers;
        }
    },
    mutations: {
        setState(state, {field, data}) {
            Vue.set(state, field, data)
        },

        addToOffers(state, newTodo) {
            state.offers.push(newTodo)
        },
        addToCart(state, newTodo) {
            if (newTodo != undefined) {
                state.cart.push(newTodo)
            }
        },
        addToFavourite(state, newTodo) {
            if (newTodo != undefined) {
                state.favourites.push(newTodo)
            }
        },

        clearCart(state) {
            state.cart = [];
        },
        clearFavourite(state) {
            state.favourites = [];
        },
        clearOffers(state) {
            state.offers = [];
        },

        setTotalOffers(state, data) {
            state.total_offers = data.total;
            state.selected_offers = data.offers;
        },
        updateToCart(state, newTodo, index) {
            // console.log(index)
            // console.log(newTodo)
            // console.log(state.cart)
        },
        deleteToCart(state, todoIndex) {
            state.cart.splice(todoIndex, 1)
        },
        updateToFavourite(state, newTodo, index) {
            // console.log(index)
            // console.log(newTodo)
            // console.log(state.cart)
        },
        deleteToFavourite(state, todoIndex) {
            state.favourites.splice(todoIndex, 1)
        },

        addAuthUser(state, authUser) {
            state.auth = authUser
        },
        deleteAuthUser(state) {
            state.auth = null
        },
    },
    actions: {
        clearCart({commit, dispatch}) {
            commit('clearCart');
            dispatch('clearToCart');
        },
        clearFavourite({commit, dispatch}) {
            commit('clearFavourite');
            dispatch('clearToFavourite');
        },
        clearOffers({commit, dispatch}) {
            commit('clearOffers');
            dispatch('clearToOffers');
        },
        addToCart({commit, dispatch}, newTodo) {
            commit('addToCart', newTodo);
            dispatch('saveToCart');
            dispatch('syncCart')
        },
        addToFavourite({commit, dispatch}, newTodo) {
            commit('addToFavourite', newTodo);
            dispatch('saveToFavourites');
            dispatch('syncFav')
        },
        saveToOffersWithoutSync({commit, dispatch}, newTodo) {
            commit('addToCart', newTodo);
            dispatch('saveToCart');
        },
        addToOffers({commit, dispatch}, newTodo) {
            commit('addToOffers', newTodo);
            dispatch('saveToOffers');
        },
        updateToCart({commit, dispatch}, newTodo) {
            commit('updateToCart', newTodo);
            dispatch('saveToCart');
            dispatch('syncCart')
        },
        deleteToCart({commit, dispatch}, todoInfo) {
            commit('deleteToCart', todoInfo.key);
            dispatch('saveToCart');
            dispatch('syncDeleteCart', todoInfo.element)
        },
        updateToFavourites({commit, dispatch}, newTodo) {
            commit('updateToFavourite', newTodo);
            dispatch('saveToFavourites');
            dispatch('syncFav')
        },
        deleteToFavourites({commit, dispatch}, todoInfo) {
            commit('deleteToFavourite', todoInfo.key);
            dispatch('saveToFavourites');
            dispatch('syncDeleteFav', todoInfo.element)
        },
        addAuthUser({commit, dispatch}, authUser) {
            commit('addAuthUser', authUser);
            dispatch('syncGetCart');
            dispatch('syncGetFav');
            dispatch('saveAuthUser')
        },
        deleteAuthUser({commit, dispatch}) {
            commit('deleteAuthUser');
            dispatch('removeAuthUser')
        },
        checkStorage({state, commit}) {
            state.dataFields.forEach(async field => {
                try {
                    let data = await idbs.checkStorage(field)

                    // IndexedDB did not find the data, try localStorage
                    if (data === undefined) data = ls.checkStorage(field)

                    // LocalStorage did not find the data, reset it
                    if (data === null) {

                        if (field === 'auth') {
                            data = null
                        }
                        if (field === 'cart') {
                            data = []
                        }
                        if (field === 'favourites') {
                            data = []
                        }
                        if (field === 'offers') {
                            data = []
                        }
                    }

                    commit('setState', {field, data})
                } catch (e) {
                    // The value in storage was invalid or corrupt so just set it to blank
                    commit('setState', {field, data: []})
                }
            })
        },
        async saveToCart({state}) {
            try {
                await Promise.all(state.dataFields.map(field => idbs.saveToStorage(field, state[field])))
                // state.dataFields.forEach(field => ls.saveToStorage(field, state[field]))
            } catch (e) {
                state.dataFields.forEach(field => ls.saveToStorage(field, state[field]))
            }
        },
        async saveToOffers({state}) {
            try {
                // await Promise.all(idbs.saveToStorage('offers', state['offers']));
                await Promise.all(state.dataFields.map(field => idbs.saveToStorage(field, state[field])))
                // state.dataFields.forEach(field => ls.saveToStorage(field, state[field]))
            } catch (e) {
                ls.saveToStorage('offers', state['offers'])
            }
        },
        async saveToFavourites({state}) {
            try {
                // await Promise.all(idbs.saveToStorage('offers', state['offers']));
                await Promise.all(state.dataFields.map(field => idbs.saveToStorage(field, state[field])))
                // state.dataFields.forEach(field => ls.saveToStorage(field, state[field]))
            } catch (e) {
                ls.saveToStorage('favourites', state['favourites'])
            }
        },
        async saveAuthUser({state}) {
            try {
                await Promise.all(state.dataFields.map(field => idbs.saveToStorage(field, state[field])))
                // state.dataFields.forEach(field => ls.saveToStorage(field, state[field]))
            } catch (e) {
                state.dataFields.forEach(field => ls.saveToStorage(field, state[field]))
            }
        },
        async clearToCart({state}) {
            try {
                await Promise.all(idbs.clearAllStorage('cart'))
                // state.dataFields.forEach(field => ls.saveToStorage(field, state[field]))
            } catch (e) {
                ls.clearAllStorage('cart')
            }
        },
        async clearToFavourite({state}) {
            try {
                await Promise.all(idbs.clearAllStorage('favourites'))
                // state.dataFields.forEach(field => ls.saveToStorage(field, state[field]))
            } catch (e) {
                ls.clearAllStorage('favourites')
            }
        },
        async clearToOffers({state}) {
            try {
                await Promise.all(idbs.clearAllStorage('offers'))
                // state.dataFields.forEach(field => ls.saveToStorage(field, state[field]))
            } catch (e) {
                ls.clearAllStorage('offers')
            }
        },
        async removeAuthUser({state}) {
            try {
                await Promise.all(idbs.clearAllStorage('auth'))
                // state.dataFields.forEach(field => ls.saveToStorage(field, state[field]))
            } catch (e) {
                ls.clearAllStorage('auth')
            }
        },
        syncDeleteCart({state, dispatch}, toDeleteInfo) {

            let pov_id = toDeleteInfo.pov.id;
            // sync cart data post request
            let auth = JSON.parse(JSON.stringify(state.auth));


            if (auth) {
                let token = auth.token;

                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.DELETE_CART, {
                    product_option_value_ids: [pov_id],
                }, {
                    headers: {Authorization: "Bearer " + token}
                }).then((response) => {
                    console.log(response.data)
                }).catch((error) => {

                })
            }
        },
        syncCart({state, dispatch}) {
            // sync cart data post request
            let cart = JSON.parse(JSON.stringify(state.cart));
            let auth = JSON.parse(JSON.stringify(state.auth));

            let branch_ids = [];
            let prices = [];
            let product_option_value_ids = [];
            let quantities = [];
            let store_ids = [];
            let purchases = [];

            $.each(cart, function (index, item) {
                branch_ids.push(item.branch_id);
                store_ids.push(item.store_id);
                prices.push(item.pov.price);
                product_option_value_ids.push(item.pov.id);
                quantities.push(item.min_amount_needed);
            });

            if (auth) {
                let token = auth.token;

                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.SYNC_CART, {
                    branch_ids: branch_ids,
                    store_ids: store_ids,
                    prices: prices,
                    product_option_value_ids: product_option_value_ids,
                    quantities: quantities,
                }, {
                    headers: {Authorization: "Bearer " + token}
                }).then((response) => {
                    let status = response.data.status;
                    let data = response.data.data;
                    // console.log(data)
                    if (status) {

                        if (data.cart) {
                            // state.cart = [];
                            // dispatch('saveToOffersWithoutSync');
                            $.each(data.cart.items, function (index, item) {
                                let prepared_data = {
                                    product_id: item.product.product_option_value.product_id,
                                    branch_id: item.branch_id,
                                    store_id: item.store_id,
                                    product_translation: item.product.translated,
                                    min_amount_needed: item.quantity,
                                    pov: item.product.product_option_value
                                };
                                let local_exsit = false;
                                $.each(state.cart, function (index, local_item) {
                                    if (prepared_data.pov.id == local_item.pov.id) {
                                        local_exsit = true;
                                    }
                                });
                                if (!local_exsit) {
                                    dispatch('saveToOffersWithoutSync', prepared_data);
                                }
                            })
                        }
                        if (data.offers) {
                            state.offers = [];
                            dispatch('saveToOffers');
                            $.each(data.offers, function (index, item) {
                                dispatch('addToOffers', item);
                            });
                        }
                    }
                });
                return;
            }

            // CHECK_FOR_PROMOTION
            axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.CHECK_FOR_PROMOTION, {
                branches_ids: branch_ids,
                store_ids: store_ids,
                prices: prices,
                product_option_value_ids: product_option_value_ids,
                quantities: quantities,
            }).then((response) => {
                let status = response.data.status;
                let data = response.data.data;
                if (status) {
                    if (data.offers) {
                        state.offers = [];
                        dispatch('saveToOffers');
                        $.each(data.offers, function (index, item) {
                            dispatch('addToOffers', item);
                        });
                    }
                }

            }).catch((error) => {

            });
        },
        syncGetCart({state, dispatch}) {
            let auth = JSON.parse(JSON.stringify(state.auth));
            if (auth) {
                let token = auth.token;
                // get cart data
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.GET_ALL_CART, {
                    headers: {Authorization: "Bearer " + token}
                }).then((response) => {
                    let status = response.data.status;
                    let data = response.data.data;
                    if (status) {
                        state.cart = [];
                        if (data.cart) {
                            $.each(data.cart.items, function (index, item) {
                                let prepared_data = {
                                    product_id: item.product.product_option_value.product_id,
                                    branch_id: item.branch_id,
                                    store_id: item.store_id,
                                    product_translation: item.product.translated,
                                    min_amount_needed: item.quantity,
                                    pov: item.product.product_option_value
                                };
                                dispatch('addToCart', prepared_data);
                            })
                        }

                    }
                });

            }
        },

        syncDeleteFav({state, dispatch}, toDeleteInfo) {

            let pov_id = toDeleteInfo.pov.id;
            // sync cart data post request
            let auth = JSON.parse(JSON.stringify(state.auth));


            if (auth) {
                let token = auth.token;

                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.DELETE_FAV, {
                    product_option_value_ids: [pov_id],
                }, {
                    headers: {Authorization: "Bearer " + token}
                }).then((response) => {
                    console.log(response.data)
                }).catch((error) => {

                })
            }
        },
        syncFav({state, dispatch}) {
            // sync cart data post request
            let favourites = JSON.parse(JSON.stringify(state.favourites));
            let auth = JSON.parse(JSON.stringify(state.auth));

            // let branch_ids = [];
            // let prices = [];
            let product_option_value_ids = [];
            // let quantities = [];
            // let store_ids = [];
            // let purchases = [];

            $.each(favourites, function (index, item) {
                // branch_ids.push(item.branch_id);
                // store_ids.push(item.store_id);
                // prices.push(item.pov.price);
                product_option_value_ids.push(item.pov.id);
                // quantities.push(item.min_amount_needed);
            });

            if (auth) {
                let token = auth.token;

                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.SYNC_FAV, {
                    // branch_ids: branch_ids,
                    // store_ids: store_ids,
                    // prices: prices,
                    product_option_value_ids: product_option_value_ids,
                    // quantities: quantities,
                }, {
                    headers: {Authorization: "Bearer " + token}
                }).then((response) => {
                    let status = response.data.status;
                    let data = response.data.data;
                    // console.log(data)
                    if (status) {

                        if (data.wishlists) {
                            state.favourites = [];
                            // dispatch('saveToFavourites');
                            // $.each(data.wishlists, function (index, item) {
                            //     dispatch('addToFavourite', item);
                            // });
                        }
                    }
                });
                return;
            }
        },
        syncGetFav({state, dispatch}) {
            let auth = JSON.parse(JSON.stringify(state.auth));
            if (auth) {
                let token = auth.token;
                // get cart data
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.GET_ALL_FAV, {
                    headers: {Authorization: "Bearer " + token}
                }).then((response) => {
                    let status = response.data.status;
                    let data = response.data.data;
                    if (status) {
                        state.favourites = [];
                        $.each(data.wishlists, function (index, item) {
                            let prepared_data = {
                                product_id: item.product.product_option_value.product_id,
                                branch_id: item.branch_id,
                                store_id: item.store_id,
                                product_translation: item.product.translated,
                                min_amount_needed: item.quantity,
                                pov: item.product.product_option_value
                            };
                            dispatch('addToFavourite', prepared_data);
                        })

                    }
                });

            }
        },
    }
})