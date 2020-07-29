<template>
    <section class="position-relative">
        <div class="pt-3" style="background: #5d5d5d">
            <div class="container">
                <div class="row text-left" style="justify-content: center;">
                    <div class="col-md-2">
                        <label class="text-white font-weight-bold text-center pt-2">
                            {{this.$ml.get('subscribe_p')}}
                        </label>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group input-group">
                            <input aria-describedby="addon-left addon-left" v-model="subscribe"
                                   :placeholder="this.$ml.get('subscribe_holder')"
                                   class="form-control p-1 text-left border_rad">
                            <div class="input-group-append">
                                <button class="btn btn-info border_rad" :class="'sub_'+$ml.current"
                                        @click="saveSubscribe()">
                                    {{this.$ml.get('subscribe')}}
                                </button>
                            </div>
                        </div>
                        <div style="color:red">
                            <span id="subscribe_email"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer" v-if="settings">
            <div class="container-fluid">
                <div class="row direction">
                    <div class="col-md-2 text-center">
                        <img :src="$helper.getLogo()" width="120px" alt="">
                    </div>
                    <div class="col-md-6 text-left pt-4">
                        <ul class="list-unstyled site_map direction">
                            <li class="list-inline-item">
                                <a href="" @click.prevent="$router.push({name:'about_us'})">
                                    {{$ml.get('about_us')}}
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href="" @click.prevent="$router.push({name:'new_arrival'})">
                                    {{$ml.get('new_arrival')}}
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href="" @click.prevent="$router.push({name:'best_sales'})">
                                    {{$ml.get('best_sales')}}
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href="" @click.prevent="$router.push({name:'location'})">
                                    {{$ml.get('location')}}
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href="" @click.prevent="$router.push({name:'contact_us'})">
                                    {{$ml.get('contact_us')}}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-4" :class="'border_'+$ml.current">
                        <div class="row">
                            <div class="col-md-12">
                                <h5 class="text-center font-weight-bold">
                                    {{$ml.get('contact_us')}}
                                </h5>
                                <div class="text-center">
                                    <p>{{$ml.get('dar_sama')}}</p>
                                    <p>{{$ml.get('kuwait')}}</p>
                                </div>
                            </div>
                            <div class="col-7">
                                <div class="d-flex">
                                    <ul class="list-unstyled direction m-2 " style="margin-top: 0!important;">
                                        <li class="list-inline-item font-weight-bold direction-inverse"
                                            v-if="$helper.getSettings().phone1">
                                            <a :href="'tel:'+$helper.getSettings().phone1">
                                                {{$helper.getSettings().phone1}}
                                            </a>
                                        </li>
                                        <li class="list-inline-item font-weight-bold direction-inverse"
                                            v-if="$helper.getSettings().phone2">
                                            <a :href="'tel:'+$helper.getSettings().phone2">
                                                {{$helper.getSettings().phone2}}
                                            </a>
                                        </li>
                                    </ul>
                                    <img :src="require('@/assets/images/newImages/phone.png')" width="50px"
                                         height="50px" class=""
                                         alt="">
                                </div>
                                <ul class="list-unstyled">
                                    <li class="list-inline-item" v-if="$helper.getSettings().facebook">
                                        <a :href="$helper.getSettings().facebook">
                                            <img :src="require('@/assets/images/newImages/facebook.png')" width="30px"
                                                 alt="">
                                        </a>
                                    </li>
                                    <li class="list-inline-item" v-if="$helper.getSettings().twitter">
                                        <a :href="$helper.getSettings().twitter">
                                            <img :src="require('@/assets/images/newImages/twitter.png')" width="30px"
                                                 alt="">
                                        </a>
                                    </li>
                                    <li class="list-inline-item" v-if="$helper.getSettings().snapchat">
                                        <a :href="$helper.getSettings().snapchat">
                                            <img :src="require('@/assets/images/newImages/snapchat.png')" width="30px"
                                                 alt="">
                                        </a>
                                    </li>
                                    <li class="list-inline-item" v-if="$helper.getSettings().instagram">
                                        <a :href="$helper.getSettings().instagram">
                                            <img :src="require('@/assets/images/newImages/instagram.png')" width="30px"
                                                 alt="">
                                        </a>
                                    </li>
                                </ul>
                                <div>
                                    <a :href="'mailto:'+$helper.getSettings().front_email">
                                        <span class="p-1"
                                              style="font-size: 12px">{{$helper.getSettings().front_email}}</span>
                                        <img :src="require('@/assets/images/newImages/email.png')" width="30px"
                                             alt="">
                                    </a>
                                </div>
                            </div>
                            <div class="col-5 position-relative">
                                <img :src="require('@/assets/images/newImages/contact.png')" class="position-absolute"
                                     style="bottom:0;left: 0;" width="150px" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </section>
