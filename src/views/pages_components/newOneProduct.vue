<template>
    <div class="product_card_book">
        <div class="image"
             @click="$router.push({name:'show_product',params:{'id':product.id,branch_id:product.branch_id}})"
             v-lazy-container="{ selector: 'img', error:'img/icons/common/no_image.png', loading: 'img/icons/common/restricted.gif' }">
            <img v-if="current_image" :data-src="current_image" width="100%" class="d-md-none"
                 alt="..."/>
            <div class="pr-img d-none d-md-block">
                <div class="book-img">
                    <a href=""
                       @click.prevent="$router.push({name:'show_product',params:{'id':product.id,branch_id:product.branch_id}})">
                        <div class="frontcover">
                            <img v-if="current_image" :data-src="current_image" alt="image description">
                        </div>
                        <div class="backcover">
                            <img v-if="current_image" :data-src="current_image" alt="image description">
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <h3 class="text-black text-center w-100 mt-2" style="font-size: 16px"
            @click="$router.push({name:'show_product',params:{'id':product.id,branch_id:product.branch_id}})">
             <div class="text-ellipsis font-weight-bold">{{$ml.get('book')}} : {{product.translated.title}}  </div>
            {{$ml.get('author')}} : {{product.author ? product.author.translated.title : ''}}
        </h3>
        <div class="row"
             @click="$router.push({name:'show_product',params:{'id':product.id,branch_id:product.branch_id}})">
            <div class="col-12" style="color: #000;">
                <template>
                    <p class="font-weight-bold text-center p-1" style="font-size: 18px;">
                        {{parseFloat(product.minimum_price).toFixed(3)}}
                        <small style="font-size: 17px !important;">{{getCurrency()}}</small>
                    </p>
                </template>
            </div>
        </div>
        <div class="row justify-content-center p-2">
            <div class="col-md-3 col-12 p-1">
                <button class="btn btn-info p-1 pr-2 pl-2 btn-block text-center text-ellipsis radius-0"
                        v-on:click.prevent="addToCartCheckout(product)"
                        v-if="!(product.product_option_values[0].store_detail && (product.product_option_values[0].store_detail.quantity - product.product_option_values[0].store_detail.reserved == 0))">
                    <span class="d-none d-md-block">{{$ml.get('buy')}}</span>
                    <span class="d-md-none">{{$ml.get('buy_now')}}</span>

                </button>
            </div>
            <div class="col-md-3 col-4 p-1">
                <button v-if="!(product.product_option_values[0].store_detail && (product.product_option_values[0].store_detail.quantity - product.product_option_values[0].store_detail.reserved == 0))"
                        v-on:click.prevent="addToFavourite(product)"
                        class="btn btn-info bg-dark-gray p-1 btn-block pr-2 pl-2 radius-0">
                    <i class="fa fa-star fa-lg"></i>
                </button>
            </div>
            <div class="col-md-3 col-4 p-1">
                <button class="btn btn-info bg-dark-gray p-1 btn-block pr-2 pl-2 text-center radius-0"
                        v-on:click.prevent="addToCart(product)"
                        v-if="!(product.product_option_values[0].store_detail && (product.product_option_values[0].store_detail.quantity - product.product_option_values[0].store_detail.reserved == 0))">
                    <img :src="require('@/assets/images/newImages/cart-white.png')" class="m-auto"
                         style="width: 25px;height: auto;min-height: auto" alt=""/>
                </button>
            </div>
            <div class="col-md-3 col-4 p-1"  v-if="!product.book_file_path" >
                <a :href="product.book_file_path"
                 
                   target="_blank"
                   class="btn text-white btn-info bg-dark-gray p-1 btn-block pr-2 pl-2 radius-0">
                    <i class="fa fa-book"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {mapState, mapActions} from 'vuex'
    import Message from 'vue-m-message'

    Vue.use(Message);
    export default {
        name: "newOneProduct",
        data() {
            return {
                interval: null,
                selected_images: [],
                current_image: null,
            }
        },
        props: {
            product: Object,
            addToCart: Function,
        },
        computed: {
            ...mapState([
                'cart',
                'favourites',
                'auth',
            ])
        },
        mounted() {
            // if (this.product.product_option_values[0].files.length) {
            //     let image_path = this.product.product_option_values[0].files[0].path;
            //     this.selected_images.push(image_path)
            // }

            this.selected_images = this.product.product_option_values[0].files;
            // console.log(this.product.main_image_new)
            if (this.product.main_image_new) {
                this.current_image = this.product.main_image_new.storage_path + '/' + '300' + this.product.main_image_new.name;
            } else {
                this.current_image = this.product.main_image;

            }
            // this.current_image = 'https://zashzash.com/back_end/storage/images/products/3976009761581444485.png';
            this.selected_images.push({
                path: this.product.main_image,
                type: 'image'
            });
        },
        methods: {
            addToCartCheckout(product) {
                let vm = this;
                let pov = product.product_option_values[0];
                let normal_product = vm.prepareProductToCart(product, pov);
                // console.log(normal_product)
                vm.bindToCart(normal_product);
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

                vm.$store.dispatch('addToCart', product).then(() => {
                    vm.$router.push({'name': 'checkout'})
                });
            },
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
            isMobile() {
                if (screen.width <= 760) {
                    return true;
                } else {
                    return false;
                }
            },
            getPercent($oldFigure, $newFigure) {
                let percentChange = 0;
                if (($oldFigure != 0) && ($newFigure != 0)) {
                    percentChange = (1 - $oldFigure / $newFigure) * 100;
                }
                // return parseFloat(percentChange).toFixed(2);
                return Math.round(parseFloat(percentChange));
            },
            mouseEnter() {
                let i = 0;
                let length = this.selected_images.length;
                let interval = setInterval(() => {

                    this.current_image = this.selected_images[i].path;
                    console.log(this.current_image)
                    i = i + 1;
                    if (i == length) i = 0;
                }, 1000)
                this.interval = interval;
            },
            mouseLeave() {
                clearInterval(this.interval)
            },
            getCurrency() {
                return this.$store.getters.getCurrency
            },
        }
    }
