<template>
    <div class="profile-page">
        <div class="row">
            <div class="col-md-12">
                <div class="container">
                    <div class="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-8 mt-5">

                            <card type="secondary" shadow
                                  header-classes="bg-white pb-5"
                                  body-classes="p-0"
                                  class="border-0 p-0 new_card_auth2 bg-white">
                                <div class="card-header bg-main-register  mb-2">
                                    {{this.$ml.get('contact_us')}}
                                </div>
                                <template>
                                    <div class="text-center text-muted mb-4"></div>
                                    <form class=" p-3" role="form">
                                        <base-input alternative
                                                    class="mb-3"
                                                    type="text"
                                                    v-model="contact_name"
                                                    :placeholder="this.$ml.get('name')"
                                                    addon-left-icon="ni ni-satisfied">
                                        </base-input>
                                        <div class="text-black text-left"
                                             id="contact_name"></div>
                                        <base-input alternative
                                                    class="mb-3"
                                                    type="number"
                                                    v-model="contact_phone"
                                                    :placeholder="this.$ml.get('phone')"
                                                    addon-left-icon="ni ni-satisfied">
                                        </base-input>
                                        <div class="text-black text-left"
                                             id="contact_phone"></div>
                                        <base-input alternative
                                                    class="mb-3"
                                                    type="email"
                                                    v-model="contact_email"
                                                    :placeholder="this.$ml.get('email')"
                                                    addon-left-icon="ni ni-email-83">
                                        </base-input>
                                        <div class="text-black text-left"
                                             id="contact_email"></div>
                                        <textarea class="form-control form-control-alternative"
                                                  v-model="contact_message"
                                                  :placeholder="this.$ml.get('message')"
                                                  rows="4"></textarea>
                                        <div class="text-black text-left"
                                             id="contact_message"></div>
                                        <div class="text-center">
                                        </div>
                                        <div class="text-center">
                                            <base-button type="info" class="my-4"
                                                         @click="saveContact()">
                                                {{this.$ml.get('send')}}
                                            </base-button>
                                        </div>
                                    </form>
                                </template>
                            </card>
                        </div>
                        <div class="col-md-7 mt-5">
                        </div>
                        <div class="col-md-5 mt-5">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'
    import VueRecaptcha from 'vue-recaptcha';
    import Tabs from "@/components/Tabs/Tabs.vue";
    import TabPane from "@/components/Tabs/TabPane.vue";

    export default {
        data() {
            return {
                addresses: [],
                lang: this.$ml.current,
                recaptchaToken: null,
                join_first_name: null,
                join_last_name: null,
                join_branch_name: null,
                join_phone: null,
                join_email: null,
                join_gov_id: 1,
                join_city_id: 1,
                join_street: null,
                contact_name: null,
                contact_phone: null,
                contact_email: null,
                contact_message: null,
            }
        },
        mounted() {
            this.getAddress();
        },
        methods: {
            onCaptchaVerified(recaptchaToken) {
                this.recaptchaToken = recaptchaToken;
            },
            saveJoinUs() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                let request_data = {
                    address_id: vm.join_city_id,
                    phone: vm.join_phone,
                    email: vm.join_email,
                    full_address: vm.join_street,
                    branch_name: vm.join_branch_name,
                    first_name: vm.join_first_name,
                    last_name: vm.join_last_name,
                    recaptchaToken: vm.recaptchaToken,
                };
                //CREATE_VENDOR

                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.CREATE_VENDOR, request_data).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    if (!status) {
                        vm.showVaildationMassges(data.validation_errors, 'join_');
                        return;
                    }
                    vm.$swal({
                        title: vm.$ml.get('success'),
                        type: 'success',
                        timer: 1000
                    })
                    vm.resetForm()
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;

                })
                // console.log(request_data)
            },
            showVaildationMassges(errors, tag) {
                $(`#${tag}first_name, #${tag}last_name,#${tag}branch_name, #${tag}phone, #${tag}email, #${tag}recaptchaToken, #${tag}message`).text('');
                $.each(errors, function (key, error) {
                    $('#' + tag + key).text(error[0])
                })
            },
            resetForm() {
                let vm = this;
                vm.join_city_id = 1;
                vm.join_phone = null;
                vm.join_email = null;
                vm.join_street = null;
                vm.join_branch_name = null;
                vm.join_first_name = null;
                vm.join_last_name = null;
                vm.contact_name = null;
                vm.contact_phone = null;
                vm.contact_email = null;
                vm.contact_message = null;
                vm.recaptchaToken = null;
            },
            saveContact() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                let request_data = {
                    phone: vm.contact_phone,
                    email: vm.contact_email,
                    name: vm.contact_name,
                    message: vm.contact_message,
                    recaptchaToken: vm.recaptchaToken,
                };
                //CREATE_CONTACT_US

                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.CREATE_CONTACT_US, request_data).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    if (!status) {
                        vm.showVaildationMassges(data.validation_errors, 'contact_');
                        return;
                    }
                    vm.$swal({
                        title: vm.$ml.get('success'),
                        type: 'success',
                        timer: 1000
                    })
                    vm.resetForm()
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;

                })
                // console.log(request_data)
            },
            getAddress() {
                // GET_COUNTRIES_CITIES
                let vm = this;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.GET_COUNTRIES_CITIES, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        vm.addresses = data.governorates;
                    }
                }).catch((error) => {
                    vm.addresses = []
                })
            },
        },
        components: {
            VueRecaptcha,
            Tabs,
            TabPane
        }
    }
</script>
<style scoped>
    .text-xs-center {
        text-align: center;
    }

    .g-recaptcha {
        display: inline-block;
    }

    .new_card_auth {
        border-radius: 40px 0 40px 0 !important;
    }
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
