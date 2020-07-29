<template>
    <div class="profile-page" style="margin-top: 70px">
        <div class="container">
            <home_header></home_header>
        </div>
        <section class=" sesction-skew" style="padding-bottom: 0">
            <div class="container-full ">

                <div class="landing_cover2">
                    <div class="container mb-5">
                        <home_products></home_products>
                    </div>
                    <best_sales_products class="mt-5 mb-4"></best_sales_products>
                    <new_arrival_products class="mt-5 mb-4"></new_arrival_products>
                </div>
            </div>
        </section>
    </div>


</template>
<script>
    import {ModelSelect} from 'vue-search-select'
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'
    import home_ads from '../views/pages_components/home_ads'
    import home_products from '../views/pages_components/home_products'

    import new_arrival_products from '../views/pages_components/new_arrival_products'
    import best_sales_products from '../views/pages_components/best_sales_products'

    import home_products_swiper from '../views/pages_components/home_products_swiper'
    import home_header_swiper from '../views/pages_components/home_header_swiper'
    import home_categories from '../views/pages_components/home_categories'
    import home_header from '../views/pages_components/home_header'
    // import home_slider from '../views/pages_components/home_slider'

    export default {
        components: {
            ModelSelect,
            home_header,
            home_ads,
            // home_slider,
            home_products_swiper,
            home_categories,
            home_header_swiper,
            new_arrival_products,
            best_sales_products,
            home_products
        },
        data() {
            return {
                lang: this.$ml.current,
                area_options: [],
                header_image: '/img/theme/landing.jpg',
                advertisements: [],
                area: {
                    value: '',
                    text: ''
                },
                categories_options: [],
                category: {
                    value: '',
                    text: ''
                }
            }
        },
        mounted() {
            let vm = this;
            // vm.getAllAddresses();
            // vm.getAllCategories();
            // vm.getAllAds();
        },
        methods: {
            isMobile() {
                if (screen.width <= 760) {
                    return true;
                } else {
                    return false;
                }
            },
            getAllAds() {
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
                        vm.advertisements = data.advertisements;
                        try {
                            vm.header_image = data.setting.image[0].file.path;
                        } catch (e) {
                            vm.header_image = '/img/theme/landing.jpg';
                        }
                    }
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;

                })
            },
            getAllAddresses() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.HOME_ADDRESSES, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.prepareAddresses(data.store_address)
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                })
            },
            getAllCategories() {
                let vm = this;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.HOME_CATEGORIES, {
                    params: {
                        lang: vm.lang,
                        main: 1
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.prepareCategories(data.categories)
                }).catch((error) => {

                })
            },
            prepareAddresses(addresses) {
                let vm = this;
                let arr = [];
                $.each(addresses, function (index, address) {
                    arr.push({
                        value: address.id,
                        text: address.translated.name
                    })
                });
                vm.area_options = arr;
                return arr;
            },
            prepareCategories(categories) {
                let vm = this;
                let arr = [];
                $.each(categories, function (index, category) {
                    arr.push({
                        value: category.id,
                        text: category.translated.title
                    })
                });
                vm.categories_options = arr;
                return arr;
            },
            reset() {
                this.area = {}
                this.gender = {}
            }
        }
    }
</script>

<style>
    .float_square {
        width: 25px;
        height: 25px;
        background: #d63d70;
        position: absolute;
        top: 10px;
        left: -10px;
    }

    .ui.fluid.dropdown {
        background-color: #000 !important;
        color: #fff !important;
        height: 40px !important;
    }

    .ui.fluid.dropdown input {
        color: #FFF !important;
    }

    .icon-float {
        position: absolute;
        top: 8px;
        left: 10px;
        z-index: 99;
    }

    .icon-float i {
        font-size: 25px;
    }

    .gender {
        padding: 0.87861429em 2.1em 0.67861429em 1.1em !important;
    }

    .ui.fluid.dropdown > .dropdown.icon {
        display: none !important;
    }

    .ui.search.dropdown > .text {
        color: #fff !important;
        font-weight: bold !important;
        top: 4px !important;
    }

    .search {
        color: #fff !important;
        font-weight: bold !important;
        padding: 0.87861429em 2.1em 0.67861429em 3.1em !important;
    }

    @media only screen and (min-width: 1920px) {

        .ui.search.dropdown .menu[data-v-3a0c7bea] {
            max-height: 16.371429rem !important;
        }
    }

    .landing_cover {
        background: center center no-repeat;
        /*background-image: url(/img/theme/landing.jpg);*/
        height: calc(100%);
        width: 100%;
        position: absolute;
        z-index: 9;
        background-size: cover;
    }

    .landing_cover2 {
        /*background: url(/img/theme/clothes_pattern.jpg) center center repeat;*/
        /*background: #eee;*/
        /*min-height: 600px;*/
        min-height: 500px;
        width: 100%;
        z-index: 9;
        background-size: contain;
        position: relative;
    }

    .sales_image {
        position: absolute;
        border-radius: 100px 0 0 0;
        margin: 200px auto;
        max-width: 100%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .overlay {
        background: rgba(0, 0, 0, 0.4);
        z-index: 1;
        width: 100%;
        height: 100%;
        position: absolute;
    }

    .mt-10 {
        margin-top: 100px;
    }

    .px-4 {
        z-index: 9;
    }

    .rad_card {
        background: #00000061 !important;
        border-radius: 15px !important;
    }

    .ui.search.selection.dropdown > input.search {

        color: #fff !important;
    }

</style>
