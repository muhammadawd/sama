<template>
    <div class="profile-page">
        <div class="container">

            <div class="row">
                <div class="col-md-4 mb-5 mt-5" v-for="(author , key) in authors" :key="key">
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
                                <h4 class="text-center mt-2 mb-2">
                                    <span class="text-info">{{$ml.get('author')}} : </span> <b>{{author.translated.title}}</b>
                                </h4>
                                <button class="btn btn-info mb-3"
                                        @click="$router.push({name:'find_author',params:{id:author.id}})">
                                    {{$ml.get('more')}}
                                </button>
                            </div>
                        </template>
                    </card>
                </div>
                <div class="col-md-12 text-center mt-2 justify-content-center">
                    <paginate
                            v-model="pagination.page"
                            :page-count="pagination.page_count"
                            :page-range="pagination.page_range"
                            :click-handler="clickCallback"
                            :prev-text="'Prev'"
                            :next-text="'Next'"
                            :container-class="'pagination justify-content-center'"
                            :page-class="'page-item'"
                            :next-class="'page-item'"
                            :prev-class="'page-item'"
                            :page-link-class="'page-link'"
                            :page-next-class="'page-link'"
                            :page-prev-class="'page-link'"
                            :next-link-class="'page-link'"
                            :prev-link-class="'page-link'"
                    >
                    </paginate>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
    import VueRecaptcha from 'vue-recaptcha';
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'
    import Paginate from 'vuejs-paginate'

    export default {
        data() {
            return {
                lang: this.$ml.current,
                authors: [],
                pagination: {
                    page: 1,
                    page_count: 0,
                    page_range: 0,
                },
            }
        },
        mounted() {
            this.getAuthorInfo();
        },
        methods: {
            clickCallback(n) {
                this.getAuthorInfo(n)
            },
            getAuthorInfo(page) {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.FIND_AUTHORS + `/${1}`, {
                    params: {
                        lang: vm.lang,
                        paginated: true,
                        limit: 12,
                        page: page
                    }
                }).then((resp) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        vm.authors = data.authors.data;
                        vm.pagination.page_count = parseInt(data.authors.last_page);
                        vm.pagination.page_range = parseInt(data.authors.per_page);
                    }
                }).catch((error) => {

                    vm.$root.$children[0].$refs.loader.show_loader = false;
                })
            },
        },
        components: {Paginate}
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
