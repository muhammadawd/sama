<template>
    <div class="profile-page">
        <div class="container">

            <div class="row">
                <div class="col-md-4 mb-5 mt-5" v-for="(event , key) in events" :key="key">
                    <card type="secondary" shadow
                          header-classes="bg-main pb-5"
                          body-classes="px-lsg-5 p-0 py-lsg-5"
                          class="border-0 new_card_auth2 bg-white mb-2">
                        <div class="card-header bg-main-about  mb-2">
                            {{event.translated.title}}
                        </div>
                        <template>
                            <div class="col-md-12 text-center">
                                <img :src="event.image" class="w-100 m-auto" alt="">
                            </div>
                            <div class="col-md-12 text-center">
                                <button class="btn btn-info mt-3 mb-3"
                                        @click="$router.push({name:'event_find',params:{id:event.id}})">
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
                events: [],
                pagination: {
                    page: 1,
                    page_count: 0,
                    page_range: 0,
                },
            }
        },
        mounted() {
            this.getEventInfo(1);
        },
        methods: {
            clickCallback(n) {
                this.getEventInfo(n)
            },
            getEventInfo(page) {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.FIND_EVENTS, {
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
                        vm.events = data.events.data;
                        vm.pagination.page_count = parseInt(data.events.last_page);
                        vm.pagination.page_range = parseInt(data.events.per_page);
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
