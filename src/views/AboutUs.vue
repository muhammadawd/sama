<template>
    <div class="profile-page">
        <div class="container">

            <div class="row">
                <div class="col-md-8 mb-5 mt-5">
                    <card type="secondary" shadow
                          header-classes="bg-main pb-5"
                          body-classes="px-lsg-5 p-0 py-lsg-5"
                          class="border-0 new_card_auth2 bg-white mb-2">
                        <div class="card-header bg-main-about  mb-2">
                            {{this.$ml.get('about_us')}}
                        </div>
                        <template>
                            <div class="col-md-12 ">
                                <div>
                                    {{branch_info.translated.description}}
                                </div>
                                <table class="table table-hover" v-if="branch_info">
                                    <tr>
                                        <td width="200px" class="text-left">
                                            <b>{{this.$ml.get('store_name')}}</b>
                                        </td>
                                        <td class="text-left">
                                            <b>{{branch_info.translated.title}}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-left">
                                            <b>{{this.$ml.get('phone')}}</b>
                                        </td>
                                        <td class="text-left">
                                            <div class="direction-inverse font-weight-bold">
                                                {{branch_info.phone}}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="text-left">
                                            <b>{{this.$ml.get('full_address')}}</b>
                                        </td>
                                        <td class="text-left">
                                            <b>{{branch_info.address ?
                                                branch_info.address.translated.name : ''}}</b>
                                        </td>
                                    </tr>

                                    <!--                                                        <tr>-->
                                    <!--                                                            <td class="text-left">-->
                                    <!--                                                                <b>{{this.$ml.get('payment_methods')}}</b>-->
                                    <!--                                                            </td>-->
                                    <!--                                                            <td class="text-right">-->
                                    <!--                                                                <b v-for="(payment,key) in branch_info.payment_types"-->
                                    <!--                                                                   :key="key">{{payment.payment.translated.title}}</b>-->
                                    <!--                                                            </td>-->
                                    <!--                                                        </tr>-->
                                </table>
                            </div>
                        </template>
                    </card>
                    <div class="row" v-if="branch_info">
                        <div class="col-md-6 mt-2" v-if="branch_info.map_frame">
                            <card type="secondary" shadow
                                  header-classes="bg-white pb-5"
                                  class="border-0 bg-white new_card_auth">
                                <template>
                                    <div class="text-muted text-center mb-3">
                                    <span class="display-4 text-black"
                                          style="font-size: 18px">{{this.$ml.get('map')}}</span>
                                    </div>
                                </template>
                                <template>
                                    <div v-html="branch_info.map_frame"></div>
                                </template>
                            </card>
                        </div>
                        <div class="col-md-6 mt-2" v-if="branch_info.vedio_frame">
                            <card type="secondary" shadow
                                  header-classes="bg-white pb-5"
                                  class="border-0 bg-white new_card_auth">
                                <template>
                                    <div class="text-muted text-center mb-3">
                                    <span class="display-4 text-black"
                                          style="font-size: 18px">{{this.$ml.get('video')}}</span>
                                    </div>
                                </template>
                                <template>
                                    <div v-html="branch_info.vedio_frame"></div>
                                </template>
                            </card>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mt-5">
                    <img :src="require('@/assets/images/newImages/about.png')" class="w-100" alt="">
                </div>
            </div>
        </div>
    </div>


</template>
<script>
    import VueRecaptcha from 'vue-recaptcha';
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

    export default {
        data() {
            return {

                lang: this.$ml.current,
                branch_info: null,
            }
        },
        mounted() {
            this.getStoreInfo(1);
        },
        methods: {
            getStoreInfo(id) {
                let vm = this;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.FIND_STORE_INFO + `/${id}`, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        console.log(data.branch)
                        vm.branch_info = data.branch;
                    }
                }).catch((error) => {

                })
            },
        },
        components: {VueRecaptcha}
    }
</script>
<style>
    iframe {
        width: 100% !important;
    }

    .bg-main-about {
        text-align: center;
        font-weight: bold;
        color: #fff;
        background-color: #00adee !important;
        border-radius: 40px 40px 0 0 !important;

    }

    .new_card_auth2 {
        border-radius: 40px !important;
    }
</style>
