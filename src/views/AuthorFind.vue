<template>
    <div class="profile-page">
        <div class="container">

            <div class="row mt-5" v-if="author">
                <div class="col-md-4 mb-5 mt-2">
                    <card type="secondary" shadow
                          header-classes="bg-main pb-5"
                          body-classes="px-lsg-5 p-0 py-lsg-5"
                          class="border-0 new_card_auth2 bg-white mb-2">
                        <div class="card-header bg-main-about  mb-2">
                            {{$ml.get('products_count')}} <b style="font-size: 20px">{{author.products_count}}</b>
                        </div>
                        <template>
                            <div class="col-md-12 text-center">
                                <img :src="require('@/assets/images/newImages/author.png')" class="w-50 m-auto" alt="">
                            </div>
                            <div class="col-md-12 text-center">
                                <h4 class="text-center mt-2 mb-4">
                                    <span class="text-info">{{$ml.get('author')}} : </span> <b>{{author.translated.title}}</b>
                                </h4>
                            </div>
                        </template>
                    </card>
                </div>
                <div class="col-md-8 text-left mt-2">
                    <h3 class="font-weight-bold">{{author.translated.title}}</h3>
                    <p>{{author.translated.description}}</p>
                </div>
                <div class="col-md-12" v-if="author.products.length">
                    <recommend_products :related_products="author.products" :title="$ml.get('author_books')"></recommend_products>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
    import VueRecaptcha from 'vue-recaptcha';
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

    import recommend_products from './pages_components/recommend_products';

    export default {
        data() {
            return {
                lang: this.$ml.current,
                author: null,
            }
        },
        mounted() {

            this.getAuthorInfo(this.$route.params.id);
        },
        methods: {
            getAuthorInfo(id) {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.FIND_AUTHOR + `/${id}`, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        vm.author = data.author;
                    }
                }).catch((error) => {

                    vm.$root.$children[0].$refs.loader.show_loader = false;
                })
            },
        },
        components: {VueRecaptcha, recommend_products}
    }
</script>
<style>
    iframe {
        width: 100% !important;
    }

    .bg-main-about {
        text-align: center;
        font-weight: bold;
        color: #fff;
        background-color: #00adee !important;
        border-radius: 40px 40px 0 0 !important;

    }

    .new_card_auth2 {
        border-radius: 40px !important;
    }
</style>
