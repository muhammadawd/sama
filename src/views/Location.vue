<template>
    <div class="profile-page">
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-12 mb-5 mt-5">
                <div class="row">
                    <div class="col-md-12">
                        <card type="secondary" shadow
                              header-classes="bg-white pb-5"
                              class="border-0 bg-white new_card_auth">
                            <template>
                                <div class="text-muted text-center mb-3">
                                    <span class="display-4 text-black" style="font-size: 18px">{{this.$ml.get('map')}}</span>
                                </div>
                            </template>
                            <template  v-if="branch_info">
                                <div v-html="branch_info.map_frame"></div>
                            </template>
                        </card>
                    </div>
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
<style >
    .text-xs-center {
        text-align: center;
    }
    iframe{
        width: 100%!important;
    }

    .g-recaptcha {
        display: inline-block;
    }
    .new_card_auth {
        border-radius: 40px 0 40px 0!important;
    }
</style>
