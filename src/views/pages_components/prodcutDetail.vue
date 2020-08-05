<template>
    <div class="row direction" v-if="product">
        <div class="col-md-4">
            <div class="product_card bg-main text-center text-white">
                <img v-for="(image , key) in selected_images" :key="key" v-if="key == 0" @
                     :src="image.path" class="image" alt="..">
                <h4 class="font-weight-bold text-white">
                    {{$ml.get('book')}} : {{product.translated ? product.translated.title : ''}}
                </h4>
                <h4 class="font-weight-bold text-white">
                    {{$ml.get('author')}} : {{product.author ? product.author.translated.title : ''}}
                </h4>
                <h4 class="text-white" v-if="pov">
                    <b>
                        {{pov.price && parseFloat(pov.price).toFixed(3) != 0 ? (parseFloat(pov.price).toFixed(3) + ' ' )
                        :
                        $ml.get('undefined_price')}}
                    </b> {{getCurrency()}}
                </h4>
                <div class="btn-group" dir="ltr">
                    <button class="btn btn-secondary" @click="addToFavourite(product)"
                            style="background: #5d5d5d;color: #fff;">
                        <i class="fa fa-star m-0 p-0"></i>
                        <i class="fa fa-star m-0 p-0"></i>
                    </button>
                    <a class="btn btn-secondary" :href="product.book_file_path" :disabled="!product.book_file_path"
                       target="_blank" :class="!product.book_file_path ? 'disabled' : ''">
                        <i class="fa fa-book"></i>
                    </a>
                    <button class="btn btn-secondary" v-if="pov"
                            :disabled="pov.store_detail && (pov.store_detail.quantity - pov.store_detail.reserved == 0)"
                            @click="AddToCart()">
                        <i class="fa fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="row">
                <div class="col-md-12 mt-2">
                    <h3 class="main_color font-weight-bold float-left">
                        {{product.translated ? product.translated.title: ''}}
                    </h3>
                    <div class="float-right">
                        <b>{{$ml.get('share')}}</b>
                        <ul class="list-unstyled p-0 m-0">
                            <li class="list-inline-item animIcons">
                                <a href="" @click.prevent="shareWhatsapp()">
                                    <div class="btn-social">
                                        <i class="fa fa-whatsapp fa-lg"></i>
                                    </div>
                                </a>
                            </li>
                            <li class="list-inline-item animIcons">
                                <a href="" @click.prevent>
                                    <ShareNetwork
                                            network="facebook"
                                            :url="getShareData(product).url"
                                            :title="getShareData(product).title"
                                            :description="getShareData(product).description"
                                            :quote="getShareData(product).description"
                                            hashtags="shopping_books">
                                        <div class="btn-social">
                                            <i class="fa fa-facebook fa-lg"></i>
                                        </div>
                                    </ShareNetwork>
                                </a>
                            </li>
                            <li class="list-inline-item animIcons">
                                <a href="" @click.prevent>
                                    <ShareNetwork
                                            network="twitter"
                                            :url="getShareData(product).url"
                                            :title="getShareData(product).title"
                                            :description="getShareData(product).description"
                                            :quote="getShareData(product).description"
                                            hashtags="shopping_books">
                                        <div class="btn-social">
                                            <i class="fa fa-twitter fa-lg"></i>
                                        </div>
                                    </ShareNetwork>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="clearfix"></div>
                    <div class="w-100">
                        <hr class="m-0 mt-2">
                    </div>
                </div>
                <div class="col-md-6 mt-2">
                    <p class="lead text-left">{{product.translated ? product.translated.description : ''}}</p>
                </div>
                <div class="col-md-6 mt-2">
                    <table class="table table-bordered" v-if="pov">
                        <tr>
                            <td class="font-weight-bold text-left">{{$ml.get('section')}}</td>
                            <td class="text-center">{{product.category.translated.title}}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold text-left">{{$ml.get('book')}}</td>
                            <td class="text-center">{{product.translated ? product.translated.title : ''}}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold text-left">{{$ml.get('author')}}</td>
                            <td class="text-center">{{product.author ? product.author.translated.title : ''}}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold text-left">{{$ml.get('publisher')}}</td>
                            <td class="text-center"> {{product.translated ? product.translated.publisher : ''}}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold text-left">{{$ml.get('status')}}</td>
                            <td class="text-center">{{!(pov.store_detail && (pov.store_detail.quantity -
                                pov.store_detail.reserved == 0)) ? $ml.get('av') : $ml.get('no_av')}}
                            </td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold text-left">{{$ml.get('published_at')}}</td>
                            <td class="text-center">{{pov.publish_year}}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold text-left">{{$ml.get('quantity')}}</td>
                            <td class="text-center">{{pov.store_detail ? (pov.store_detail.quantity -
                                pov.store_detail.reserved) : '0'}}
                            </td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold text-left">{{$ml.get('measurement')}}</td>
                            <td class="text-center" dir="ltr">{{pov.size}}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold text-left">{{$ml.get('page_no')}}</td>
                            <td class="text-center">{{pov.page_number}}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold text-left">{{$ml.get('weight')}}</td>
                            <td class="text-center">{{pov.weight}}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold text-left">{{$ml.get('product_no')}}</td>
                            <td class="text-center">{{pov.barcode}}</td>
                        </tr>
                        <tr>
                            <td class="font-weight-bold text-left">{{$ml.get('visits')}}</td>
                            <td class="text-center">{{product.views}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-md-12" v-if="related_products.length">
            <recommend_products :related_products="related_products"
                                :title="$ml.get('recommended')"></recommend_products>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapState, mapActions} from 'vuex'
    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'
    import BCarousel from "bootstrap-vue/es/components/carousel/carousel";
    import BCarouselSlide from "bootstrap-vue/es/components/carousel/carousel-slide";
    import StarRating from 'vue-star-rating'
    import Message from 'vue-m-message'
    import Tabs from 'vue-tabs-with-active-line';
    import {Pano} from 'vuejs-vr'// require styles
    import 'swiper/css/swiper.css'
    import VueProductSpinner from 'vue-product-spinner'
    import recommend_products from './recommend_products';
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    Vue.use(Message);


    export default {
        name: "prodcutDetail",
        data() {
            return {
                related_products: [],
                tabs: [
                    {title: this.$ml.get('description'), value: 'tab1'},
                    // {title: this.$ml.get('more_details'), value: 'tab2'}
                ],
                currentTab: 'tab1',
                product: null,
                swiperOptionTop: {
                    direction: 'vertical',
                    spaceBetween: 10,
                    slidesPerView: 1,
                    centeredSlides: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        progressbarOpposite: true
                    },
                    // breakpoints: {
                    //     1024: {
                    //         slidesPerView: 1,
                    //         spaceBetween: 40
                    //     },
                    //     768: {
                    //         slidesPerView: 1,
                    //         spaceBetween: 30
                    //     },
                    //     640: {
                    //         slidesPerView: 1,
                    //         spaceBetween: 20
                    //     },
                    //     320: {
                    //         slidesPerView: 1,
                    //         spaceBetween: 10
                    //     }
                    // }
                },
                swiperOptionThumbs: {
                    direction: 'vertical',
                    spaceBetween: 10,
                    centeredSlides: true,
                    slidesPerColumn: 0,
                    slidesPerView: 'auto',
                    touchRatio: 0.2,
                    slideToClickedSlide: true
                },
                swiperOptionThumbsMobile: {
                    direction: 'horizontal',
                    spaceBetween: 10,
                    centeredSlides: true,
                    slidesPerColumn: 0,
                    slidesPerView: 'auto',
                    touchRatio: 0.2,
                    slideToClickedSlide: true
                },
                images: [
                    'https://images.www.fendi.com/images/h7c/h35/8909556121630/8BN2903ZNF0KUR_01_large',
                    'https://images.www.fendi.com/images/hd0/h92/8909503725598/8BN2903ZNF0KUR_02_large',
                    'https://images.www.fendi.com/images/h7c/h35/8909556121630/8BN2903ZNF0KUR_01_large',
                    'https://images.www.fendi.com/images/hd0/h92/8909503725598/8BN2903ZNF0KUR_02_large',
                    'https://images.www.fendi.com/images/h7c/h35/8909556121630/8BN2903ZNF0KUR_01_large',
                ],
                image_360: false,
                images_360: [],
                isProduct: null,
                rating: 0,
                isOutOfStock: false,
                pov: null,
                options: [],
                real_products: [],
                selected_images: [],
                selected_options: [],
                lang: this.$ml.current,
            }
        },
        mounted() {
            let vm = this;
            let id = this.$route.params.id;
            let branch_id = this.$route.params.branch_id;
            // setTimeout(() => {
            //     this.$nextTick(() => {
            //         const swiperTop = vm.$refs.swiperTop.swiper
            //         const swiperThumbs = vm.$refs.swiperThumbs.swiper
            //         swiperTop.controller.control = swiperThumbs
            //         swiperThumbs.controller.control = swiperTop
            //
            //         swiperTop.slideTo(2, 1000, false)
            //
            //     })
            // }, 1500);

            vm.getProductDetails(id, branch_id);
            // vm.getRotateImage('https://www.jqueryscript.net/demo/Minimal-3D-Image-Rotator-Viewer-Plugin-With-jQuery-rotate3D/img/', 22, '.jpg')
        }, watch: {
            '$route'(to, from) {
                location.reload()
            }
        },
        computed: {
            ...mapState([
                'cart',
                'favourites',
                'auth',
            ])
        },
        methods: {
            addToFavourite(product) {
                let vm = this;
                let pov = product.product_option_values[0];
                let normal_product = vm.prepareProductToCart(product, pov);
                console.log(normal_product)
                vm.bindToFavourite(normal_product);
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
            bindToFavourite(product) {
                let vm = this;
                let found = false;
                let product_id = product.pov.id;
                vm.favourites.filter((value, index, arr) => {
                    if (product_id == value.pov.id) {
                        found = true;
                    }
                });
                if (found) {

                    Message({
                        title: vm.$ml.get('error'),
                        message: vm.$ml.get('already_added_fv'),
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
                    message: vm.$ml.get('added_to_fav'),
                    className: 'bg-success text-white',
                    zIndex: 9999999,
                    iconImg: require('@/assets/success.png'),
                    position: 'bottom-center',
                    // type: 'error',
                    showClose: true
                });
                vm.$store.dispatch('addToFavourite', product);
            },
            getCurrency() {
                return this.$store.getters.getCurrency
            },
            getPercent($oldFigure, $newFigure) {
                let percentChange = 0;
                if (($oldFigure != 0) && ($newFigure != 0)) {
                    percentChange = (1 - $oldFigure / $newFigure) * 100;
                }
                // return parseFloat(percentChange).toFixed(2);
                return Math.round(parseFloat(percentChange));
            },
            // getRotateImage(path, count, ext) {
            //
            //     $('.photo_3d').rotate3d({
            //         'source': path,
            //         'ext': ext,
            //         'count': count,
            //         'speed': 10,
            //     });
            // },
            shareWhatsapp() {
                let current = window.location.href;
                window.location.href = `https://api.whatsapp.com/send?text=${current}`;
            },
            getShareData(product) {
                return {
                    url: window.location.href,
                    title: 'تسوق افضل الكتب الان',
                    description: product.translated.title + ' ' + (product.translated.description ? product.translated.description : ''),
                }
            },
            handleClick(newTab) {
                this.currentTab = newTab;
            },
            ...mapActions([
                'addToCart',
                'deleteToCart',
                'checkStorage',
                'saveToCart'
            ]),
            AddToCart() {
                let vm = this;
                vm.pov = vm.product.product_option_values[0];
                let prepared_data = {
                    product_id: vm.product.id,
                    branch_id: vm.product.branch_id,
                    store_id: vm.pov.store_detail ? vm.pov.store_detail.store_id : null,
                    product_translation: vm.product.translated,
                    min_amount_needed: vm.pov.min_amount_needed ? vm.pov.min_amount_needed : 1,
                    pov: vm.pov
                };
                vm.bindToCart(prepared_data)
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
                    // iconImg: './img/icons/common/success.png',
                    iconImg: require('@/assets/success.png'),
                    position: 'bottom-center',
                    // type: 'error',
                    showClose: true
                });
                vm.$store.dispatch('addToCart', product);
            },
            isMobile() {
                if (screen.width <= 760) {
                    return true;
                } else {
                    return false;
                }
            },
            minusAmount() {
                let vm = this;
                let element = vm.pov;
                if (vm.pov.min_amount_needed == 1) return
                vm.pov.min_amount_needed--;
                let av_quantity = vm.checkValidQuantity(element);
                if (!av_quantity.status) {
                    vm.errorMessage(av_quantity.available);
                    element.min_amount_needed = av_quantity.available;
                }
            },
            plusAmount() {
                let vm = this;
                vm.pov.min_amount_needed++;
                let element = vm.pov;
                let av_quantity = vm.checkValidQuantity(element);
                if (!av_quantity.status) {
                    vm.errorMessage(av_quantity.available);
                    element.min_amount_needed = av_quantity.available;
                }
            },
            updateAmount($event) {
                let vm = this;
                let element = vm.pov;
                vm.pov.min_amount_needed = $event.target.value;
                vm.$root.$children[0].$refs.loader.show_loader = true;

                let av_quantity = vm.checkValidQuantity(element);
                if (!av_quantity.status) {
                    vm.errorMessage(av_quantity.available);
                    element.min_amount_needed = av_quantity.available;
                }

                setTimeout(() => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }, 1000)
            },
            checkValidQuantity(pov) {
                if (pov.store_detail) {
                    let reserved = pov.store_detail.reserved;
                    let quantity = pov.store_detail.quantity;
                    let available = quantity - reserved;

                    if (available >= pov.min_amount_needed) {
                        return {
                            status: true,
                            available: available
                        }
                    }
                    return {
                        status: false,
                        available: available
                    }
                }
                return {
                    status: false,
                    available: 0
                }

            },
            errorMessage(amount = 0) {
                let vm = this;
                Message({
                    title: vm.$ml.get('error'),
                    message: vm.$ml.get('no_sufficient_amount') + ' ' + amount,
                    className: 'bg-warning text-white',
                    zIndex: 9999999,
                    iconImg: require('@/assets/error.png'),
                    position: 'bottom-center',
                    // type: 'error',
                    showClose: true
                });
            },
            getRate(val) {
                val = parseFloat(val);
                if (val == 5) {
                    return `<ul class="p-0 mb-1">
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                            </ul>`;
                } else if (val == 1) {
                    return `<ul class="p-0 mb-1">
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                            </ul>`;
                } else if (val == 2) {
                    return `<ul class="p-0 mb-1">
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                            </ul>`;
                } else if (val == 3) {
                    return `<ul class="p-0 mb-1">
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                            </ul>`;
                } else if (val == 4) {
                    return `<ul class="p-0 mb-1">
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                            </ul>`;
                } else if (val == 5) {
                    return `<ul class="p-0 mb-1">
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                            </ul>`;
                } else if (val > 0 && val <= 2.5) {
                    return `<ul class="p-0 mb-1">
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-half-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                            </ul>`;
                } else if (val > 2.5 && val <= 4.5) {

                    return `<ul class="p-0 mb-1">
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-half-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                            </ul>`;
                } else {

                    return `<ul class="p-0 mb-1">
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                                <li class="list-inline-item"><i
                                        class="fa fa-star-o text-warning"></i>
                                </li>
                            </ul>`;
                }
            },
            resetOptions() {
                let vm = this;
                $('.radio-button_input').prop("checked", false);
                vm.checked = [];
                vm.isProduct = null
                vm.pov = null
                $('.radio-button').css({opacity: 1});
            },
            changeSelectedOptions() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                let checked = [];
                $.each($('.radio-button_input:checked'), function (index, input) {
                    checked.push(parseInt(input.value))
                });

                // $('.radio-button').hide();
                $('.radio-button').css({opacity: 0.5});
                // let arr1 = [1, 4];
                // let arr2 = [1, 2 , 3];
                //
                // let isFounded = arr1.some(ai => arr2.includes(ai));
                // console.log(vm.arrayContainsAnotherArray(checked, arr2))
                // console.log(JSON.stringify(checked))
                $.each(vm.real_products, function (index, product) {
                    if (product != undefined) {
                        if (vm.arrayContainsAnotherArray(checked, product)) {
                            $.each(product, function (index, last_to_show) {
                                // $(`.my_option_${last_to_show}`).show();
                                $(`.my_option_${last_to_show}`).css({opacity: 1});
                            })
                        }
                    }
                });
                // $.each(checked, function (index, item) {
                //     $.each(vm.real_products, function (index, product) {
                //         if (product != undefined) {
                //             if (product.includes(item)) {
                //                 $.each(product, function (index, last_to_show) {
                //                     $(`.my_option_${last_to_show}`).css({opacity: 1});
                //                 })
                //             }
                //         }
                //     })
                // });

                vm.selected_options = checked;
                vm.getProduct();
                setTimeout(() => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }, 100)
            },
            arrayContainsAnotherArray(needle, haystack) {
                for (var i = 0; i < needle.length; i++) {
                    if (haystack.indexOf(needle[i]) === -1)
                        return false;
                }
                return true;
            },
            arr_diff(a1, a2) {

                var a = [], diff = [];

                for (var i = 0; i < a1.length; i++) {
                    a[a1[i]] = true;
                }

                for (var i = 0; i < a2.length; i++) {
                    if (a[a2[i]]) {
                        delete a[a2[i]];
                    } else {
                        a[a2[i]] = true;
                    }
                }

                for (var k in a) {
                    diff.push(k);
                }

                return diff;
            },
            getProduct() {
                let vm = this;
                try {
                    vm.isProduct = null;
                    vm.pov = null;
                    vm.isOutOfStock = false;
                    $.each(vm.real_products, function (index, arr1) {
                        let arr2 = JSON.parse(JSON.stringify(vm.selected_options));
                        if (arr1 != undefined) {
                            arr1 = arr1.sort();
                            arr2 = arr2.sort();
                        }
                        if (JSON.stringify(arr1) === JSON.stringify(arr2)) {
                            // console.log('They are equal!');
                            // console.log('POVID is : ' + index);
                            vm.isProduct = index;
                            return;
                        }
                    });
                    if (vm.isProduct) {
                        vm.getPOV(vm.isProduct)
                    } else {
                        vm.isProduct = null;
                        vm.pov = null;
                    }
                } catch (e) {
                    // console.log(e)
                }
            },
            getPOV(id) {
                let vm = this;
                $.each(vm.product.product_option_values, function (index, pov) {
                    if (pov.id == id) {
                        vm.pov = pov;
                        let preimages = [];
                        $.each(pov.files, function (index, file) {
                            preimages.push({path: file.path + '/' + file.name})
                        });
                        vm.selected_images = preimages;
                        // vm.selected_images = pov.files;
                        if (pov.store_detail.quantity == 0) {
                            vm.isOutOfStock = true
                        } else {
                            vm.isOutOfStock = false
                        }
                    }
                });
            },
            getProductDetails(id, branch_id) {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                // FIND_PRODUCT
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.FIND_PRODUCT + `/${id}/${branch_id}`, {
                    params: {
                        lang: vm.lang,
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        vm.product = data.product;
                        vm.related_products = data.related_products;
                        vm.pov = data.product.product_option_values[0];

                        // vm.selected_images = vm.pov.files;

                        let preimages = [];
                        $.each(vm.pov.files, function (index, file) {
                            preimages.push({path: file.path})
                        });
                        vm.selected_images = preimages;

                        vm.selected_images.push({
                            path: data.product.main_image,
                            type: 'image'
                        });

                        vm.images_360 = JSON.parse(JSON.stringify(vm.pov.image_collection));
                        if (vm.images_360.length > 0) vm.image_360 = true
                        console.log('360 images', vm.images_360.length, JSON.parse(JSON.stringify(vm.pov.image_collection)))
                        // vm.selected_images = [{
                        //     path: data.product.main_image
                        // }];
                        vm.options = data.product.options;
                        console.log(data.product)
                        vm.prepareOptions();
                        vm.$root.$children[0].$refs.loader.show_loader = false;
                        console.log(vm.pov)
                    }
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                })
            },
            prepareOptions() {
                let vm = this;
                let pov = vm.product.product_option_values;
                let options = JSON.parse(JSON.stringify(vm.options));
                let option_values = [];

                // prepare model
                $.each(pov, function (index, _pov) {
                    vm.real_products[_pov.id] = [];
                    $.each(_pov.product_option_value_details, function (index, _povd) {
                        vm.real_products[_pov.id].push(_povd.option_value.id)
                        option_values.push(vm.appendOptionValues(_povd.option_value))
                    })
                });


                // append option values to it's option
                $.each(options, function (index, option) {
                    option['option_values'] = [];
                    $.each(option_values, function (index, option_value) {
                        if (option_value.option_id == option.id) option.option_values.push(option_value)
                        // console.log(option_value)
                    });
                });

                // filter duplicates
                let _option_values = [];
                $.each(options, function (index, option) {
                    var filtered_options = option.option_values.filter(function (entry) {
                        if (_option_values[entry.option_value_id]) {
                            return false;
                        }
                        _option_values[entry.option_value_id] = true;
                        return true;
                    });
                    option.option_values = filtered_options;
                });

                vm.options = options;
            },
            appendOptionValues(option_value) {
                return {
                    option_id: option_value.option_id,
                    option_value_id: option_value.id,
                    option_value_translation: option_value.translated,
                    option_value__unit_translation: option_value.unit ? option_value.unit.translated : {title: null}
                    // option_value__unit_translation: ''
                };
            }
        },
        components: {
            swiper,
            swiperSlide,
            VueProductSpinner,
            BCarousel,
            BCarouselSlide,
            recommend_products,
            Tabs,
            Pano,
            StarRating
        }
    }
</script>

<style scoped>

    .product_card {
        border-radius: 40px 0 40px 0;
        min-height: 350px;
        padding: 25px;
        background-color: #00aeef;
    }

    .product_card .image {
        width: 100%;
        min-height: 200px;
        background: #fff;
    }

    .btn-social {
        width: 40px;
        height: 40px;
        line-height: 40px;
        color: #5d5d5d;
        text-align: center;
        border-radius: 7px;
        border: 1px solid #5d5d5d;
    }
</style>
