<template>
    <div class="profile-page">
        <div class="row">
            <div class="col-md-12">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3"></div>
                        <div class="col-md-6 mt-5">
                            <card type="secondary" shadow
                                  header-classes="bg-white pb-5"
                                  body-classes="px-lg-5 py-lg-5"
                                  class="border-0 new_card_auth mb-5 bg-white">
                                <template>
                                    <div class="text-muted text-center mb-3">
                                        <h4 class="font-weight-bold main_color">{{this.$ml.get('or_sign_with')}}</h4>
                                    </div>
                                    <div class="btn-wrapper text-center">
                                        <base-button type="new_btn" class="text-black  btn-block mb-2"
                                                     @click="googleSign">
                                            <img slot="icon" src="img/icons/common/google.svg">
                                            {{this.$ml.get('google')}}
                                        </base-button>
                                    </div>
                                    <div class="btn-wrapper text-center">
                                        <base-button type="new_btn" class="text-black btn-block mb-2"
                                                     @click="twitterSign">
                                            <img slot="icon" src="img/icons/common/twitter.png">
                                            {{this.$ml.get('twitter')}}
                                        </base-button>
                                    </div>
                                    <div class="btn-wrapper text-center" v-if="cart.length">
                                        <base-button type="new_btn" class="text-black btn-block mb-2"
                                                     @click="loginGuest">
                                            <img slot="icon" src="img/icons/common/user_male2-512.png">
                                            {{this.$ml.get('guest')}}
                                        </base-button>
                                    </div>
                                </template>
                                <template>
                                    <div class="text-center text-muted mb-4">
                                        <small>{{this.$ml.get('sign_with')}}</small>
                                    </div>
                                    <form role="form" @submit.prevent="handleLogin">
                                        <div class="row">
                                            <!--<div class="col-12 text-left">-->
                                            <!--<base-input alternative-->
                                            <!--class="mb-3"-->
                                            <!--type="email"-->
                                            <!--v-model="email"-->
                                            <!--:placeholder="this.$ml.get('email_or_phone')"-->
                                            <!--addon-left-icon="ni ni-user-run">-->
                                            <!--</base-input>-->
                                            <!--<small id="email"-->
                                            <!--class="position-relative font-weight-bold text-error"-->
                                            <!--style="top: -10px;"></small>-->
                                            <!--<div v-if="resend_mail && email"-->
                                            <!--class="text-left font-weight-bold p-1">-->
                                            <!--<a href="" @click.prevent="resendMail"-->
                                            <!--class="text-info">{{this.$ml.get('resend_mail')}}</a>-->
                                            <!--</div>-->
                                            <!--<div v-if="resend_code && email"-->
                                            <!--class="text-left font-weight-bold p-1">-->
                                            <!--<a href=""-->
                                            <!--@click.prevent="$router.push({name: 'phone_verification', params: {phone: email}})"-->
                                            <!--class="text-info">{{this.$ml.get('verify')}}</a>-->
                                            <!--</div>-->

                                            <!--</div>-->
                                            <div class="col-12 text-left">
                                                <div class="form-group mb-3 input-group input-group-alternative">
                                                    <!---->
                                                    <div class="input-group-prepend">
                                                                    <span class="input-group-text">
                                                                        <i class="ni ni-mobile-button"></i>
                                                                    </span>
                                                    </div>
                                                    <input aria-describedby="addon-right addon-left"
                                                           v-model="phone"
                                                           type="text" :placeholder="this.$ml.get('phone')"
                                                           class="form-control"/>
                                                    <div class="input-group-prepend">
                                                                    <span class="input-group-text">
                                                                        965
                                                                    </span>
                                                    </div>
                                                </div>

                                                <div v-if="resend_code && phone"
                                                     class="text-left font-weight-bold p-1">
                                                    <a href=""
                                                       @click.prevent="$router.push({name: 'phone_verification', params: {phone: email}})"
                                                       class="text-info">{{this.$ml.get('verify')}}</a>
                                                </div>
                                                <small id="phone"
                                                       class="position-relative font-weight-bold text-error"
                                                       style="top: -10px;"></small>
                                            </div>
                                            <div class="col-12 text-left">
                                                <base-input alternative
                                                            type="password"
                                                            v-model="password"
                                                            :placeholder="this.$ml.get('password')"
                                                            addon-left-icon="ni ni-lock-circle-open">
                                                </base-input>
                                                <small id="password"
                                                       class="position-relative font-weight-bold text-error"
                                                       style="top: -10px;"></small>
                                                <router-link :to="{name:'forget_password'}" class="text-black">
                                                    <small>{{this.$ml.get('forget_password')}}</small>
                                                </router-link>
                                            </div>
                                            <div class="col-12 text-center">
                                                <base-button type="info" class="my-4 bg-main"
                                                             @click="handleLogin">
                                                    {{this.$ml.get('sign_in')}}
                                                </base-button>
                                                <br>
                                                <router-link :to="{name:'register'}" class="text-black">
                                                    <p class="main_color">{{this.$ml.get('create_account')}}</p>
                                                </router-link>
                                            </div>
                                        </div>
                                    </form>
                                </template>
                            </card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
    import {mapState, mapActions} from 'vuex'
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

    export default {
        data() {
            return {
                lang: this.$ml.current,
                phone: null,
                password: null,
                resend_mail: false,
                resend_code: false,
                isSignIn: false,
                cart_elements: []
            }
        },
        mounted() {
            let vm = this;
            vm.checkStorage();
            this.cart_elements = this.cart;
            if (localStorage.getItem('auth') != null) {
                this.$router.push({name: 'home'})
            }
        },
        methods: {
            ...mapActions([
                'checkStorage',
                'addAuthUser'
            ]),
            handleLogin() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                let request_data = vm.prepareRequestData();
                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.LOGIN, request_data)
                    .then((resp) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        let status = resp.data.status;
                        let data = resp.data.data;
                        let errors = resp.data.errors;
                        if (!status) {
                            vm.showVaildationMassges(data.validation_errors);
                            vm.showErrorsMassges(errors);
                            return;
                        }
                        localStorage.setItem('auth', JSON.stringify(data));
                        vm.$store.dispatch('addAuthUser', data);
                        if (vm.$route.query.nextUrl) {
                            vm.$router.push({name: vm.$route.query.nextUrl});
                            location.reload()
                            return;
                        }
                        vm.$router.push({name: 'home'})
                        location.reload()
                    })
                    .catch((err) => {
                        vm.$root.$children[0].$refs.loader.show_loader = false;

                    })
            },
            handleGoogleLogin(request_data) {
                let vm = this;
                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.REGISTER_GOOGLE, request_data)
                    .then((resp) => {
                        console.log(resp.data)
                        let status = resp.data.status;
                        let data = resp.data.data;
                        if (!status) {
                            vm.showVaildationMassges(data.validation_errors);
                            return;
                        }
                        localStorage.setItem('auth', JSON.stringify(data));
                        vm.$store.dispatch('addAuthUser', data);
                        if (vm.$route.query.nextUrl) {
                            vm.$router.push({name: vm.$route.query.nextUrl});
                            location.reload();
                            return;
                        }
                        vm.$router.push({name: 'home'});
                        location.reload()
                    })
                    .catch((err) => {

                    })
            },
            prepareRequestData() {
                let vm = this;
                $('.text-error').text('')
                return {
                    phone: vm.phone,
                    password: vm.password,
                    lang: vm.lang,
                }
            },
            showVaildationMassges(errors) {
                $('#first_name, #last_name, #phone, #email, #password, #password_confirmation, #gender, #recaptchaToken, #date_birth').text('');
                $.each(errors, function (key, error) {
                    $('#' + key).text(error[0])
                })
            },
            showErrorsMassges(errors) {
                let vm = this;
                $.each(errors, function (key, error) {
                    if (error === 'EMAIL_NOT_VERIFIED') vm.resend_mail = true;
                    if (error === 'PHONE_NOT_VERIFIED') vm.resend_code = true;
                });
            },
            googleSign() {
                let vm = this;
                vm.$gAuth.signIn()
                    .then(GoogleUser => {
                        let request_data = {
                            // id: GoogleUser.getBasicProfile().getId(),
                            // email: GoogleUser.getBasicProfile().getEmail(),
                            // full_name: GoogleUser.getBasicProfile().getName(),
                            // first_name: GoogleUser.getBasicProfile().getGivenName(),
                            // last_name: GoogleUser.getBasicProfile().getFamilyName(),
                            // avatar: GoogleUser.getBasicProfile().getImageUrl(),
                            token: GoogleUser.getAuthResponse().access_token,
                            id_token: GoogleUser.getAuthResponse().id_token,
                            provider: 'google'
                        };

                        vm.handleGoogleLogin(request_data);

                        this.isSignIn = this.$gAuth.isAuthorized
                    })
                    .catch(error => {
                        //on fail do something
                        console.log(error)
                    })
            },
            resendMail() {
                let vm = this;
                let request_data = {
                    email: this.email
                }
                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.RESEND_VERFICATION_MAIL, request_data)
                    .then((resp) => {
                        let status = resp.data.status;
                        let data = resp.data.data;
                        if (!status) {
                            vm.resend_mail = false;
                            return;
                        }
                        vm.resend_mail = false;
                    })
                    .catch((err) => {

                    })
            },
            loginGuest() {
                this.$router.push({name: 'checkout_guest'})
            },
            twitterSign() {
                let vm = this;
                let url = 'https://rnpdelivery.com/auth/twitter/callback';
                if (vm.$route.query.nextUrl) {
                    url += '?nextUrl=' + vm.$route.query.nextUrl;
                }
                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.AUTH_TWITTER, {
                    callback: url
                })
                    .then((resp) => {
                        let oauth_token = resp.data.oauth_token;
                        localStorage.setItem('twitter_keys', JSON.stringify(resp.data));
                        location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`
                    })
                    .catch((err) => {
                    });
                return '';
                // console.log(this.$auth.auth)
                // this.$auth.authenticate('twitter').then(response => {
                //
                //     console.log(response)
                //
                // }).catch(err => {
                //     console.log({err: err})
                // })

            },
        },
        components: {},
        computed: {
            ...mapState([
                'auth',
                'cart',
            ]),
        }
    }
</script>
<style>
    .text-error {
        color: #F00;
    }

    .new_card_auth {
        border-radius: 40px 0 40px 0!important;
    }
</style>
