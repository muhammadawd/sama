<template>
    <section v-if="slides.length">
        <agile :dots="false" :autoplay="true" :autoplay-speed="2000">
            <div v-for="(slide  ,key) in slides" class="slide" :key="key">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <img :src="slide.image" class="w-100" alt="">
                        </div>
                        <div class="col-md-8"
                             style="display: flex;flex-direction:column;justify-content: center;align-items: center">
                            <h3 class="text-center font-weight-bold">{{slide.translated.title}}</h3>
                            <p class="text-center">{{slide.translated.description}}</p>
                        </div>
                    </div>
                </div>
            </div>

            <template slot="prevButton">
                <img :src="require('@/assets/images/newImages/prev.png')" width="40px" alt="">
            </template>
            <template slot="nextButton">
                <img :src="require('@/assets/images/newImages/next.png')" width="40px" alt="">
            </template>
        </agile>
    </section>
</template>

<script>

    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'
    import {VueAgile} from 'vue-agile'
    import 'vue-agile/dist/VueAgile.css'

    export default {
        name: "home_header",
        components: {
            agile: VueAgile
        },
        data() {
            return {
                current_slide: null,
                lang: this.$ml.current,
                slides: [],
            };


        },
        mounted() {
            this.getAllSliders();
        },
        methods: {
            slidesAction() {
                let vm = this;
                let i = 0;
                let length = vm.slides.length;
                vm.current_slide = vm.slides[i];
                i += 1;
                setInterval(() => {
                    if (length == i) i = 0;
                    vm.current_slide = vm.slides[i];
                    i += 1;
                    console.log(i)
                    console.log(vm.slides)
                }, 3000)
            },
            getAllSliders() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.SITE_SLIDER, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        let arr = [];
                        $.each(data.sliders, function (index, slide) {
                            arr.push(slide.image)
                        });
                        vm.slides = data.sliders
                        vm.slidesAction();
                    }
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;

                })
            },
        }
    }
</script>

<style>
    .agile__actions{
        position: absolute;
        width: 100%;
        top: 30%;
    }
    .agile__nav-button{
        background: transparent;
        border: 0;
        cursor: pointer;
        border-radius: 50%;
        width: 50px;
        height: 50px;
    }
</style>
