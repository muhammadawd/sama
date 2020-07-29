<template>
    <div class="profile-page">
        <section class=" sesction-skew" style="padding-bottom: 0">
            <div class="container-full ">

                <div class="landing_cover2">
                    <new_arrival_products></new_arrival_products>
                </div>
            </div>
        </section>
    </div>


</template>
<script>
    import new_arrival_products from '../views/pages_components/new_arrival_products'

    export default {
        components: {
            new_arrival_products,
        },
        data() {
            return {
                lang: this.$ml.current,
            }
        },
        mounted() {
            let vm = this;
        },
        methods: {
            isMobile() {
                if (screen.width <= 760) {
                    return true;
                } else {
                    return false;
                }
            },
        }
    }
</script>

<style>
</style>
