<template>
    <div class="profile-page">
        <section class="section section-skew" style="padding-bottom: 0;margin-top: 110px">
            <div class="container-full">
                <card class="card-profile border-0 mb-5" no-body style="position: relative;">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="card shadow shadow-lg--hover mt-5">
                                            <div class="card-body">
                                                <nav aria-label="breadcrumb p-0">
                                                    <div class="container-fluid p-0">
                                                        <ol class="breadcrumb mt-2 p-0  bg-white">
                                                            <li class="breadcrumb-item"><a
                                                                    href="#">{{this.$ml.get('home')}}</a></li>
                                                            <!--                                                            <li class="breadcrumb-item"><a-->
                                                            <!--                                                                    href="#"> {{this.$ml.get('all_stores')}}</a></li>-->
                                                            <li class="breadcrumb-item"><a
                                                                    href="#"> {{this.$ml.get('your_cart')}}</a></li>
                                                            <li aria-current="page"
                                                                class="breadcrumb-item active">
                                                                {{this.$ml.get('checkout')}}
                                                            </li>
                                                        </ol>
                                                    </div>
                                                </nav>
                                                <template>
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="container_base">
                                                                <totalAllSummaryGuest
                                                                        v-bind:payment_type="payment_type"/>
                                                                <div class="orderSummaryContainer">
                                                                    <orderSummary
                                                                            v-bind:updateProductsSummary="updateProductsSummary"/>
                                                                </div>
                                                                <div class="paymentGatewayContainer">
                                                                    <paymentGateway
                                                                            v-bind:updatePaymentType="updatePaymentType"/>
                                                                </div>
                                                                <!--<div class="deliverySummaryContainer">-->
                                                                    <!--<deliverySummaryGuest-->
                                                                            <!--v-bind:updateCurrentUserInfo="updateCurrentUserInfo"/>-->
                                                                <!--</div>-->
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <totalSummaryGuest
                                                                    v-bind:payment_type="payment_type"
                                                                    v-bind:products_summary="products_summary"
                                                                    v-bind:user_info_data="user_info_data"/>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </card>
            </div>
        </section>
    </div>


</template>
<script>

    import orderSummary from '../views/pages_components/orderSummary'
    import deliverySummaryGuest from '../views/pages_components/deliverySummaryGuest'
    import paymentSummary from '../views/pages_components/paymentSummary'
    import paymentGateway from '../views/pages_components/paymentGateway'
    import totalSummaryGuest from '../views/pages_components/totalSummaryGuest'
    import totalAllSummaryGuest from '../views/pages_components/totalAllSummaryGuest'

    export default {
        data() {
            return {
                payment_type: 'cash',
                user_info_data: null,
                products_summary: [],
            }
        },
        methods: {
            updatePaymentType(payment) {
                this.payment_type = payment
            },
            updateProductsSummary(products_summary) {
                this.products_summary = products_summary
            },
            updateCurrentUserInfo(info) {
                this.user_info_data = info
            }
        },
        created() {
            let vm = this;
            let current_payment = localStorage.getItem('current_payment');
            if (!current_payment) {
                vm.payment = 'cash';
                localStorage.setItem('current_payment', vm.payment)
            } else {
                vm.payment = current_payment;
                //
            }
        },
        components: {
            orderSummary,
            paymentSummary,
            paymentGateway,
            totalSummaryGuest,
            totalAllSummaryGuest,
            deliverySummaryGuest
        }
    }
</script>
<style scoped>
    .container_base {
        /*border: 1px solid #000;*/
        width: 100%;
        min-height: 100vh;
        overflow: hidden !important;
        position: relative;
        transition: all 0.5s ease-in-out;
        margin-bottom: 5px;
    }

    @media only screen and (max-width: 600px) {
        .container_base {
            min-height: auto !important;
        }
    }

    .paymentGatewayContainer, .orderSummaryContainer, .deliverySummaryContainer {
        width: 100%;
        overflow: hidden !important;
        height: 100%;
        position: absolute;
        top: 0;
        right: -600px;
        transition: all 0.5s ease-in-out;
        background: #fff;
        z-index: 9;
    }

    @media only screen and (max-width: 600px) {
        .paymentGatewayContainer, .orderSummaryContainer, .deliverySummaryContainer {
            position: fixed;
            z-index: 9999999;
            top: 100px;

        }
    }

    .paymentGatewayContainer.opened,
    .orderSummaryContainer.opened,
    .deliverySummaryContainer.opened {
        right: 0;
    }

    .text-error {
        color: #f00;
    }
</style>
