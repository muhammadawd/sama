<template>
    <div class="best_sales" v-if="products.length">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h3 class="text-white text-left font-weight-bold">{{$ml.get('best_sales')}}</h3>
                </div>
                <div class="col-md-12">
                    <VueSlickCarousel v-bind="settings" :arrows="true">
                        <div class="slider__item " v-for="(product,key) in products" :key="key">

                            <oneProduct v-bind:addToCart="addToCart"
                                        v-bind:product="product"></oneProduct>
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
    import oneProduct from '../pages_components/oneProduct'
    import Vue from 'vue';
    import Message from 'vue-m-message'
    import {mapState, mapActions} from 'vuex'
    //
    // import Slick from 'vue-slick';
    // import 'slick-carousel/slick/slick.css';

    import VueSlickCarousel from 'vue-slick-carousel'
    import 'vue-slick-carousel/dist/vue-slick-carousel.css'
    // optional style for arrows & dots
    import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

    Vue.use(Message);

    export default {
        name: "new_arrival_products",
        components: {
            oneProduct, VueSlickCarousel
        },
        data() {
            return {
                loadingText: this.$ml.get('loading'),
                products: [],
                lang: this.$ml.current,
                settings: {
                    "dots": false,
                    "arrows": true,
                    "autoplay": true,
                    "speed": 2000,
                    "autoplaySpeed": 1500,
                    "cssEase": "linear",
                    "focusOnSelect": true,
                    "centerPadding": '30px',
                    "infinite": true,
                    "centerMode": true,
                    "speed": 500,
                    "slidesToShow": 5,
                    "slidesToScroll": 3,
                    "touchThreshold": 5, "responsive": [
                        {
                            "breakpoint": 1024,
                            "settings": {
                                "slidesToShow": 3,
                                "slidesToScroll": 3,
                            }
                        },
                        {
                            "breakpoint": 600,
                            "settings": {
                                "slidesToShow": 2,
                                "slidesToScroll": 2,
                                "initialSlide": 2
                            }
                        },
                        {
                            "breakpoint": 480,
                            "settings": {
                                "slidesToShow": 2,
                                "slidesToScroll": 2,
                                "initialSlide": 2
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
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.SITE_PRODUCTS, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
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
                    pov: pov
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

    .slick-next img {
        width: 25px;
        position: absolute;
        right: -10px;
    }

    .slick-prev img {
        width: 25px;
        position: absolute;
        left: -10px;
    }

    .slick-slide > div {
        transform: scale(.7);
        transition: transform .3s cubic-bezier(.4, 0, .2, 1);
    }

    .slick-center > div {
        transform: scale(1);
    }

    .best_sales {
        min-height: 550px;
        background: url("../../assets/images/newImages/best_sales.png") center center no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