</script>

<style>
    @media only screen and (max-width: 600px) {
        .image_icon_cart {
            width: 25px!important;
            position: relative;
            right: -4px;
        }
    }

    .progressive-image-wrapper {
        padding-bottom: 0 !important;
    }

    .addtoCartbtn {
        width: 40px;
        height: 40px;
        /*background-color: #f44336;*/
        background-color: #dcdcdc;
        border: 0.5px solid #aaa;
        color: #fff;
        line-height: 40px;
        text-align: center;
        border-radius: 50%;
        cursor: pointer;
        position: absolute;
        z-index: 99;
        bottom: 8px;
        right: 5px;
        /*box-shadow: 1px 2px 12px #999;*/
        /*padding: 0px;*/
    }

    .priceSales {
        width: 60px;
        height: 30px;
        background-color: #f44336;
        color: #fff;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        position: absolute;
        z-index: 99;
        top: 8px;
    }

    .addtoCartbtnDesk {
        width: 39px;
        height: 39px;
        /*background-color: #800080c2;*/
        /*background-color: #dcdcdc;*/
        /*border: 0.5px solid #aaa;*/
        color: #777;
        line-height: 39px;
        text-align: center;
        border-radius: 50%;
        cursor: pointer;
        position: absolute;
        z-index: 99;
        bottom: 15px;
        left: 5px;

        /*box-shadow: 1px 2px 12px #999;*/
        /*padding: 0px;*/
    }

    .addtoCartbtnDesk i {
        font-size: 25px;
    }

    .addtoCartbtn i {
        color: #666 !important;
    }
</style>
