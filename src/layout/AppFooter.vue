<template>
    <section class="position-relative">
        <footer class="footer has-cards">
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
                settings: {
                    facebook: null,
                    twitter: null,
                    snapchat: null,
                    instagram: null,
                    pinterest: null,
                    youtube: null,
                    googleplay: null,
                    appstore: null,
                },
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
    .contact_us {
        position: fixed;
        bottom: 0;
        z-index: 888;
        width: 300px;
        color: #000;
        background: #eee;
        padding: 10px 15px 5px 15px;
        font-weight: bold;
        border: 1px solid #888;
    }

    .overlay_color {
        /*background: #000;*/
        background: url("../assets/images/footer_bg.png") top center;
        background-size: cover;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 0;
        bottom: 0;
    }
</style>
