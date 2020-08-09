<template>
    <div class="new_arrival" v-if="products.length">
        <div class="container w_90l_80sm">
            <div class="row">
                <div class="col-md-12">
                    <h3 class="text-left font-weight-bold">{{$ml.get('new_arrival')}}</h3>
                </div>
            </div>
            <VueSlickCarousel id="newArrival" v-if="products.length > 0" class="newArrival center" v-bind="settings"
                              :arrows="true">
                <div class="slide_item" v-for="(product,key) in products" :key="key">
                    <newOneProductSlicker v-bind:addToCart="addToCart"
                                   v-bind:product="product"></newOneProductSlicker>
                </div>
                <template #prevArrow="arrowOption">
                    <div class="custom-arrow">
                        <img :src="require('@/assets/images/newImages/prev.png')" alt="">
                    </div>
                </template>
                <template #nextArrow="arrowOption">
                    <div class="custom-arrow">
                        <img :src="require('@/assets/images/newImages/next.png')" alt="">
                    </div>
                </template>
            </VueSlickCarousel>
        </div>
        <!--<VueSlickCarousel v-bind="settings">-->
        <!--<div class="p-1" v-for="(product,key) in products" :key="key">-->
        <!--<oneProduct v-bind:addToCart="addToCart"-->
        <!--v-bind:product="product"></oneProduct>-->
        <!--</div>-->
        <!--</VueSlickCarousel>-->
    </div>
</template>

<script>
    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'
    import newOneProductSlicker from '../pages_components/newOneProductSlicker'
    import Vue from 'vue';
    import Message from 'vue-m-message'
    import {mapState, mapActions} from 'vuex'

    import VueSlickCarousel from 'vue-slick-carousel'
    import 'vue-slick-carousel/dist/vue-slick-carousel.css'
    // optional style for arrows & dots
    import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

    Vue.use(Message);

    export default {
        name: "new_arrival_products",
        components: {
            newOneProductSlicker, VueSlickCarousel
        },
        data() {
            return {
                loadingText: this.$ml.get('loading'),
                products: [],
                lang: this.$ml.current,
                settings: {
                    centerMode: true,
                    centerPadding: '60px',
                    slidesToShow: 5,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    slidesToScroll: 5,
                    arrows: true,
                    dots: false,
                    focusOnSelect: true,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                arrows: true,
                                centerMode: true,
                                centerPadding: '40px',
                                slidesToShow: 2
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                arrows: true,
                                centerMode: true,
                                centerPadding: '40px',
                                slidesToShow: 1
                            }
                        }
                    ]
                }
            }
        },
        methods: {
            next() {
                this.$refs.slick.next();
            },

            prev() {
                this.$refs.slick.prev();
            },

            reInit() {
                // Helpful if you have to deal with v-for to update dynamic lists
                this.$nextTick(() => {
                    this.$refs.slick.reSlick();
                });
            },
            getAllProducts() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                // HOME_ADS
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.SITE_PRODUCTS, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        // vm.products = data.recent_products
                        vm.products = data.products
                    }
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;

                })
            },
            addToCart(product) {
                let vm = this;
                let pov = product.product_option_values[0];
                let normal_product = vm.prepareProductToCart(product, pov);
                vm.bindToCart(normal_product);
            },
            prepareProductToCart(master, pov) {
                return {
                    product_id: master.id,
                    branch_id: master.branch_id,
                    store_id: pov.store_detail ? pov.store_detail.store_id : null,
                    product_translation: master.translated,
                    min_amount_needed: pov.min_amount_needed ? pov.min_amount_needed : 1,
                    pov: pov,
                    product: master,
                };
            },
            bindToCart(product) {
                let vm = this;
                let found = false;
                let product_id = product.pov.id;
                vm.cart.filter((value, index, arr) => {
                    if (product_id == value.pov.id) {
                        found = true;
                    }
                });
                if (found) {

                    Message({
                        title: vm.$ml.get('error'),
                        message: vm.$ml.get('already_added'),
                        className: 'bg-gray text-white',
                        zIndex: 9999999,
                        iconImg: require('@/assets/error.png'),
                        position: 'bottom-center',
                        // type: 'error',
                        showClose: true
                    })
                    return;
                }
                Message({
                    title: vm.$ml.get('success'),
                    message: vm.$ml.get('added_to_cart'),
                    className: 'bg-success text-white',
                    zIndex: 9999999,
                    iconImg: require('@/assets/success.png'),
                    position: 'bottom-center',
                    // type: 'error',
                    showClose: true
                });
                vm.$store.dispatch('addToCart', product);
            },
        },
        mounted() {
            this.getAllProducts()
        },
        computed: {
            ...mapState([
                'auth',
                'cart'
            ])
        },
    }
</script>

<style>
    .slick-prev:before, .slick-next:before {
        display: none;
    }

    .newArrival .slick-next img {
        width: 25px;
        position: absolute;
        right: 10px;
    }

    .newArrival .slick-prev img {
        width: 25px;
        position: absolute;
        left: 10px;
        text-align: center;
    }

    /*.slick-slide {*/
    /*padding: 50px;*/
    /*}*/

    /*.slick-slide > div {*/
    /*min-height: 200px;*/
    /*transform: scale(.7);*/
    /*transition: transform .3s cubic-bezier(.4, 0, .2, 1);*/
    /*}*/

    /*.slick-center > div {*/
    /*transform: scale(1);*/
    /*}*/

    .new_arrival {
        min-height: 650px;
        background: url("../../assets/images/newImages/new_arrival.png") left center no-repeat;
        background-size: contain;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #f6f6f6;
        box-shadow: inset 1px 2px 10px 20px #eee;
    }

    .w_90l_80sm {
        width: 90% !important;
    }

    @media only screen and (max-width: 768px) {

        .w_90l_80sm {
            width: 70% !important;
        }
    }


    .newArrival.center {
        margin-left: -40px;
        margin-right: -40px;
    }


    .newArrival .slick-slide {
        /*background: #fff;*/
        opacity: 0.5;
        transition: all 300ms ease;
        transform: scale(0.7);
    }

    .newArrival.center .slick-slide.slick-active {
        transform: scale(.8);
        opacity: 0.7;
    }

    .newArrival.center .slick-slide.slick-center {
        transform: scale(1);
        opacity: 1;
    }

</style>
