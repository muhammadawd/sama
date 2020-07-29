<template>
    <div class="profile-page">
        <section class=" sesction-skew" style="padding-bottom: 0">
            <div class="container-full ">

                <div class="landing_cover2">
                    <best_sales_products></best_sales_products>
                </div>
            </div>
        </section>
    </div>


</template>
<script>
    import best_sales_products from '../views/pages_components/best_sales_products'

    export default {
        components: {
            best_sales_products,
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
