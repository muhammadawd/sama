<template>
    <div class="card text-left">
        <div class="card-header text-black" style="background: #fafafa;overflow: hidden">
            <b>{{this.$ml.get('order_summary')}}</b>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12">
                    <ul class="list-unstyled text-left p-3">
                        <li style="overflow: hidden">
                            <div class="float-left">
                                <b>{{this.$ml.get('sub_total')}}</b>
                            </div>
                            <div class="float-right">
                                <b>{{getTotalCost}}</b>
                                {{$store.getters.getCurrency}}
                            </div>
                        </li>

                        <li>
                            <hr class="mt-3 mb-2"/>
                        </li>

                        <li style="overflow: hidden">
                            <div class="float-left">
                                <b>{{this.$ml.get('payment_fees')}}</b>
                            </div>
                            <div class="float-right">
                                <b>{{getTotalPaymentFees}}</b>
                                {{$store.getters.getCurrency}}
                            </div>
                        </li>

                        <li>
                            <hr class="mt-3 mb-2"/>
                        </li>

                        <li style="overflow: hidden">
                            <div class="float-left">
                                <b>{{this.$ml.get('shipping')}}</b>
                            </div>
                            <div class="float-right">
                                <b>{{getShippingCost(getFinalTotalCost)}}</b>
                                {{$store.getters.getCurrency}}

                            </div>
                        </li>
                        <li>
                            <hr class="mt-3 mb-2"/>
                        </li>

                        <li style="overflow: hidden">
                            <div class="float-left">
                                <b>{{this.$ml.get('total')}}</b>
                            </div>
                            <div class="float-right">
                                <b>{{parseFloat(parseFloat(getFinalTotalCost) +
                                    parseFloat(getShippingCost(getFinalTotalCost))).toFixed(3)}}</b>
                                {{$store.getters.getCurrency}}

                            </div>
                        </li>

                    </ul>
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

    import Message from 'vue-m-message'

    Vue.use(Message);

    export default {
        name: "totalSummary",
        components: {
            paymentSummary
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
        },
        mounted() {
            this.cart_elements = this.cart;
            let current_payment = localStorage.getItem('current_payment');
            this.current_payment = current_payment;
            setTimeout(() => {
                // this.openCard('deliverySummaryContainer')
            }, 1000)
        },
        methods: {
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
                let current_coupon = localStorage.getItem('current_coupon');
                let current_address = localStorage.getItem('current_address');
                if (current_coupon) {
                    current_coupon = JSON.parse(current_coupon)
                }
                return {
                    lang: vm.$ml.current,
                    branch_ids: branch_ids,
                    offer_ids: offer_ids,
                    product_option_value_ids: product_option_value_ids,
                    quantities: quantities,
                    store_ids: store_ids,
                    payment_type: current_payment ? current_payment : 'cash',
                    coupon_id: current_coupon ? current_coupon.id : null,
                    coupon_code: current_coupon ? current_coupon.code : null,
                    address_id: current_address ? current_address : null,
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
            },
            getShippingCost(total) {
                // return total
                let delivery_cost = JSON.parse(localStorage.getItem('settings')).delivery_cost;
                let delivery_cost_condition = JSON.parse(localStorage.getItem('settings')).delivery_cost_condition;

                if (total > delivery_cost_condition) {
                    return parseFloat(delivery_cost).toFixed(3);
                }
                return 0.000
            },
            close(card) {
                $(`.${card}`).removeClass('opened')
            },
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
            },
        }
    }
</script>

<style scoped>

</style>
