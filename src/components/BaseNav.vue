<template>
    <nav class="navbar"
         :class="[
            {'navbar-expand-lg': expand},
            {[`navbar-${effect}`]: effect},
            {'navbar-transparent': transparent},
            {[`bg-${type}`]: type},
            {'rounded': round}
         ]">
        <div class="container">
            <slot name="container-pre"></slot>
            <slot name="brand">
                <a class="navbar-brand" href="#" @click.prevent="onTitleClick">
                    {{title}}
                </a>
            </slot>

            <slot name="content-cart"></slot>

            <slot name="content-lang"></slot>

            <Slide v-if="isMobile()" right>
                <div class="row">
                    <div class="col-md-12 text-left">
                        <ul class="list-unstyled direction p-0">
                            <li class="nav-item p-1">
                                <!--<a href="/zashtest2" class="nav-link">-->
                                <!--<span class="nav-link-inner&#45;&#45;text font-weight-bold text-capitalize">{{this.$ml.get('home')}}</span>-->
                                <!--</a>-->

                                <router-link :to="{name:'home'}" class="nav-link get-toggle-button">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize direction-inverse">
                                        <i class="fa fa-home"></i>
                                        {{this.$ml.get('home')}}
                                    </span>
                                </router-link>
                            </li>
                            <li class="nav-item p-1">
                                <router-link :to="{name:'search_result'}" class="nav-link get-toggle-button">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">
                                        <i class="fa fa-search"></i>
                                        {{this.$ml.get('search')}}
                                    </span>
                                </router-link>
                            </li>
                            <li class="nav-item p-1">
                                <router-link :to="{name:'about_us'}" class="nav-link get-toggle-button">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">
                                        <i class="fa fa-archive"></i>
                                        {{this.$ml.get('about_us')}}
                                    </span>
                                </router-link>
                            </li>
                            <li class="nav-item p-1">
                                <router-link :to="{name:'authors'}" class="nav-link get-toggle-button">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">
                                        <i class="fa fa-user"></i>
                                        {{this.$ml.get('authors')}}
                                    </span>
                                </router-link>
                            </li>
                            <li class="nav-item p-1">
                                <router-link :to="{name:'events'}" class="nav-link get-toggle-button">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">
                                        <i class="fa fa-gift"></i>
                                        {{this.$ml.get('events')}}
                                    </span>
                                </router-link>
                            </li>
                            <li class="nav-item p-1">
                                <router-link :to="{name:'register_vendor'}" class="nav-link get-toggle-button">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">
                                        <i class="fa fa-phone"></i>
                                        {{this.$ml.get('contact_us')}}
                                    </span>
                                </router-link>
                            </li>
                            <li class="nav-item p-1">
                                <router-link :to="{name:'location'}" class="nav-link get-toggle-button">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">
                                        <i class="fa fa-map"></i>
                                        {{this.$ml.get('location')}}
                                    </span>
                                </router-link>
                            </li>
                            <li class="nav-item p-1" v-if="auth_user">
                                <router-link :to="{name:'account'}" class="nav-link get-toggle-button">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">
                                        <i class="fa fa-user"></i>
                                        {{this.$ml.get('my_account')}}
                                    </span>
                                </router-link>
                            </li>
                            <li class="nav-item p-1" v-if="auth_user && checkPointModule()">
                                <router-link :to="{name:'my_points'}" class="nav-link get-toggle-button">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">
                                        <i class="fa fa-gift"></i>
                                        {{this.$ml.get('my_points')}}
                                    </span>
                                </router-link>
                            </li>
                            <li class="nav-item p-1 get-toggle-button" v-if="auth_user">
                                <a href="" @click.prevent="Logout" class="nav-link">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">
                                        <i class="fa fa-sign-out"></i>
                                        {{this.$ml.get('logout')}}
                                    </span>
                                </a>
                            </li>
                            <li class="nav-item p-1" v-if="!auth_user">
                                <router-link :to="{name:'login'}" class="nav-link nav-link-icon get-toggle-button">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">
                                        <i class="fa fa-sign-in"></i>
                                        {{this.$ml.get('login')}}
                                    </span>
                                </router-link>
                            </li>
                            <li class="nav-item p-1" v-if="!auth_user">
                                <router-link :to="{name:'register'}"
                                             class="nav-link nav-link-icon get-toggle-button">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">
                                        <i class="fa fa-address-card"></i>
                                        {{this.$ml.get('register')}}
                                    </span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="col-12 p-0 text-left">
                        <hr class="m-0"/>
                        <ul class="list-unstyled">
                            <li class="nav-item p-2 pb-0">
                                <span class="nav-link-inner--text font-weight-bold text-capitalize text-success">{{this.$ml.get('categories')}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="col-12 pt-0 pl-4" v-for="(cat , key) in categories" :key="key"
                         @click="$router.push({name:'search_result',query:{q:(cat.translated.title ? cat.translated.title.toLowerCase() : ''),category_id:cat.id}})">
                        <div class="text-left p-1 pb-0 pt-0">
                            <h3 class="font-weight-bold pt-2"
                                style="font-size: 14px;white-space: nowrap;text-overflow: ellipsis">
                                {{cat.translated.title}}
                            </h3>
                        </div>
                    </div>
                </div>
            </Slide>
            <navbar-toggle-button v-if="!isMobile()" :toggled="toggled"
                                  :target="contentId"
                                  @click.native.stop="toggled = !toggled">
            </navbar-toggle-button>
            <!--<navbar-toggle-button class="get-toggle-button">-->
            <!--</navbar-toggle-button>-->

            <slot name="container-after"></slot>

            <div class="collapse navbar-collapse" :class="{show: toggled}" :id="contentId" v-click-outside="closeMenu">
                <div class="navbar-collapse-header">
                    <slot name="content-header" :close-menu="closeMenu"></slot>
                </div>
                <slot :close-menu="closeMenu"></slot>
            </div>

        </div>
        <div class="container-fluid" v-if="isMobile()">
            <div class="w-100">
                <div class="col-md-12">
                    <slot name="content-search"></slot>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
    import {FadeTransition} from "vue2-transitions";
    import NavbarToggleButton from "./NavbarToggleButton";
    import {Slide} from 'vue-burger-menu'
    import {mapState, mapActions} from 'vuex'
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'


    export default {
        name: "base-nav",
        components: {
            Slide,
            FadeTransition,
            NavbarToggleButton
        },
        props: {
            type: {
                type: String,
                default: "primary",
                description: "Navbar type (e.g default, primary etc)"
            },
            title: {
                type: String,
                default: "",
                description: "Title of navbar"
            },
            contentId: {
                type: [String, Number],
                default: Math.random().toString(),
                description:
                    "Explicit id for the menu. By default it's a generated random number"
            },
            effect: {
                type: String,
                default: "dark",
                description: "Effect of the navbar (light|dark)"
            },
            round: {
                type: Boolean,
                default: false,
                description: "Whether nav has rounded corners"
            },
            transparent: {
                type: Boolean,
                default: false,
                description: "Whether navbar is transparent"
            },
            expand: {
                type: Boolean,
                default: false,
                description: "Whether navbar should contain `navbar-expand-lg` class"
            }
        },
        data() {
            return {
                auth_user: null,
                lang: this.$ml.current,
                toggled: false,
                categories: [],
            };
        },
        mounted() {

            this.auth_user = localStorage.getItem('auth');
            this.getAllCategory();
        },
        computed: {
            ...mapState([
                'auth',
                'cart'
            ]),
        },
        methods: {
            checkPointModule() {
                return JSON.parse(localStorage.getItem('pointModule'))
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
            getAllCategory() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.FIND_CATEGORIES, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    if (status) {
                        vm.categories = data.categories
                        return;
                    }
                    vm.categories = [];
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    vm.categories = [];
                })
            },
            isMobile() {
                if (screen.width <= 760) {
                    return true;
                } else {
                    return false;
                }
            },
            onTitleClick(evt) {
                this.$emit("title-click", evt);
            },
            closeMenu() {
                this.toggled = false;
            }
        }
    };
</script>

<style>
    .bm-burger-button {
        position: absolute !important;
        width: 24px !important;
        height: 18px !important;
        /*right: 0!important;*/
        top: 28px;
        cursor: pointer;
        left: 15px !important;;
        right: auto !important;
    }

    .bm-burger-bars {
        background-color: #7f7f7f !important;;
    }

    .bm-menu {
        background-color: #fff !important;
        left: 0 !important;;
        right: auto !important;
    }

    .bm-item-list {
        font-size: 15px !important;
    }
</style>
