<template>
    <div class="profile-page">
        <div class="container">

            <div class="row mt-5" v-if="event">
                <div class="col-md-4 mb-5 mt-2">
                    <card type="secondary" shadow
                          header-classes="bg-main pb-5"
                          body-classes="px-lsg-5 p-0 py-lsg-5"
                          class="border-0 new_card_auth2 bg-white mb-2">
                        <div class="card-header bg-main-about  mb-2">
                            <b>{{event.translated.title}}</b>
                        </div>
                        <template>
                            <div class="col-md-12 text-center mb-3">
                                <img :src="event.image" class="w-75 m-auto" alt="">
                            </div>
                        </template>
                    </card>
                </div>
                <div class="col-md-8 text-left mt-2">
                    <h3 class="font-weight-bold">{{event.translated.title}}</h3>
                    <div class="text-left mt-2 mb-4">
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
                                            :url="getShareData(event).url"
                                            :title="getShareData(event).title"
                                            :description="getShareData(event).description"
                                            :quote="getShareData(event).description"
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
                                            :url="getShareData(event).url"
                                            :title="getShareData(event).title"
                                            :description="getShareData(event).description"
                                            :quote="getShareData(event).description"
                                            hashtags="shopping_books">
                                        <div class="btn-social">
                                            <i class="fa fa-twitter fa-lg"></i>
                                        </div>
                                    </ShareNetwork>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <p>{{event.translated.description}}</p>
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
                event: null,
            }
        },
        mounted() {

            this.getEventInfo(this.$route.params.id);
        },
        methods: {
            shareWhatsapp() {
                let current = window.location.href;
                window.location.href = `https://api.whatsapp.com/send?text=${current}`;
            },
            getShareData(event) {
                return {
                    url: window.location.href,
                    title: event.translated.title,
                    description: event.translated.title + ' ' + (event.translated.description ? event.translated.description : ''),
                }
            },
            getEventInfo(id) {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.FIND_EVENT + `/${id}`, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        vm.event = data.event;
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
