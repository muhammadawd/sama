<template>
    <div class="profile-page">
        <div class="container">

            <div class="row">
                <div class="col-md-12">
                    <div class="card shadow shadow-lg--hover new_card_auth2 mb-2 mt-5">
                        <div class="card-header bg-main-register  mb-2">
                            {{this.$ml.get('my_points')}}
                        </div>
                        <div class="card-body">
                            <div class="col-lg-12   p-0">
                                <card shadow class="text-left" >
                                    <h3 class="text-left font-weight-bold">
                                        {{$ml.get('my_points')}} :
                                        <span>{{points}}</span>
                                    </h3>
                                    <p>{{$ml.get('to_money_percent')}}: {{to_money_percent}}</p>
                                    <button class="btn btn-success" @click="transform()"
                                            :disabled="!parseInt(points)">
                                        {{$ml.get('transform_points')}}
                                    </button>
                                    <div id="points" class="text-danger"></div>
                                </card>
                                <card shadow >
                                    <table class="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th class="text-left">{{$ml.get('code')}}</th>
                                            <th class="text-left">{{$ml.get('value')}}</th>
                                            <th class="text-left">{{$ml.get('is_used')}}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(item ,key) in vouchers">
                                            <td>{{item.code}}</td>
                                            <td>{{item.value}}</td>
                                            <td>
                                                {{item.used_at ? $ml.get('used') : $ml.get('not_used')}}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script>

    import myAccount from '../views/pages_components/myAccount';
    import myOrders from '../views/pages_components/myOrders';
    import myAddresses from '../views/pages_components/myAddresses';
    import Tabs from "@/components/Tabs/Tabs.vue";
    import TabPane from "@/components/Tabs/TabPane.vue";
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

    export default {
        data() {
            return {
                token: '',
                points: 0,
                to_money_percent: '0',
                vouchers: [],
            }
        },
        mounted() {
            let vm = this;
            vm.to_money_percent = JSON.parse(localStorage.getItem('to_money_percent'))
            let auth = localStorage.getItem('auth');
            auth = JSON.parse(auth);
            if (auth) {
                vm.token = auth.token;
            }
            this.getVouchers();
            console.log(this.$ml.get('my_orders'))
        },
        methods: {
            transform() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.CREATE_VOUCHERS, {
                    points: vm.points
                }, {
                    headers: {Authorization: "Bearer " + vm.token}
                }).then((resp) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        location.reload();
                        return
                    }
                    vm.showVaildationMassges(data.validation_errors)
                }).catch((error) => {
                    vm.$helper.handleError(error, vm);
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                })
            },
            showVaildationMassges(errors) {
                $('#points').text('');
                $.each(errors, function (key, error) {
                    $('#' + key).text(error[0])
                })
            },
            getVouchers() {
                let vm = this;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.MY_VOUCHERS, {
                    params: {},
                    headers: {Authorization: "Bearer " + vm.token}
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.vouchers = data.vouchers;
                    vm.points = data.total_points ? data.total_points : 0;
                }).catch((error) => {

                })
            },
        },
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

    .bg-main-register {
        text-align: center;
        font-weight: bold;
        color: #fff;
        background-color: #00adee;
        border-radius: 40px 40px 0 0 !important;

    }

    .new_card_auth2 {
        border-radius: 40px !important;
    }
</style>
