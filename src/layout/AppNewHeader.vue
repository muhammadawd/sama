<template>
    <div>
        <div class="container">
            <div class="header_bar"></div>
            <div class="row direction header_tool_bar">
                <div class="col-12">
                    <div class="row">
                        <div class="col-1">
                            <div class="header_logo">
                                <a href="">
                                    <img :src="$helper.getLogo()" width="120px" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="header_lang">
                                <ul class="list-unstyled list-inline direction-inverse">
                                    <li class="list-inline-item">
                                        <a :class="$ml.current == 'ar' ? 'active' : ''" href=""
                                           @click.prevent="changeLang('ar')">عربي</a>
                                    </li>
                                    <li class="list-inline-item">
                                        |
                                    </li>
                                    <li class="list-inline-item">
                                        <a :class="$ml.current == 'en' ? 'active' : ''" href=""
                                           @click.prevent="changeLang('en')">English</a>
                                    </li>
                                </ul>
                                <div class="current_currency">{{$store.getters.getCurrency}}</div>
                            </div>
                        </div>
                        <div class="col-5 text-left">
                            <div class="header_contact">
                                <ul class="list-unstyled direction">
                                    <li class="list-inline-item direction-inverse" v-if="$helper.getSettings().phone1">
                                        <a :href="'tel:'+$helper.getSettings().phone1">
                                            {{$helper.getSettings().phone1}}
                                        </a>
                                    </li>
                                    <li class="list-inline-item direction-inverse" v-if="$helper.getSettings().phone2">
                                        <a :href="'tel:'+$helper.getSettings().phone2">
                                            {{$helper.getSettings().phone2}}
                                        </a>
                                    </li>
                                    <li class="list-inline-item" v-if="$helper.getSettings().facebook">
                                        <a :href="$helper.getSettings().facebook">
                                            <img :src="require('@/assets/images/newImages/facebook.png')" width="30px"
                                                 alt="">
                                        </a>
                                    </li>
                                    <li class="list-inline-item" v-if="$helper.getSettings().twitter">
                                        <a :href="$helper.getSettings().twitter">
                                            <img :src="require('@/assets/images/newImages/twitter.png')" width="30px"
                                                 alt="">
                                        </a>
                                    </li>
                                    <li class="list-inline-item" v-if="$helper.getSettings().snapchat">
                                        <a :href="$helper.getSettings().snapchat">
                                            <img :src="require('@/assets/images/newImages/snapchat.png')" width="30px"
                                                 alt="">
                                        </a>
                                    </li>
                                    <li class="list-inline-item" v-if="$helper.getSettings().instagram">
                                        <a :href="$helper.getSettings().instagram">
                                            <img :src="require('@/assets/images/newImages/instagram.png')" width="30px"
                                                 alt="">
                                        </a>
                                    </li>
                                    <li class="list-inline-item" v-if="$helper.getSettings().front_email">
                                        <a :href="'mailto:'+$helper.getSettings().front_email">
                                            <img :src="require('@/assets/images/newImages/email.png')" width="30px"
                                                 alt="">
                                        </a>
                                    </li>
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="header_fav_cart">
                                <ul class="list-unstyled direction">
                                    <li class="text-left mt-2">
                                        <a href="">
                                            <div class="float-left">
                                                <span>
                                                    {{$ml.get('favourite')}}
                                                 </span>
                                            </div>
                                            <div class="float-right">
                                            <span>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star-half-empty"></i>
                                        </span>
                                            </div>
                                            <div class="clearfix"></div>
                                        </a>
                                    </li>
                                    <li class="text-left mt-4">
                                        <a href="" @click.prevent="modals.modal2 = true">
                                            <div class="float-left">
                                                <span>{{$ml.get('cart')}}</span>
                                            </div>
                                            <div class="position-relative float-right">
                                                <span class="cart_count">{{cart.length}}</span>
                                                <img :src="require('@/assets/images/newImages/cart.png')" width="40px"
                                                     alt="">
                                            </div>
                                            <div class="clearfix"></div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="header_fav_cart">
                                <ul class="list-unstyled text-center direction">
                                    <li class="mt-2 bg-active-login" v-if="!auth_user">
                                        <a class="text-white" href="" @click.prevent="$router.push({name:'login'})">
                                            {{$ml.get('login')}}
                                        </a>
                                    </li>
                                    <li class="mt-3 bg-active-register" v-if="!auth_user">
                                        <a href="" @click.prevent="$router.push({name:'register'})">
                                            {{$ml.get('register')}}
                                        </a>
                                    </li>
                                    <li class="mt-2 bg-active-login" v-if="auth_user">
                                        <a class="text-white" href=""
                                           @click.prevent="$router.push({name:'account'})">
                                            {{$ml.get('my_account')}}
                                        </a>
                                    </li>
                                    <li class="mt-3 bg-active-register" v-if="auth_user">
                                        <a href="" @click.prevent="Logout">
                                            {{this.$ml.get('logout')}}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row direction text-left header_search_bar">
                <div class="col-2 pt-1">
                    {{$ml.get('search')}}
                    <img class="m-1" :src="require('@/assets/images/newImages/search.png')" width="20px"/>
                </div>
                <div class="col-4">
                    <input type="text" class="form-control form-control-alternative"
                           :class="$ml.current == 'ar' ?  'rad_left' : 'rad_right'" :placeholder="$ml.get('search')">
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row direction header_menu_bar">
                <div class="col-12">
                    <ul class="list-unstyled direction list_menu text-left" :class="$ml.current">
                        <li :class="$route.name == 'home' ? 'active' : ''">
                            <a href="">
                                {{$ml.get('home')}}
                            </a>
                        </li>
                        <li :class="$route.name == 'about_us' ? 'active' : ''">
                            <a href="" @click.prevent="$router.push({name:'about_us'})">
                                {{$ml.get('about_us')}}
                            </a>
                        </li>
                        <li :class="$route.name == 'search_result' ? 'active' : ''">
                            <a href="" @click.prevent="$router.push({name:'search_result'})">
                                {{$ml.get('search')}}
                            </a>
                        </li>
                        <li :class="$route.name == 'location' ? 'active' : ''">
                            <a href="" @click.prevent="$router.push({name:'location'})">
                                {{$ml.get('location')}}
                            </a>
                        </li>
                        <li :class="$route.name == 'register_vendor' ? 'active' : ''">
                            <a href="" @click.prevent="$router.push({name:'register_vendor'})">
                                {{$ml.get('contact_us')}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <modal :show.sync="modals.modal2"
               gradient="white"
               modal-classes="modal-danger modal-dialog-centered modal-lg">
            <h6 slot="header" class="modal-title font-weight-bold text-left display-4 text-black direction"
                id="modal-title-notification">
                {{this.$ml.get('your_cart')}}</h6>

            <div class="py-3 text-center">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <cart/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--            <template slot="footer">-->
            <!--                <base-button type="white">{{this.$ml.get('add')}}</base-button>-->
            <!--                <base-button type="link"-->
            <!--                             text-color="white"-->
            <!--                             @click="modals.modal2 = false">-->
            <!--                    {{this.$ml.get('close')}}-->
            <!--                </base-button>-->
            <!--            </template>-->
        </modal>
    </div>
</template>
<script>
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'
    import BaseNav from "@/components/BaseNav";
    import Modal from "@/components/Modal.vue";
    import BaseDropdown from "@/components/BaseDropdown";
    import CloseButton from "@/components/CloseButton";
    import cart from '../views/pages_components/cart'
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
                auth_user: null,
                suggestList: [],
                search: '',
                modals: {
                    modal1: false,
                    modal2: false,
                    modal3: false
                },
            }
        },
        mounted() {
            this.auth_user = localStorage.getItem('auth');
            this.checkStorage();
            this.startHeaderBG();
        },
        methods: {
            checkPointModule() {
                return JSON.parse(localStorage.getItem('pointModule'))
            },
            setQuerySearch(setQuerySearch) {
                let vm = this;
                vm.search = setQuerySearch;
                vm.goToResult()
                // vm.suggestList = [];
            },
            hideSearch() {
                let vm = this;
                setTimeout(() => {
                    vm.suggestList = [];
                }, 100)
            },
            getLogo() {
                this.$helper.getLogo()
            },
            isMobile() {
                if (screen.width <= 760) {
                    return true;
                } else {
                    return false;
                }
            },
            ...mapActions([
                'addToCart',
                'deleteToCart',
                'checkStorage',
                'saveToCart',
                'addAuthUser',
                'deleteAuthUser',
            ]),
            goToResult() {
                let search = this.search
                if (search) {
                    search = search.toLowerCase();
                    let route = this.$router.resolve({name: 'search_result', query: {q: search}});
                    let url = 'http://' + location.host + process.env.VUE_APP_PUBLIC_PATH + '' + route.href;
                    console.log(url)
                    location.href = url
                }
            },
            getApiSuggest() {
                let vm = this;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.PRODUCT_AUTO_COMPLETE, {
                    params: {
                        category: true,
                        lang: vm.lang,
                        query: vm.search,
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.suggestList = data;
                }).catch((error) => {
                    vm.suggestList = []
                })
            },
            startHeaderBG() {
                $(document).ready(function () {
                    let scroll_start = 0;
                    let offset = 600;

                    $(document).scroll(function () {
                        scroll_start = $(this).scrollTop();
                        // console.log(scroll_start)
                        if (scroll_start > offset) {
                            $(".navbar-main").css('background-color', '#2e2e2e');
                        } else {
                            $('.navbar-main').css('background-color', 'transparent');
                        }
                    });

                });
            },
            async Logout() {

                localStorage.removeItem('current_address_data');
                // localStorage.removeItem('current_payment');
                // localStorage.removeItem('current_coupon');
                // localStorage.removeItem('current_address');
                await this.$store.dispatch('deleteAuthUser')
                await this.$store.dispatch('clearCart')
                await this.$store.dispatch('clearOffers')
                await localStorage.removeItem('auth');
                setTimeout(() => {

                    location.reload()
                }, 300)
            },
            changeLang(lang) {
                if (lang) {
                    this.$ml.change(lang)
                }
                if (this.$ml.current == 'en') {
                    // this.$ml.change('en')
                    localStorage.setItem('current_currency', 'KWD')
                } else {
                    // this.$ml.change('ar');
                    localStorage.setItem('current_currency', 'دينار كويتي')
                }
                location.reload()
            }
        },
        computed: {
            ...mapState([
                'auth',
                'cart'
            ]),
        },
        components: {
            BaseNav,
            Modal,
            cart,
            CloseButton,
            BaseDropdown
        }
    };
