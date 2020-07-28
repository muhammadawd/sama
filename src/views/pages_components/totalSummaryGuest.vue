<template>
    <div class="card text-left" style="border-radius: 0  0  55px 0">
        <div class="card-header text-black" style="background: #fafafa">
            <b>{{this.$ml.get('order_details')}}</b>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12 mt-4" style="border-bottom: 1px solid #ccc;cursor: pointer"
                     @click="openCard('orderSummaryContainer')">
                    <ul class="p-0 list-unstyled">
                        <li style="overflow: hidden;cursor: pointer">
                            <div class="float-right">
                                <div class="p-2 font-weight-bold text-white">
                                    {{$ml.get('show')}}
                                    <!--<i class="fa fa-plus"-->
                                    <!--style="position:relative;color: #fff;"></i>-->
                                </div>
                            </div>
                            <div class="font-weight-bold" style="background: #00adee;color: #fff;padding: 7px;">
                                {{this.$ml.get('order_summary')}}
                            </div>
                        </li>
                    </ul>
                    <ul class="direction" style="color: #999;" v-if="products_summary.length">
                        <li v-for="(item , key) in products_summary">
                            {{item.product_translation.title}}
                            <div :id="'product_row_summary_'+key" class="text-danger"></div>
                        </li>
                        <!--<li>{{user_info_data.full_address}}</li>-->
                    </ul>
                </div>
                <div class="col-12 mt-4" style="border-bottom: 1px solid #ccc;cursor: pointer"
                     @click="openCard('deliverySummaryContainer')">
                    <ul class="p-0 list-unstyled">
                        <li style="overflow: hidden;cursor: pointer">
                            <div class="float-right">
                                <div class="p-2 font-weight-bold text-white">
                                    <!--{{$ml.get('show')}}-->
                                    <!--<i class="fa fa-plus"-->
                                    <!--style="position:relative;color: #fff;"></i>-->
                                </div>
                            </div>
                            <div class="font-weight-bold" style="background: #00adee;color: #fff;padding: 7px;">
                                {{this.$ml.get('contact_details')}}
                            </div>
                        </li>
                        <!--<li class="text-danger" id="address_error_tab"></li>-->
                        <deliverySummaryGuest />
                    </ul>
                    <!--<ul class="direction" v-if="user_info_data" style="color: #999;">-->
                    <!--<li v-if="user_info_data.first_name">-->
                    <!--{{user_info_data.first_name}}-->
                    <!--</li>-->
                    <!--<li v-if="user_info_data.last_name">-->
                    <!--{{user_info_data.last_name}}-->
                    <!--</li>-->
                    <!--<li v-if="user_info_data.phone">-->
                    <!--{{user_info_data.phone}}-->
                    <!--</li>-->
                    <!--<li v-if="user_info_data.full_address">-->
                    <!--{{user_info_data.full_address}}-->
                    <!--</li>-->
                    <!--</ul>-->
                </div>
                <div class="col-12 mt-4" style="border-bottom: 1px solid #ccc;cursor: pointer"
                     @click="openCard('paymentGatewayContainer')">
                    <ul class="p-0 list-unstyled">
                        <li style="overflow: hidden;cursor: pointer">
                            <div class="float-right">
                                <div class="p-2 font-weight-bold text-white">
                                    <!--{{$ml.get('change')}}-->
                                    <!--<i class="fa fa-plus"-->
                                    <!--style="position:relative;color: #fff;"></i>-->
                                </div>

                            </div>
                            <div class="font-weight-bold" style="background: #00adee;color: #fff;padding: 7px;">
                                {{this.$ml.get('payment_methods')}}
                            </div>
                        </li>
                    </ul>
                    <!--<ul class="direction" style="color: #999;">-->
                        <!--<li>{{$ml.get(payment_type)}}</li>-->
                    <!--</ul>-->

                    <paymentGatewayGuest />
                </div>

                <div class="col-md-12">
                    <button class="btn btn-black mt-4 btn-block" @click="submitCheckout()"
                            :disabled="cart.length == 0">
                        {{this.$ml.get('submit_checkout')}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'
    import {mapState, mapActions} from 'vuex'
    import paymentSummary from '../../views/pages_components/paymentSummary'
    import paymentGatewayGuest from './paymentGatewayGuest'
    import deliverySummaryGuest from './deliverySummaryGuest'

    import Message from 'vue-m-message'

    Vue.use(Message);

    export default {
        name: "totalSummary",
        components: {
            paymentSummary,
            paymentGatewayGuest,
            deliverySummaryGuest
        },
        data() {
            return {
                cart_elements: [],
                current_payment: null,
                o_total_offers: 0,
            }
        },
        props: {
            payment_type: String,
            user_info_data: Object,
            products_summary: Array,
        },
        mounted() {
            this.cart_elements = this.cart;
            this.current_payment = localStorage.getItem('current_payment');
        },
        methods: {
            updateCurrentUserInfo(info) {
                this.user_info_data = info
            },
            openCard(card) {
                $(`.${card}`).toggleClass('opened');
                if (card == 'deliverySummaryContainer') {
                    $('.paymentGatewayContainer').removeClass('opened')
                    $('.orderSummaryContainer').removeClass('opened')
                }
                if (card == 'paymentGatewayContainer') {
                    $('.deliverySummaryContainer').removeClass('opened')
                    $('.orderSummaryContainer').removeClass('opened')
                }
                if (card == 'orderSummaryContainer') {
                    $('.deliverySummaryContainer').removeClass('opened')
                    $('.paymentGatewayContainer').removeClass('opened')
                }
            },
            submitCheckout() {
                let vm = this;
                let request_date = vm.prepareCheckoutData();
                vm.$root.$children[0].$refs.loader.show_loader = true;

                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.CREATE_SALE_GUEST, request_date).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    // console.log(request_date)
                    // console.log(status)
                    // console.log(data);
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    if (status) {
                        localStorage.removeItem('current_payment');
                        localStorage.removeItem('current_coupon');
                        localStorage.removeItem('current_address');
                        localStorage.removeItem('current_user_info_data');
                        vm.$store.dispatch('clearCart');
                        vm.$store.dispatch('clearOffers');
                        if (data.payment_link) {
                            location.href = data.payment_link;
                            return;
                        }
                        Message({
                            title: vm.$ml.get('success'),
                            message: vm.$ml.get('sale_complete'),
                            className: 'bg-gray text-white',
                            zIndex: 9999999,
                            position: 'bottom-center',
                            // type: 'error',
                            showClose: true
                        });
                        console.log(data.sale);
                         vm.$router.push({name: 'invoice', params: {'branch_id': data.branch_id,'recipt_code':data.sale.receipt_code}})
                        // vm.$router.push({name: 'home'})
                        // vm.branches = data.branches
                        return;
                    }

                    if (data.validation_errors.email) {

                        Message({
                            title: vm.$ml.get('error'),
                            message: data.validation_errors.email[0],
                            className: 'bg-gray text-white',
                            zIndex: 9999999,
                            iconImg: require('@/assets/error.png'),
                            position: 'bottom-center',
                            // type: 'error',
                            showClose: true
                        });
                        $('#email_error').text(data.validation_errors.email[0]);
                        $('#address_error_tab').text(data.validation_errors.email[0]);

                    }
                    if (data.validation_errors.first_name) {

                        Message({
                            title: vm.$ml.get('error'),
                            message: data.validation_errors.first_name[0],
                            className: 'bg-gray text-white',
                            zIndex: 9999999,
                            iconImg: require('@/assets/error.png'),
                            position: 'bottom-center',
                            // type: 'error',
                            showClose: true
                        });
                        $('#first_name_error').text(data.validation_errors.first_name[0]);
                        $('#address_error_tab').text(data.validation_errors.first_name[0]);

                    }
                    if (data.validation_errors.last_name) {

                        Message({
                            title: vm.$ml.get('error'),
                            message: data.validation_errors.last_name[0],
                            className: 'bg-gray text-white',
                            zIndex: 9999999,
                            iconImg: require('@/assets/error.png'),
                            position: 'bottom-center',
                            // type: 'error',
                            showClose: true
                        });
                        $('#last_name_error').text(data.validation_errors.last_name[0]);
                        $('#address_error_tab').text(data.validation_errors.last_name[0]);

                    }
                    if (data.validation_errors.phone) {

                        Message({
                            title: vm.$ml.get('error'),
                            message: data.validation_errors.phone[0],
                            className: 'bg-gray text-white',
                            zIndex: 9999999,
                            iconImg: require('@/assets/error.png'),
                            position: 'bottom-center',
                            // type: 'error',
                            showClose: true
                        });
                        $('#phone_error').text(data.validation_errors.phone[0]);
                        $('#address_error_tab').text(data.validation_errors.phone[0]);

                    } else if (data.validation_errors.offers) {

                        Message({
                            title: vm.$ml.get('error'),
                            message: data.validation_errors.offers[0],
                            className: 'bg-gray text-white',
                            zIndex: 9999999,
                            iconImg: require('@/assets/error.png'),
                            position: 'bottom-center',
                            // type: 'error',
                            showClose: true
                        });

                    } else if (data.validation_errors.product_option_values) {
                        let _message = '';
                        $.each(data.validation_errors.product_option_values, function (index, errors) {
                            $.each(errors, function (key, message) {
                                let product_id = key.split(".")[1];
                                // console.log(product_id)
                                // console.log(message[0])
                                $(`#product_row_${product_id}`).empty().append(`<td colspan="4">
                                                                           <span style="color: red">${message[0]}</span>
                                                                        </td> `)
                                $(`#product_row_summary_${product_id}`).empty().show().append(` ${message[0]} `)
                                _message = message[0]
                            })
                        })

                        Message({
                            title: vm.$ml.get('error'),
                            message: _message,
                            className: 'bg-gray text-white',
                            zIndex: 9999999,
                            iconImg: require('@/assets/error.png'),
                            position: 'bottom-center',
                            // type: 'error',
                            showClose: true
                        });
                    } else {

                    }

                }).catch((error) => {
                    vm.$helper.handleError(error, vm);
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                })
                // console.log(request_date)
            },
            prepareCheckoutData() {
                let vm = this;

                // sync cart data post request
                let cart = JSON.parse(JSON.stringify(vm.cart));
                let branch_ids = [];
                let product_option_value_ids = [];
                let quantities = [];
                let store_ids = [];

                $.each(cart, function (index, item) {
                    branch_ids.push(item.branch_id);
                    store_ids.push(item.store_id);
                    product_option_value_ids.push(item.pov.id);
                    quantities.push(item.min_amount_needed);
                });
                let offer_ids = [];
                $.each(vm.selected_offers, function (index, item) {
                    offer_ids.push(item.id);
                });

                let current_payment = localStorage.getItem('current_payment');
                let current_user_info_data = JSON.parse(localStorage.getItem('current_user_info_data'));
                return {
                    branch_ids: branch_ids,
                    product_option_value_ids: product_option_value_ids,
                    quantities: quantities,
                    store_ids: store_ids,
                    payment_type: current_payment ? current_payment : 'cash',
                    first_name: current_user_info_data ? current_user_info_data.first_name : '',
                    last_name: current_user_info_data ? current_user_info_data.last_name : '',
                    email: current_user_info_data ? current_user_info_data.email : '',
                    phone: current_user_info_data ? current_user_info_data.phone : '',
                    full_address: current_user_info_data ? current_user_info_data.full_address : '',
                }
            },
            calculatePaymentCost(total_cost) {
                let vm = this;
                let value = 0;
                if (vm.payment_type == 'visa_master') {
                    value = (total_cost * (2.95 / 100)) + 0.1;
                } else if (vm.payment_type == 'knet') {
                    value = 0.1
                } else if (vm.payment_type == 'cards') {
                    value = (total_cost * (3.95 / 100)) + 0.1;
                } else {
                    value = 0;
                }
                return value;
            }
        },
        computed: {
            ...mapState([
                'cart',
                'total_offers',
                'selected_offers',
                'auth',
                'offers',
            ]),
            getTotalPaymentFees() {
                let vm = this;
                let total_cost = vm.getFinalTotalCost;
                let value = vm.calculatePaymentCost(total_cost);
                return value.toFixed(3);
            },
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
                return vm.total_offers
            },
            getFinalTotalCost() {
                let vm = this;
                let total_order = vm.getTotalCost;
                let total_offers = vm.getTotalOffers;
                let coupon_value = 0;
                if (vm.current_coupon) {
                    if (vm.current_coupon.type == 'value') {
                        coupon_value = vm.current_coupon.value;
                    } else {
                        coupon_value = total_order * (vm.current_coupon.value / 100);
                    }
                }
                let value = Math.max(0, (total_order - total_offers - coupon_value));
                let paymentFees = vm.calculatePaymentCost(value);
                // value +
                return (paymentFees + value).toFixed(3);
            }
        }
    }
</script>

<style scoped>

</style>
