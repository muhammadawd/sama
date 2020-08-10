<template>
    <div class="best_sales" v-if="products.length">
        <div class="container w_90l_80sm">
            <div class="row">
                <div class="col-md-12">
                    <h3 class="text-white text-left font-weight-bold mt-5">{{$ml.get('best_sales')}}</h3>
                </div>
            </div>
            <div class="d-none d-md-block mt-5">
                <div class="mycontrols">
                    <div class="left">
                        <img :src="require('@/assets/images/newImages/prev-white.png')" class="right"
                             @click="triggerNav('prev')"
                             alt="">
                    </div>
                    <div class="right">
                        <img :src="require('@/assets/images/newImages/next-white.png')" @click="triggerNav('next')"
                             alt="">
                    </div>
                </div>
                <carousel-3d :autoplay="true" :display="5" :controls-visible="true" :perspective="10" :space="320"
                             style="transform: scale(0.8)"
                             :loop="true" :controls-prev-html="' '" :controls-next-html="' '">
                    <slide v-for="(product,key) in products" :index="key">
                        <newOneProductSlicker v-bind:addToCart="addToCart"
                                              v-bind:product="product"></newOneProductSlicker>
                    </slide>
                </carousel-3d>
            </div>
            <div class="d-md-none mb-10 mt-5">
                <VueSlickCarousel id="bestSales" v-if="products.length > 0" class="bestSales center" v-bind="settings"
                                  :arrows="true">
                    <div class="slider_item" v-for="(product,key) in products" :key="key"
                         v-if="key < 20">
                        <newOneProductSlicker v-bind:addToCart="addToCart"
                                              v-bind:product="product"></newOneProductSlicker>
                    </div>
                    <template #prevArrow="arrowOption">
                        <div class="custom-arrow">
                            <img :src="require('@/assets/images/newImages/prev-white.png')" alt="">
                        </div>
                    </template>
                    <template #nextArrow="arrowOption">
                        <div class="custom-arrow">
                            <img :src="require('@/assets/images/newImages/next-white.png')" alt="">
                        </div>
                    </template>
                </VueSlickCarousel>
            </div>
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
    import {Carousel3d, Slide} from 'vue-carousel-3d';
    //
    // import Slick from 'vue-slick';
    // import 'slick-carousel/slick/slick.css';

    import VueSlickCarousel from 'vue-slick-carousel'
    import 'vue-slick-carousel/dist/vue-slick-carousel.css'
    // optional style for arrows & dots
    import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

    Vue.use(Message);

    export default {
        name: "best_sales_products",
        components: {
            newOneProductSlicker, VueSlickCarousel, Carousel3d, Slide
        },
        data() {
            return {
                loadingText: this.$ml.get('loading'),
                products: [],
                lang: this.$ml.current,
                settings: {
                    centerMode: true,
                    centerPadding: '20px',
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
            triggerNav(sel) {
                $(`a.${sel}`).trigger('click')
                $(`a.${sel} span`).trigger('click')
            },
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
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.HOME_ADS, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        vm.products = data.top_products
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
    .best_sales {
        position: relative;
        min-height: 700px;
        background: url("../../assets/images/newImages/best_sales.png") center center no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .w_90l_80sm {
        width: 90% !important;
    }

    @media only screen and (max-width: 768px) {

        .w_90l_80sm {
            width: 70% !important;
        }

        .best_sales {
            background: url("../../assets/images/newImages/best_sales_mobile.png") bottom center no-repeat;
            background-size:cover;
            background-attachment: fixed;
        }
    }

    .bestSales .slick-next img {
        width: 25px;
        position: absolute;
        right: 10px;
    }

    .bestSales .slick-prev img {
        width: 25px;
        position: absolute;
        left: 10px;
        text-align: center;
    }


    .bestSales.center {
        margin-left: -40px;
        margin-right: -40px;
    }


    .bestSales .slick-slide {
        /*background: #fff;*/
        opacity: 0.7;
        transition: all 300ms ease;
        transform: scale(0.75);
    }

    .bestSales.center .slick-slide.slick-active {
        transform: scale(.8);
        opacity: 0.7;
    }

    .bestSales.center .slick-slide.slick-center {
        transform: scale(1);
        opacity: 1;
    }

    .carousel-3d-container {
        height: 600px !important;
    }

    .carousel-3d-container .carousel-3d-slide {
        padding: 0 !important;
        min-height: 600px;
        background: #fff;
    }

    .mycontrols {
        position: absolute;
        top: 40%;
        height: 0;
        margin-top: -10px;
        width: 90%;
        z-index: 1000;
        cursor: pointer;
    }

    .mycontrols .left {
        left: 0;
        position: absolute;
    }

    .mycontrols .right {
        right: 0;
        position: absolute;
    }

    @media only screen and (max-width: 600px) {
        .mycontrols {
            width: 80%;
        }

        .mycontrols .right {
            right: 7px;
        }

        .best_sales {
            min-height: 500px;
        }
    }
</style>
