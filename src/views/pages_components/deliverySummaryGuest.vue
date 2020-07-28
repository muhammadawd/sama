<template>
    <div class="cards text-left">
        <!--<div class="card-header text-black" style="background: #fafafa;overflow: hidden">-->
            <!--<b>{{this.$ml.get('contact_details')}}</b>-->
            <!--<a href="" @click.prevent="close('deliverySummaryContainer')" class="float-right text-black">{{$ml.get('cancel')}}</a>-->
        <!--</div>-->
        <div class="card-body">
            <div class="font-weight-bold text-center text-black">
                <div class="py-3 text-center text-black">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group input-group-alternative">
                                <input :placeholder="this.$ml.get('first_name')"
                                       v-model="dataModel.first_name"
                                       @input="updateChangeInfo()"
                                       class="form-control">
                            </div>
                            <div class="text-danger text-left" id="first_name_error"></div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group input-group-alternative">
                                <input :placeholder="this.$ml.get('last_name')"
                                       v-model="dataModel.last_name"
                                       @input="updateChangeInfo()"
                                       class="form-control">
                            </div>
                            <div class="text-danger text-left" id="last_name_error"></div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group input-group-alternative">
                                <input :placeholder="this.$ml.get('email')"
                                       v-model="dataModel.email"
                                       @input="updateChangeInfo()"
                                       class="form-control">
                            </div>
                            <div class="text-danger text-left" id="email_error"></div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group input-group-alternative">
                                <input :placeholder="this.$ml.get('phone') + ' *'"
                                       v-model="dataModel.phone"
                                       @input="updateChangeInfo()"
                                       class="form-control">
                            </div>
                            <div class="text-danger text-left" id="phone_error"></div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group input-group-alternative">
                                <input v-model="dataModel.full_address" @input="updateChangeInfo()"
                                       :placeholder="this.$ml.get('full_address')"
                                       class="form-control">
                                <div class="text-danger text-left" id="full_address_error"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import apiServiesRoutes from '../../bootstrap/apiServiesRoutes'
    import Modal from "@/components/Modal.vue";

    export default {
        name: "deliverySummary",
        components: {
            Modal
        },
        props: {
            updateCurrentUserInfo: Function,
        },
        mounted() {
            let info = JSON.parse(localStorage.getItem('current_user_info_data'));
            if (info) {
                this.dataModel = info;
                // this.updateCurrentUserInfo(info)
            }
        },
        data() {
            return {
                dataModel: {
                    first_name: '',
                    email: '',
                    phone: '',
                    full_address: '',
                },
            };
        },
        methods: {
            updateChangeInfo() {
                this.updateInfo(this.dataModel)
            },
            updateInfo(info = null) {
                // this.updateCurrentUserInfo(info)
                localStorage.setItem('current_user_info_data', JSON.stringify(info))
            },
            close(card) {
                $(`.${card}`).removeClass('opened')
            },
        }
    }
</script>

<style scoped>

    .radio-tile-group {
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: left
    }

    .radio-tile-group .input-container {
        position: relative;
        height: 5.5rem;
        width: 5.5rem;
        margin: .5rem
    }

    .radio-tile-group .input-container .radio-button {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        margin: 0;
        cursor: pointer
    }

    .radio-tile-group .input-container .radio-tile {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border: 2px solid #888;
        border-radius: 5px;
        padding: 1rem;
        -webkit-transition: -webkit-transform .3s ease;
        transition: -webkit-transform .3s ease;
        transition: transform .3s ease;
        transition: transform .3s ease, -webkit-transform .3s ease
    }

    .radio-tile-group .input-container .icon i {
        color: #888;
        font-size: 25px
    }

    .radio-tile-group .input-container .radio-tile-label {
        text-align: center;
        font-size: .75rem;
        font-weight: 600;
        text-transform: uppercase;
        font-family: inherit;
        position: relative;
        top: 10px;
        color: #888
    }

    .radio-tile-group .input-container .radio-button:checked + .radio-tile {
        background-color: #000;
        border: 2px solid #fff;
        color: #fff;
        -webkit-transform: scale(1.1, 1.1);
        transform: scale(1.1, 1.1)
    }

    .radio-tile-group .input-container .radio-button:checked + .radio-tile .icon i {
        color: #fff;
        background-color: #000
    }

    .radio-tile-group .input-container .radio-button:checked + .radio-tile .radio-tile-label {
        color: #fff;
        background-color: #000;
        top: 10px;
        font-family: inherit
    }
</style>