<template>
    <div>
        <div class="container">
            <div class="header_bar"></div>
            <div class="row direction header_tool_bar">
                <div class="col-12">
                    <div class="d-flex">
                        <div class="header_logo">
                            <img :src="$helper.getLogo()" width="120px" alt="">
                        </div>
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
                        <div class="header_contact">
                            <ul class="list-unstyled">
                                <li class="list-inline-item" v-if="$helper.getSettings().phone1">
                                    <a :href="'tel:'+$helper.getSettings().phone1">
                                        {{$helper.getSettings().phone1}}
                                    </a>
                                </li>
                                <li class="list-inline-item" v-if="$helper.getSettings().phone2">
                                    <a :href="'tel:'+$helper.getSettings().phone2">
                                        {{$helper.getSettings().phone2}}
                                    </a>
                                </li>
                                <li class="list-inline-item"></li>
                                <li class="list-inline-item"></li>
                                <li class="list-inline-item"></li>
                            </ul>
                        </div>
                    </div>
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
        padding: 10px;
    }

    .header_tool_bar .header_logo {

    }

    .header_tool_bar .header_lang {
        padding: 12px 15px 0 15px;
    }

    .header_tool_bar .header_lang ul li a {
        font-size: 15px;
    }

    .header_tool_bar .header_lang ul li a.active {
        font-weight: bold;
    }

    .header_tool_bar .current_currency {
        font-weight: bold;
        text-align: center;
        background: #5d5d5d;
        padding: 3px;
        color: #fff;
    }
</style>
