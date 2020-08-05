<template>
    <div v-if="product">
        <div class="priceOffer" v-on:click.stop="addToCart(product)"
             v-if="product.product_option_values[0].offer_price">
            <label v-if="$helper.getOfferCountDown(product.product_option_values[0].offer_end_date)._days">
                {{$helper.getOfferCountDown(product.product_option_values[0].offer_end_date)._days}} {{$ml.get('days')}}
            </label>
            <label v-if="!$helper.getOfferCountDown(product.product_option_values[0].offer_end_date)._days">
                {{$helper.getOfferCountDown(product.product_option_values[0].offer_end_date)._hours}}
                {{$ml.get('hours')}}
            </label>
            <!--:style="$ml.current == 'ar' ? {left:'5px',left:'auto'} : {left:'5px',right:'auto'}"-->
            <!--<label>{{getPercent(25,100)}}</label>-->
        </div>
        <div class="priceOffer_before" v-if="product.product_option_values[0].offer_price"></div>
        <div class="card card_curve shadow shadow-lg--hover mt-0"
             style="border-radius: 50px 0;overflow: hidden;margin-bottom: 15px" @mouseenter="mouseEnter()"
             @mouseleave="mouseLeave()">
            <div class="card-body text-center p-0 m-0"
                 :style="isMobile() ? {maxHeight: '150px',minHeight:'250px'} : {minHeight: '250px'}">
                <div class="priceSales" v-on:click.stop="addToCart(product)"
                     :style="$ml.current == 'ar' ? {left:'20px',right:'auto'} : {right:'20px',left:'auto'}"
                     v-if="getPercent(product.minimum_price,product.price_before_discount) != 0">
                    <label>{{getPercent(product.minimum_price,product.price_before_discount)}} %</label>
                    <!--<label>{{getPercent(25,100)}}</label>-->
                </div>
                <router-link :to="{name:'show_product',params:{'id':product.id,branch_id:product.branch_id}}">
                    <div style="z-index: 9;width: 100%;background: red;opacity: 0.5;color: #fff;"
                         v-if="product.product_option_values[0].store_detail && (product.product_option_values[0].store_detail.quantity - product.product_option_values[0].store_detail.reserved == 0)"
                         class="position-absolute">{{$ml.get('out_off_stock')}}
                    </div>
                    <!--<img :src="require('@/assets/images/gift.png')" class="img_gift" alt="">-->
                    <figure class="snip1527">
                        <!--<div :class="isMobile() ? 'addtoCartbtn' :'addtoCartbtnDesk'"-->
                             <!--v-on:click.prevent="addToCart(product)"-->
                             <!--v-if="!(product.product_option_values[0].store_detail && (product.product_option_values[0].store_detail.quantity - product.product_option_values[0].store_detail.reserved == 0))"-->
                             <!--:style="$ml.current == 'ar' ? {left:'5px',right:'auto'}: {right:'5px',left:'auto'}">-->
                <!--<span class="day">-->
                    <!--<i class="fa fa-cart-plus fa-lg"></i>-->
                <!--</span>-->
                            <!--&lt;!&ndash;<span class="month">{{$ml.get('add')}}</span>&ndash;&gt;-->
                        <!--</div>-->
                        <div class="image"
                             v-lazy-container="{ selector: 'img', error:'img/icons/common/no_image.png', loading: 'img/icons/common/restricted.gif' }">
                            <img v-if="current_image" :data-src="current_image" width="100%"
                                 alt="pr-sample23"/>
                        </div>
                        <figcaption>

                            <h3 class="text-black text-center w-100" style="font-size: 14px">
                                {{$ml.get('book')}} : {{product.translated.title}} <br>
                                {{$ml.get('author')}} : {{product.author ? product.author.translated.title : ''}}
                            </h3>
                            <div class="row mt-2">
                                <div class="col-12" style="color: #000;">
                                    <template>
                                        <p class="font-weight-bold text-center" style="font-size: 18px;">
                                            {{parseFloat(product.minimum_price).toFixed(3)}}
                                            <small style="font-size: 12px">{{getCurrency()}}</small>
                                        </p>
                                    </template>
                                </div>
                                <div class="col-12 text-center">
                                    <div class="btn-group direction-inverse">
                                        <button class="btn btn-secondary btn-sm"
                                                v-if="!(product.product_option_values[0].store_detail && (product.product_option_values[0].store_detail.quantity - product.product_option_values[0].store_detail.reserved == 0))"
                                                v-on:click.prevent="addToFavourite(product)"
                                                :style="$ml.current == 'ar' ? {left:'5px',right:'auto'}: {right:'5px',left:'auto'}">
                                        <span class="day">
                                            <i class="fa fa-star fa-lg"></i>
                                        </span>
                                        </button>
                                        <a class="btn btn-secondary btn-sm" :href="product.book_file_path"
                                           :disabled="!product.book_file_path"
                                           target="_blank" :class="!product.book_file_path ? 'disabled' : ''"
                                           :style="$ml.current == 'ar' ? {left:'5px',right:'auto'}: {right:'5px',left:'auto'}">
                                        <span class="day">
                                            <i class="fa fa-book fa-lg"></i>
                                        </span>
                                        </a>
                                        <button class="btn btn-info btn-sm" v-on:click.prevent="addToCart(product)"
                                                v-if="!(product.product_option_values[0].store_detail && (product.product_option_values[0].store_detail.quantity - product.product_option_values[0].store_detail.reserved == 0))"
                                                :style="$ml.current == 'ar' ? {left:'5px',right:'auto'}: {right:'5px',left:'auto'}">
                                        <span class="day">
                                            <i class="fa fa-cart-plus fa-lg"></i>
                                        </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </figcaption>
                        <!--<a href="#"></a>-->
                    </figure>
                </router-link>
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
        name: "one_product_offer",
        data() {
            return {
                interval: null,
                selected_images: [],
                current_image: null,
            }
        },
        props: {
            product: Object,
            addToCart: Function
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
            this.selected_images.push({
                path: this.product.main_image,
                type: 'image'
            });
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
    .progressive-image-wrapper {
        padding-bottom: 0 !important;
    }

    .addtoCartbtn {
        width: 40px;
        height: 40px;
        /*background-color: #2dce89bf;*/
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

    .priceOffer {
        width: 90px;
        height: 30px;
        background-color: #3498db;
        color: #fff;
        line-height: 30px;
        text-align: center;
        position: absolute;
        z-index: 99;
        top: 55px;
        right: 0;
    }

    .priceOffer_before {
        content: '';
        position: absolute;
        right: 0;
        top: 85px;
        width: 0px;
        height: 0px;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-top: 20px solid #3498db;
    }

    /*@media only screen and (max-width: 600px) {*/
    /*.priceOffer {*/
    /*right: -10px;*/
    /*}*/

    /*.priceOffer_before {*/
    /*right: -10px;*/
    /*}*/

    /*}*/

    .addtoCartbtnDesk {
        width: 39px;
        height: 39px;
        /*background-color: #2dce89;*/
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
