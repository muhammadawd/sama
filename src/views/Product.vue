<template>
    <div class="profile-page">
        <section class="section section-skew" style="padding-bottom: 0;margin-top: 110px">
            <div class="container-full">
                <card class="card-profile border-0 mb-5" no-body style="position: relative;">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-12">

                                        <div class="container py-0 pb-lg mt-2">
                                            <prodcutDetail></prodcutDetail>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </card>
            </div>
        </section>
    </div>


</template>
<script>

    import prodcutDetail from '../views/pages_components/prodcutDetail'

    export default {
        data() {
            return {}
        },
        methods: {},
        components: {
            prodcutDetail
        }
    }
</script>
<style scoped>


</style>