</script>


<style>
    .header_bar {
        height: 30px;
        background: #00aeef;
    }

    .header_tool_bar {
        padding: 10px 0;
        border-bottom: 1px solid #5d5d5d;
        margin-bottom: 5px;
    }

    .header_tool_bar .header_logo {

    }

    .header_tool_bar .header_lang {
        padding: 12px 15px 0 15px;
        margin: 0 20px 0 20px;
    }

    .header_tool_bar .header_lang ul li a {
        font-size: 15px;
    }

    .header_tool_bar .header_lang ul li a.active {
        font-weight: bold;
    }

    .bg-active-login {
        width: 100%;
        padding: 5px;
        color: #fff;
        background: #5d5d5d;
    }


    .bg-active-register {
        width: 100%;
        text-decoration: underline;
        margin-top: 15px !important;
    }

    .header_tool_bar .current_currency {
        font-weight: bold;
        text-align: center;
        background: #5d5d5d;
        padding: 3px;
        color: #fff;
    }

    .header_tool_bar .header_contact {
        margin-top: 60px;
    }

    .header_tool_bar .header_fav_cart {
        position: relative;
    }

    .header_tool_bar .header_fav_cart .cart_count {
        position: absolute;
        bottom: 15px;
        left: 50%;
        font-weight: bold;
    }

    .header_menu_bar {
        border-top: 1px solid #888;
        border-bottom: 1px solid #888;
    }

    .header_menu_bar .list_menu {

    }

    .header_menu_bar .list_menu {
        margin-top: 5px;
        margin-bottom: 5px;
        padding: 0;
    }

    .header_menu_bar .list_menu li {
        display: inline-block;
        padding: 0 10px;
        border-left: 1px solid #222;
        text-align: center;
    }

    .header_menu_bar .list_menu.ar li:first-child {
        border-right: 0;
    }

    .header_menu_bar .list_menu.ar li:last-child {
        border-left: 0;
    }

    .header_menu_bar .list_menu.en li:first-child {
        border-left: 0;
    }

    .header_menu_bar .list_menu.en li:last-child {
        border-right: 0;
    }

    .header_menu_bar .list_menu li.active {
        font-weight: bold;
        padding: 5px;
    }

    .header_search_bar {
        background: #5d5d5d;
        min-height: 30px;
        color: #fff;
        margin-bottom: 5px;
    }

    .header_menu_bar .list_menu li.active a {
        color: #fff;
        background: #00adee;
        padding: 5px;
    }

    .rad_left {
        border-radius: 25px 0  0 25px!important;
    }

    .rad_right {
        border-radius: 0 25px 25px 0 !important;

    }
</style>
