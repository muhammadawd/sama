<template>
    <div class="profile-page">
        <section class="section section-skew" style="padding-bottom: 0">
            <div class="container-full">
                <card class="card-profile border-0 mb-5" no-body>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card shadow shadow-lg--hover new_card_account mb-3 mt-5">
                                    <div class="card-header bg-main-account mb-2">
                                        {{this.$ml.get('my_account')}}
                                    </div>
                                    <div class="card-body">
                                        <div class="col-lg-12   p-0">

                                            <tabs fill class="flex-column flex-md-row">
                                                <card shadow style="background: #eee">
                                                    <tab-pane :title="this.$ml.get('my_account')"
                                                              style="min-height: 400px">
                                                        <my-account></my-account>
                                                    </tab-pane>

                                                    <tab-pane :title="this.$ml.get('my_orders')"
                                                              style="min-height: 400px">
                                                        <my-orders></my-orders>
                                                    </tab-pane>

                                                    <tab-pane :title="this.$ml.get('addresses')"
                                                              style="min-height: 400px">
                                                        <my-addresses></my-addresses>
                                                    </tab-pane>
                                                </card>
                                            </tabs>
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

    import myAccount from '../views/pages_components/myAccount';
    import myOrders from '../views/pages_components/myOrders';
    import myAddresses from '../views/pages_components/myAddresses';
    import Tabs from "@/components/Tabs/Tabs.vue";
    import TabPane from "@/components/Tabs/TabPane.vue";

    export default {
        data() {
            return {}
        },
        mounted() {
            console.log(this.$ml.get('my_orders'))
        },
        methods: {},
        components: {
            Tabs,
            myAccount,
            myOrders,
            myAddresses,
            TabPane
        }
    }
</script>
<style>
    .bg-main-account {
        text-align: center;
        font-weight: bold;
        color: #fff;
        background-color: #00adee;
        border-radius: 40px 40px 0 0 !important;
    }

    .new_card_account {
        border-radius: 40px !important;
    }
</style>
