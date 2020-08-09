<template>
    <div>
        <div class="row">
            <div class="col-md-12 text-center" v-if="cart.length == 0">
                <i class="ni ni-bag-17 ni-5x text-black-50"></i>
                <p class="lead text-black-50">{{this.$ml.get('no_data_cart')}}</p>
            </div>
            <div class="d-none d-md-block col-md-12 bg-white pt-2 pb-5 text-black text-center" v-if="cart.length > 0">
                <div class="row" v-for="(element,key) in cart" :key="key">
                    <div class="col-4">
                        <img v-if="element.product" :src="element.product.main_image" style="width: 90px" alt="">
                    </div>
                    <div class="col-3 text-left">
                    <span style="font-size: 12px" class="font-weight-bold text-black">
                        {{element.product_translation.title}} <br>
                        <!--                        <span v-for="(pov , k) in element.pov.product_option_value_details" :key="k">-->
                        <!--                            {{pov.option_value.translated.title}}-->
                        <!--                            {{pov.option_value.unit ? pov.option_value.unit.translated.title : ''}}-->
                        <!--                            <span v-if="k+1 != element.pov.product_option_value_details.length">,</span>-->
                        <!--                        </span>-->
                    </span>
                        <div class="form-group input-group input-group-alternative mt-2">
                            <div class="input-group-prepend p-1">
                                <button style="cursor: pointer;outline: 0" class="input-group-text p-1"
                                        @click="plusAmount(element,key)">
                                    <i class="fa fa-minus text-black"></i>
                                </button>
                            </div>
                            <!--                               @keypress.prevent-->
                            <input aria-describedby="addon-right addon-left"
                                   @change="updateAmount(element , key)"
                                   v-model="element.min_amount_needed" style="height: 30px;"
                                   class="form-control text-center p-1">
                            <div class="input-group-append p-1">
                                <button style="cursor: pointer;outline: 0" class="input-group-text p-1"
                                        @click="minusAmount(element,key)">
                                    <i class="fa fa-plus text-black"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <small class="font-weight-bold text-black-50">
                            <slot v-if="parseFloat(element.pov.price).toFixed(3) == 0">
                                <span class="badge badge-info"
                                      style="font-size: 13px">{{$ml.get('undefined_price')}}</span>
                            </slot>
                            <slot v-if="parseFloat(element.pov.price).toFixed(3) != 0">
                                {{parseFloat(element.pov.price).toFixed(3)}}
                                <small>{{getCurrency()}}</small>
                            </slot>
                        </small>
                    </div>
                    <div class="col-2">
                        <button class="btn btn-danger btn-sm" @click="removeCart(element,key)">
                            <i class="fa fa-remove"></i>
                        </button>
                    </div>
                    <div class="col-12">
                        <hr class="m-2">
                    </div>
                </div>

                <!--<p class="lead text-black-50 p-0 m-0" style="font-size: 14px">-->
                <!--{{this.$ml.get('shipping_data')}} {{$helper.getSettings().delivery_cost_condition}}-->
                <!--{{this.$ml.get('shipping_data2')}} {{$helper.getSettings().delivery_cost}}-->
                <!--</p>-->
                <div class="row">
                    <div class="col-6">
                        <ul class="list-unstyled text-left p-3">
                            <li>
                                <b>{{this.$ml.get('sub_total')}}</b>
                            </li>
                            <li v-if="current_coupon">
                                <b>{{this.$ml.get('coupon_total')}}</b>
                            </li>
                            <li>
                                <b>{{this.$ml.get('total')}}</b>
                            </li>
                        </ul>
                    </div>
                    <div class="col-6">
                        <ul class="list-unstyled text-right p-3">
                            <li>
                                <b>{{getTotalCost}}</b>
                                {{$store.getters.getCurrency}}
                            </li>
                            <li v-if="current_coupon">
                                <b v-if="current_coupon.value" style="color: #f00;">
                                    - ( {{parseFloat(current_coupon.value).toFixed(3)}})
                                </b>
                                {{current_coupon.type == 'value' ? $store.getters.getCurrency : '%'}}
                            </li>
                            <li>
                                <b>{{getFinalTotalCost}}</b>
                                {{$store.getters.getCurrency}}
                            </li>
                        </ul>
                    </div>

                    <!--<div class="col-md-12">-->
                    <!--&lt;!&ndash;                    <router-link class="btn btn-outline-danger btn-block" @click="CloseModal()" :to="{name:'checkout'}">&ndash;&gt;-->
                    <!--&lt;!&ndash;                        {{this.$ml.get('submit_checkout')}}&ndash;&gt;-->
                    <!--&lt;!&ndash;                    </router-link>&ndash;&gt;-->
                    <!--<button class="btn btn-outline-info btn-block" @click="closeModal()">-->
                    <!--{{this.$ml.get('submit_checkout')}}-->
                    <!--</button>-->
                    <!--&lt;!&ndash;                    data-dismiss="modal"&ndash;&gt;-->
                    <!--</div>-->
                </div>
            </div>
        </div>
        <div v-if="cart.length > 0">
            <div class="row mb-3 d-md-none" v-for="(element,key) in cart" :key="'cart'+key">
                <div class="col-6 p-0">
                    <div class="favItem">
                        <div class="item_header">
                            {{$ml.get('image')}}
                        </div>
                        <img v-if="element.product" :src="element.product.main_image" class="w-100 mt-1"
                             alt=""/>
                        <div class="mt-3">
                            <button class="btn btn-danger btn-md btn-block " @click="removeCart(element,key)">
                                <i class="fa fa-remove"></i> {{$ml.get('removecart')}}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-6 p-0">
                    <div class="favItem">
                        <div class="item_header">
                            {{$ml.get('product_name')}}
                        </div>
                        <div class="mt-2 mb-2 text-left text-black p-2">
                            <b>
                                {{element.product_translation.title}}
                            </b>
                        </div>
                    </div>
                    <div class="row_item text-left p-1">
                        <div class="row_item_key">
                            {{$ml.get('category')}}
                        </div>
                        <div class="row_item_value">
                            {{element.product ? element.product.category ? element.product.category.translated.title :
                            '' : ''}}
                        </div>
                    </div>
                    <div class="row_item text-left p-1">
                        <div class="row_item_key">
                            {{$ml.get('price')}}
                        </div>
                        <div class="row_item_value">
                            {{parseFloat(element.pov.price).toFixed(3)}} {{$store.getters.getCurrency}}
                        </div>
                    </div>
                    <div class="row_item text-left p-1">
                        <div class="row_item_key">
                            {{$ml.get('quantity')}}
                        </div>
                        <div class="row_item_value_qty">
                            <div>
                                <div class="form-group input-group input-group-alternative mb-0 pb-0">
                                    <div class="input-group-prepend p-1">
                                        <button style="cursor: pointer;outline: 0" class="input-group-text p-1"
                                                @click="plusAmount(element,key)">
                                            <i class="fa fa-minus text-black"></i>
                                        </button>
                                    </div>
                                    <!--                               @keypress.prevent-->
                                    <input aria-describedby="addon-right addon-left"
                                           @change="updateAmount(element , key)"
                                           v-model="element.min_amount_needed" style="height: 30px;"
                                           class="form-control text-center p-1">
                                    <div class="input-group-append p-1">
                                        <button style="cursor: pointer;outline: 0" class="input-group-text p-1"
                                                @click="minusAmount(element,key)">
                                            <i class="fa fa-plus text-black"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row_item text-left p-1">
                        <div class="row_item_key">
                            {{$ml.get('sub_total')}}
                        </div>
                        <div class="row_item_value">
                            {{(parseFloat(element.pov.price) * parseFloat(element.min_amount_needed)).toFixed(3)}}
                        </div>
                    </div>

                </div>
                <div class="col-12">
                    <hr class="m-2">
                </div>
            </div>
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-6 mt-2 text-center text-md-left" @click="dismissModal()">
                        <button class="btn btn-default" style="background: #5d5d5d">
                            {{$ml.get('continue_shopping')}}
                        </button>
                    </div>
                    <div class="col-md-6 mt-2 text-center text-md-right" @click="closeModal()">
                        <button class="btn btn-info">
                            {{$ml.get('submit_checkout')}}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import Vue from 'vue'
    import Message from 'vue-m-message'

    Vue.use(Message);

    export default {
        name: "cart",
        data() {
            return {
                cart_elements: [],
                current_payment: null,
                current_address: null,
                current_coupon: null,
                offerSingleModel: [],
                offerMultiModel: []
            }
        },
        mounted() {
            this.cart_elements = this.cart;
            let current_payment = localStorage.getItem('current_payment');
            let current_coupon = localStorage.getItem('current_coupon');
            let current_address = localStorage.getItem('current_address');
            if (current_coupon) {
                current_coupon = JSON.parse(current_coupon)
            }
            this.current_payment = current_payment;
            this.current_address = current_address;
            this.current_coupon = current_coupon;
        },
        computed: {
            ...mapState([
                'cart', 'offers', 'favourites'
            ]),
            getTotalCost() {
                let vm = this;
                let total = 0;

                $.each(vm.cart, function (index, item) {
                    total = total + (item.min_amount_needed * item.pov.price);
                });
                return total.toFixed(3);
            },
            getTotalOffers() {
                let vm = this;
                let total = 0;

                $.each(vm.offers, function (index, item) {
                    total = total + item.discount;
                });
                return total.toFixed(3);
            },
            getFinalTotalCost() {
                let vm = this;
                let total_order = vm.getTotalCost;
                let total_offers = 0;// vm.getTotalOffers;
                let coupon_value = 0;
                if (vm.current_coupon) {
                    if (vm.current_coupon.type == 'value') {
                        coupon_value = vm.current_coupon.value;
                    } else {
                        coupon_value = total_order * (vm.current_coupon.value / 100);
                    }
                }
                return Math.max(0, (total_order - total_offers - coupon_value)).toFixed(3);
            }
        },
        methods: {
            closeModal() {
                let vm = this;
                $('div.modal.fade.show.d-block').trigger('click')
                vm.$router.push({'name': 'checkout'})
            },
            dismissModal() {
                let vm = this;
                $('div.modal.fade.show.d-block').trigger('click')
            },
            minusAmount(element, key) {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                element.min_amount_needed++;

                let av_quantity = vm.checkValidQuantity(element);
                if (av_quantity.status) {
                    vm.$store.dispatch('updateToCart', element, key);
                } else {
                    vm.errorMessage(av_quantity.available)
                    element.min_amount_needed = av_quantity.available;
                }

                setTimeout(() => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }, 1000)
            },
            plusAmount(element, key) {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;

                if (element.min_amount_needed == 1) {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    return
                }
                element.min_amount_needed--;

                let av_quantity = vm.checkValidQuantity(element);
                if (av_quantity.status) {
                    vm.$store.dispatch('updateToCart', element, key);
                } else {
                    vm.errorMessage(av_quantity.available)
                    element.min_amount_needed = av_quantity.available;
                }

                setTimeout(() => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }, 1000)
            },
            updateAmount(element, key) {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;

                let av_quantity = vm.checkValidQuantity(element);
                if (av_quantity.status) {
                    vm.$store.dispatch('updateToCart', element, key);
                } else {
                    vm.errorMessage(av_quantity.available)
                    element.min_amount_needed = av_quantity.available;
                }

                setTimeout(() => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }, 1000)
            },
            checkValidQuantity(element) {
                console.log(element)
                if (element.pov.store_detail) {
                    let reserved = element.pov.store_detail.reserved;
                    let quantity = element.pov.store_detail.quantity;
                    let available = quantity - reserved;

                    if (available >= element.min_amount_needed) {
                        return {
                            status: true,
                            available: available
                        }
                    }
                    return {
                        status: false,
                        available: available
                    }
                }
                return {
                    status: false,
                    available: 0
                }

            },
            errorMessage(amount = 0) {
                let vm = this;
                Message({
                    title: vm.$ml.get('error'),
                    message: vm.$ml.get('no_sufficient_amount') + ' ' + amount,
                    className: 'bg-warning text-white',
                    zIndex: 9999999,
                    iconImg: require('@/assets/error.png'),
                    position: 'bottom-center',
                    // type: 'error',
                    showClose: true
                });
            },
            getCurrency() {
                return this.$store.getters.getCurrency
            },
            removeCart(element, key) {
                let vm = this;
                let product_id = element.pov.id;
                let filtered_cart = vm.cart.filter((value, index, arr) => {
                    if (product_id == value.pov.id) {
                        return false
                    }
                    return true;
                });
                // console.log(key)
                vm.$store.dispatch('deleteToCart', {key: key, element: element});
            },
            ...mapActions([
                'addToCart',
                'deleteToCart',
                'checkStorage',
                'updateToCart',
                'saveToCart'
            ]),
        }
    }
</script>

<style scoped>

</style>