</template>
<script>
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

    export default {
        name: 'app-footer',
        data() {
            return {
                subscribe: null,
                settings: null,
                year: new Date().getFullYear()
            }
        },
        mounted() {
            this.getAllSettings();
        },
        methods: {
            saveSubscribe() {
                let vm = this;
                let request_data = {
                    email: vm.subscribe
                }
                axios.post(apiServiesRoutes.BASE_URL + apiServiesRoutes.CREATE_SUBSCRIBE, request_data)
                    .then((resp) => {
                        let status = resp.data.status;
                        let data = resp.data.data;
                        if (!status) {
                            $('#subscribe_email').text(data.validation_errors.email[0])
                            return
                        }
                        $('#subscribe_email').text('')
                        vm.$swal({
                            title: vm.$ml.get('success'),
                            type: 'success',
                            timer: 1000
                        })
                        vm.subscribe = null;

                    }).catch((err) => {

                });
            },
            getAllSettings() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                let settings = localStorage.getItem('settings')
                if (settings) {
                    settings = JSON.parse(settings);
                    vm.settings = settings;
                    // return
                }
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.HOME_ADS, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        let logo = '';
                        let pointModule = '';
                        let to_money_percent = '0';
                        try {
                            logo = data.setting.logo[0].path.path;
                        } catch (e) {
                            logo = '';
                        }
                        try {
                            pointModule = data.pointSystem.point_status[0].value
                        } catch (e) {
                            pointModule = '';
                        }
                        try {
                            to_money_percent = data.pointSystem.to_money_percent[0].value
                        } catch (e) {
                            to_money_percent = '';
                        }
                        let settings = {
                            address_ar: data.setting.address_ar[0].value,
                            address_en: data.setting.address_en[0].value,
                            phone1: data.setting.phone1[0].value,
                            phone2: data.setting.phone2[0].value,
                            facebook: data.setting.facebook[0].value,
                            twitter: data.setting.twitter[0].value,
                            snapchat: data.setting.snapchat[0].value,
                            instagram: data.setting.instagram[0].value,
                            front_email: data.setting.front_email[0].value,
                            pinterest: data.setting.pinterest[0].value,
                            youtube: data.setting.youtube[0].value,
                            googleplay: data.setting.googleplay[0].value,
                            appstore: data.setting.appstore[0].value,
                            delivery_cost: data.setting.delivery_cost[0].value,
                            delivery_cost_condition: data.setting.delivery_cost_condition[0].value,
                            logo: logo
                        };
                        vm.settings = settings;
                        localStorage.setItem('settings', JSON.stringify(settings))
                        localStorage.setItem('pointModule', JSON.stringify(pointModule))
                        localStorage.setItem('to_money_percent', JSON.stringify(to_money_percent))
                    }
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;

                })
            },
        }
    };
</script>
<style scoped>
    .border_rad {
        border-radius: 15px !important;
    }

    .sub_ar {
        left: 100px;
        padding: 11px;
        height: 37px;
        line-height: 0;
        top: 5px;
    }

    .sub_en {
        right: 100px;
        padding: 11px;
        height: 37px;
        line-height: 0;
        top: 5px;
    }

    .site_map li {
        padding: 0 15px 0 15px;
    }

    .site_map li a {
        font-weight: bold;
        color: #000 !important;
        font-size: 18px;
    }

    .border_ar {
        border-right: 1px solid #ccc;
    }

    .border_en {
        border-left: 1px solid #ccc;
    }
</style>
