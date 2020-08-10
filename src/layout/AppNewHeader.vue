<template>
    <div v-if="settings">
        <div class="d-md-none">
            <div class="header_bar">
                <div class="container">
                    <div class="row pt-2">
                        <div class="col-6 text-left">
                            <ul class="list-unstyled p-0 list-inline text-white direction">
                                <li class="list-inline-item">
                                    <a :class="$ml.current == 'ar' ? 'active' : ''" href="" class="text-white"
                                       @click.prevent="changeLang($ml.current == 'ar' ? 'en':'ar')">{{$ml.current ==
                                        'ar' ? 'English' : 'عربي'}}</a>
                                </li>
                                <li class="list-inline-item">
                                    |
                                </li>
                                <li class="list-inline-item">
                                    <a class="text-white" href="" @click.prevent>{{$store.getters.getCurrency}}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-6 text-right">
                            <ul class="list-unstyled p-0 list-inline text-white direction">
                                <li class="list-inline-item" @click.prevent="$router.push({name:'register'})">
                                    <a href="" class="text-white">
                                        <i class="fa fa-user-plus"></i>
                                    </a>
                                </li>
                                <li class="list-inline-item">
                                    |
                                </li>
                                <li class="list-inline-item">
                                    <a href="" @click.prevent="modals.modal1 = true" class="text-white">
                                        <div class="position-relative">
                                            <span class="cart_count2">{{$store.getters['getFavourites'].length}}</span>
                                            <i class="fa fa-star"></i>
                                        </div>
                                    </a>
                                </li>
                                <li class="list-inline-item">
                                    |
                                </li>
                                <li class="list-inline-item">
                                    <a href="" @click.prevent="modals.modal2 = true" class="text-white">
                                        <div class="position-relative">
                                            <span class="cart_count2">{{cart.length}}</span>
                                            <i class="fa fa-cart-plus"></i>
                                        </div>
                                    </a>
                                </li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="news_bar">
                <div class="container">
                    <div class="row">
                        <div class="col-12 text-left">
                            <marquee behavior="scroll" class="text-white pt-2"
                                     :direction="$ml.current == 'ar' ? 'right' : 'left'">
                                يمكنك متابعة اخر الاخبار عن طريق الاشتراك فى خدمات البريد الالكتروني
                                يمكنك متابعة اخر الاخبار عن طريق الاشتراك فى خدمات البريد الالكتروني
                                يمكنك متابعة اخر الاخبار عن طريق الاشتراك فى خدمات البريد الالكتروني
                            </marquee>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header_nv mb-5 position-relative">

                <header class="header-global">
                    <base-nav class="navbar-main direction" transparent type="" effect="light" expand>
                        <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
                            <img :src="$helper.getLogo()">
                        </router-link>

                        <div class="row" slot="content-header" slot-scope="{closeMenu}">
                            <div class="col-6 collapse-brand text-left" style="text-align:right;">
                                <router-link to="/">
                                    <img :src="$helper.getLogo()">
                                </router-link>
                            </div>
                            <div class="col-6 collapse-close text-right">
                                <close-button @click="closeMenu"></close-button>
                            </div>
                        </div>


                        <ul class="list-unstyled navbar-nav text-left align-items-lg-center ml-lg-auto direction">

                            <li class="nav-item">
                                <router-link :to="{name:'search_result'}" class="nav-link">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('search')}}</span>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name:'about_us'}" class="nav-link">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('about_us')}}</span>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name:'register_vendor'}" class="nav-link">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('contact_us')}}</span>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name:'location'}" class="nav-link">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('location')}}</span>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="auth">
                                <router-link :to="{name:'account'}" class="nav-link">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('my_account')}}</span>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="auth">
                                <a href="" @click.prevent="Logout" class="nav-link">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('logout')}}</span>
                                </a>
                            </li>
                            <li class="nav-item" v-if="!auth">
                                <router-link :to="{name:'login'}" class="nav-link nav-link-icon">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('login')}}</span>
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="!auth">
                                <router-link :to="{name:'register'}" class="nav-link nav-link-icon">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('register')}}</span>
                                </router-link>
                            </li>
                            <!--                    <li class="nav-item">-->
                            <!--                        <router-link :to="{name:'register_vendor'}" class="nav-link nav-link-icon">-->
                            <!--                            <span class="nav-link-inner&#45;&#45;text font-weight-bold text-capitalize">{{this.$ml.get('register_vendor')}}</span>-->
                            <!--                        </router-link>-->
                            <!--                    </li>-->

                            <button id="_header_cart" class="d-none" @click="modals.modal2 = true"></button>
                            <li class="nav-item d-md-block">
                                <!--                        <router-link :to="{name:'cart'}"-->
                                <!--                                     class="nav-link nav-link-icon position-relative">-->
                                <!--                            <div class="cart_bullet">{{cart.length}}</div>-->
                                <!--                            <i class="ni ni-cart ni-2x"></i>-->
                                <!--                        </router-link>-->
                                <a href="#" @click.prevent="modals.modal2 = true"
                                   class="nav-link nav-link-icon position-relative">
                                    <div class="cart_bullet">{{cart.length}}</div>
                                    <i class="ni ni-cart ni-2x"></i>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link nav-link-icon" style="cursor: pointer" @click="changeLang">
                                    <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.current === 'ar' ? 'En' : 'العربية'}}</span>
                                    <!--                        <span class="nav-link-inner--text font-weight-bold text-capitalize">{{this.$ml.get('change_lang')}}</span>-->
                                </a>
                            </li>
                        </ul>
                    </base-nav>
                </header>
            </div>
            <div class="search-query-bar">

                <div class="container">
                    <div class="row direction text-left">
                        <div class="col-12 text-center">
                            <div class="search_bar d-inline-block">
                                <img class="m-1 pt-2" :src="require('@/assets/images/newImages/search.png')"
                                     width="20px"/>
                            </div>
                            <input type="text" class="form-control form-control-alternative d-inline-block w-75"
                                   :class="$ml.current == 'ar' ?  'rad_left' : 'rad_right'"
                                   @input="getApiSuggest()"
                                   @blur="hideSearch()"
                                   @keyup.enter="goToResult()"
                                   v-model="search"
                                   :placeholder="$ml.get('site_search')">
                            <div class="autocompletes">
                                <div class="autocomplete-items">
                                    <div v-for="(items , key) in suggestList" :key="key"
                                         class="text-left">
                                        <div class="category text-left font-weight-bold">
                                            <img :src="require('@/assets/images/newImages/next.png')" width="25px"
                                                 alt="">
                                            {{$ml.get(key)}}
                                        </div>
                                        <div class="item text-left"
                                             v-for="(item , key) in items"
                                             :key="key" @click="setQuerySearch(item)">
                                            <strong>{{item}}</strong>
                                        </div>
                                        <div class="item text-center"
                                             v-if="items.length == 0">
                                            <strong>{{$ml.get('no_data')}}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-none d-md-block">
            <div class="w-100">
                <div class="header_bar"></div>
                <div class="container-fluid">
                    <div class="row direction header_tool_bar">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-1">
                                    <div class="header_logo">
                                        <a href="./" @click.prevent="$router.push({name:'home'})">
                                            <img :src="$helper.getLogo()" width="120px" alt="">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="header_lang">
                                        <ul class="list-unstyled list-inline direction-inverse">
                                            <li class="list-inline-item">
                                                <a :class="$ml.current == 'ar' ? 'active' : ''" href=""
                                                   @click.prevent="changeLang('ar')">عربي</a>
                                            </li>
                                            <li class="list-inline-item">
                                                |
                                            </li>
                                            <li class="list-inline-item">
                                                <a :class="$ml.current == 'en' ? 'active' : ''" href=""
                                                   @click.prevent="changeLang('en')">English</a>
                                            </li>
                                        </ul>
                                        <div class="current_currency">{{$store.getters.getCurrency}}</div>
                                    </div>
                                </div>
                                <div class="col-5 text-left">
                                    <div class="header_contact">
                                        <ul class="list-unstyled direction">
                                            <li class="list-inline-item direction-inverse animIcons"
                                                v-if="$helper.getSettings().phone1">
                                                <a :href="'tel:'+$helper.getSettings().phone1">
                                                    {{$helper.getSettings().phone1}}
                                                </a>
                                            </li>
                                            <li class="list-inline-item  animIcons direction-inverse"
                                                v-if="$helper.getSettings().phone2">
                                                <a :href="'tel:'+$helper.getSettings().phone2">
                                                    {{$helper.getSettings().phone2}}
                                                </a>
                                            </li>
                                            <li class="list-inline-item animIcons"
                                                v-if="$helper.getSettings().facebook">
                                                <a :href="$helper.getSettings().facebook">
                                                    <img :src="require('@/assets/images/newImages/facebook.png')"
                                                         width="30px"
                                                         alt="">
                                                </a>
                                            </li>
                                            <li class="list-inline-item animIcons" v-if="$helper.getSettings().twitter">
                                                <a :href="$helper.getSettings().twitter">
                                                    <img :src="require('@/assets/images/newImages/twitter.png')"
                                                         width="30px"
                                                         alt="">
                                                </a>
                                            </li>
                                            <li class="list-inline-item animIcons"
                                                v-if="$helper.getSettings().snapchat">
                                                <a :href="$helper.getSettings().snapchat">
                                                    <img :src="require('@/assets/images/newImages/snapchat.png')"
                                                         width="30px"
                                                         alt="">
                                                </a>
                                            </li>
                                            <li class="list-inline-item animIcons"
                                                v-if="$helper.getSettings().instagram">
                                                <a :href="$helper.getSettings().instagram">
                                                    <img :src="require('@/assets/images/newImages/instagram.png')"
                                                         width="30px"
                                                         alt="">
                                                </a>
                                            </li>
                                            <li class="list-inline-item animIcons"
                                                v-if="$helper.getSettings().front_email">
                                                <a :href="'mailto:'+$helper.getSettings().front_email">
                                                    <img :src="require('@/assets/images/newImages/email.png')"
                                                         width="30px"
                                                         alt="">
                                                </a>
                                            </li>
                                            <li></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="header_fav_cart">
                                        <ul class="list-unstyled direction">
                                            <li class="text-left mt-2">
                                                <a href="" @click.prevent="modals.modal1 = true">
                                                    <div class="position-relative  float-right">
                                                        <span class="cart_count" style="left: 20px;top: -20px;">{{$store.getters['getFavourites'].length}}</span>
                                                    </div>
                                                    <div class="float-left">
                                                    <span>
                                                        {{$ml.get('favourite')}}
                                                     </span>
                                                    </div>
                                                    <div class="float-right animIcons">
                                                    <span>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star-half-empty"></i>
                                                    </span>
                                                    </div>
                                                    <div class="clearfix"></div>
                                                </a>
                                            </li>
                                            <li class="text-left mt-4">
                                                <a href="" @click.prevent="modals.modal2 = true">
                                                    <div class="float-left">
                                                        <span>{{$ml.get('cart')}}</span>
                                                    </div>
                                                    <div class="position-relative animIcons float-right">
                                                        <span class="cart_count">{{cart.length}}</span>
                                                        <img :src="require('@/assets/images/newImages/cart.png')"
                                                             width="40px"
                                                             alt="">
                                                    </div>
                                                    <div class="clearfix"></div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="header_fav_cart">
                                        <ul class="list-unstyled text-center direction">
                                            <li class="mt-2 bg-active-login" v-if="!auth_user">
                                                <a class="text-white" href=""
                                                   @click.prevent="$router.push({name:'login'})">
                                                    {{$ml.get('login')}}
                                                </a>
                                            </li>
                                            <li class="mt-3 bg-active-register" v-if="!auth_user">
                                                <a href="" @click.prevent="$router.push({name:'register'})">
                                                    {{$ml.get('register')}}
                                                </a>
                                            </li>
                                            <li class="mt-2 bg-active-login" v-if="auth_user">
                                                <a class="text-white" href=""
                                                   @click.prevent="$router.push({name:'account'})">
                                                    {{$ml.get('my_account')}}
                                                </a>
                                            </li>
                                            <li class="mt-3 bg-active-register" v-if="auth_user">
                                                <a href="" @click.prevent="Logout">
                                                    {{this.$ml.get('logout')}}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container-fluid">
                <div class="row direction text-left header_search_bar">
                    <div class="col-2 pt-1">
                        {{$ml.get('search')}}
                        <img class="m-1" :src="require('@/assets/images/newImages/search.png')" width="20px"/>
                    </div>
                    <div class="col-4">
                        <input type="text" class="form-control form-control-alternative"
                               @input="getApiSuggest()"
                               @blur="hideSearch()"
                               @keyup.enter="goToResult()"
                               v-model="search"
                               :placeholder="$ml.get('site_search')"
                               :class="$ml.current == 'ar' ?  'rad_left' : 'rad_right'">
                        <div class="autocompletes">
                            <div class="autocomplete-items">
                                <div v-for="(items , key) in suggestList" :key="key"
                                     class="text-left">
                                    <div class="category text-left font-weight-bold">
                                        <img :src="require('@/assets/images/newImages/next.png')" width="25px" alt="">
                                        {{$ml.get(key)}}
                                    </div>
                                    <div class="item text-left"
                                         v-for="(item , key) in items"
                                         :key="key" @click="setQuerySearch(item)">
                                        <strong style="color:#000;">{{item}}</strong>
                                    </div>
                                    <div class="item text-center"
                                         v-if="items.length == 0">
                                        <strong>{{$ml.get('no_data')}}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row direction header_menu_bar">
                    <div class="col-12">
                        <ul class="list-unstyled direction list_menu text-left" :class="$ml.current">
                            <li :class="$route.name == 'home' ? 'active' : ''">
                                <a href="./" @click.prevent="$router.push({name:'home'})">
                                    {{$ml.get('home')}}
                                </a>
                            </li>
                            <li>
                                <div class="dropdown">
                                    <button class="dropbtn">{{$ml.get('categories')}}</button>
                                    <div class="dropdown-content">
                                        <a v-for="(cat, key) in categories" href="#"
                                           @click.prevent="$router.push({name:'search_result',query:{q:(cat.translated.title ? cat.translated.title.toLowerCase() : ''),category_id:cat.id}})">
                                            {{cat.translated.title}}
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li :class="$route.name == 'search_result' ? 'active' : ''">
                                <a href="" @click.prevent="$router.push({name:'search_result'})">
                                    {{$ml.get('search')}}
                                </a>
                            </li>
                            <li :class="$route.name == 'new_arrival' ? 'active' : ''">
                                <a href="" @click.prevent="$router.push({name:'new_arrival'})">
                                    {{$ml.get('new_arrival')}}
                                </a>
                            </li>
                            <li :class="$route.name == 'best_sales' ? 'active' : ''">
                                <a href="" @click.prevent="$router.push({name:'best_sales'})">
                                    {{$ml.get('best_sales')}}
                                </a>
                            </li>
                            <li :class="$route.name == 'authors' ? 'active' : ''">
                                <a href="" @click.prevent="$router.push({name:'authors'})">
                                    {{$ml.get('authors')}}
                                </a>
                            </li>
                            <li :class="$route.name == 'about_us' ? 'active' : ''">
                                <a href="" @click.prevent="$router.push({name:'about_us'})">
                                    {{$ml.get('about_us')}}
                                </a>
                            </li>
                            <li :class="$route.name == 'events' ? 'active' : ''">
                                <a href="" @click.prevent="$router.push({name:'events'})">
                                    {{$ml.get('events')}}
                                </a>
                            </li>
                            <li :class="$route.name == 'location' ? 'active' : ''">
                                <a href="" @click.prevent="$router.push({name:'location'})">
                                    {{$ml.get('location')}}
                                </a>
                            </li>
                            <li :class="$route.name == 'register_vendor' ? 'active' : ''">
                                <a href="" @click.prevent="$router.push({name:'register_vendor'})">
                                    {{$ml.get('contact_us')}}
                                </a>
                            </li>
                            <li :class="$route.name == 'offers' ? 'active' : ''">
                                <a href="" @click.prevent="$router.push({name:'offers'})">
                                    {{$ml.get('offers')}}
                                </a>
                            </li>
                            <li v-if="auth && checkPointModule()" :class="$route.name == 'my_points' ? 'active' : ''">
                                <a href="" @click.prevent="$router.push({name:'my_points'})">
                                    {{$ml.get('my_points')}}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <modal :show.sync="modals.modal2"
               gradient="white"
               :showClose="false"
               modal-content-classes="new_content_modal"
               header-classes="new_header_modal"
               modal-classes="modal-danger modal-dialog-centered modal-lg">
            <h6 slot="header"
                class="modal-title font-weight-bold text-center m-auto display-4 text-white direction "
                id="modal-title-notification">
                {{this.$ml.get('your_cart')}}</h6>

            <div class="py-3 text-center">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <cart/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--            <template slot="footer">-->
            <!--                <base-button type="white">{{this.$ml.get('add')}}</base-button>-->
            <!--                <base-button type="link"-->
            <!--                             text-color="white"-->
            <!--                             @click="modals.modal2 = false">-->
            <!--                    {{this.$ml.get('close')}}-->
            <!--                </base-button>-->
            <!--            </template>-->
        </modal>
        <modal :show.sync="modals.modal1"
               gradient="white"
               :showClose="false"
               modal-content-classes="new_content_modal"
               header-classes="new_header_modal"
               modal-classes="modal-danger modal-dialog-centered modal-lg">
            <h6 slot="header"
                class="modal-title font-weight-bold text-center m-auto display-4 text-white direction ">
                {{this.$ml.get('favourites')}}</h6>

            <div class="py-3 text-center">
                <div class="row">
                    <div class="col-12">
                        <div class="card  d-none d-md-block ">
                            <div class="card-body text-dark">
                                <div class="table-responsive mb-2">
                                    <table class="table new_table">
                                        <thead>
                                        <tr>
                                            <th width="100px">{{$ml.get('image')}}</th>
                                            <th>{{$ml.get('product_name')}}</th>
                                            <th>{{$ml.get('category')}}</th>
                                            <th>{{$ml.get('price')}}</th>
                                            <th width="100px" style="background: transparent;border: 0;"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-if="$store.getters['getFavourites'].length == 0">
                                            <td colspan="5" class="text-center">
                                                {{$ml.get('no_data')}}
                                            </td>
                                        </tr>
                                        <tr v-for="(fav , k) in $store.getters['getFavourites']" :key="k">
                                            <td class="text-center">
                                                <img v-if="fav.product" :src="fav.product.main_image" class="w-100"
                                                     alt="">
                                            </td>
                                            <td class="text-center">
                                                {{fav.product_translation ? fav.product_translation.title : ''}}
                                            </td>
                                            <td class="text-center">{{fav.product ? fav.product.category ?
                                                fav.product.category.translated.title : '' : ''}}
                                            </td>
                                            <td class="text-center">
                                                <b>{{fav.pov ? fav.pov.price : ''}}</b>
                                            </td>
                                            <td style="background: transparent;border: 0;">
                                                <div class="btn-group" dir="ltr">
                                                    <button class="btn btn-danger btn-sm"
                                                            @click="removeFavourites(fav,k)">
                                                        <i class="fa fa-times"></i>
                                                    </button>
                                                    <button class="btn btn-neutral btn-sm" @click="AddToCart(fav,k)">
                                                        <img :src="require('@/assets/images/newImages/cart.png')"
                                                             style="width:30px" alt="">
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="row mb-2 d-md-none" v-for="(fav , k) in $store.getters['getFavourites']" :key="k">
                            <div class="col-6">
                                <div class="favItem">
                                    <div class="item_header">
                                        {{$ml.get('image')}}
                                    </div>
                                    <img v-if="fav.product" :src="fav.product.main_image" class="w-100 mt-1"
                                         alt=""/>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="favItem">
                                    <div class="item_header">
                                        {{$ml.get('product_name')}}
                                    </div>
                                    <div class="mt-2 mb-2 text-left text-black p-2">
                                        <b>
                                            {{fav.product_translation ? fav.product_translation.title : ''}}
                                        </b>
                                    </div>
                                </div>
                                <div class="row_item text-left p-1">
                                    <div class="row_item_key">
                                        {{$ml.get('category')}}
                                    </div>
                                    <div class="row_item_value">
                                        {{fav.product ? fav.product.category ? fav.product.category.translated.title :
                                        '' : ''}}
                                    </div>
                                </div>
                                <div class="row_item text-left p-1">
                                    <div class="row_item_key">
                                        {{$ml.get('price')}}
                                    </div>
                                    <div class="row_item_value">
                                        {{fav.pov ? fav.pov.price : ''}} {{$store.getters.getCurrency}}
                                    </div>
                                </div>
                                <div class="text-center mt-3">
                                    <div class="btn-group" dir="ltr">
                                        <button class="btn btn-danger btn-sm"
                                                @click="removeFavourites(fav,k)">
                                            <i class="fa fa-times"></i>
                                        </button>
                                        <button class="btn btn-neutral btn-sm" @click="AddToCart(fav,k)">
                                            <img :src="require('@/assets/images/newImages/cart.png')"
                                                 style="width:30px" alt="">
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <hr class="m-2">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mt-2 text-center text-md-left" @click="modals.modal1 = false">
                        <button class="btn btn-default" style="background: #5d5d5d">
                            {{$ml.get('continue_shopping')}}
                        </button>
                    </div>
                    <div class="col-md-6 mt-2 text-center text-md-right"
                         @click="modals.modal1 = false;modals.modal2 = true;">
                        <button class="btn btn-info">
                            {{$ml.get('open_cart')}}
                        </button>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'
    import BaseNav from "@/components/BaseNav";
    import Modal from "@/components/Modal.vue";
    import BaseDropdown from "@/components/BaseDropdown";
    import CloseButton from "@/components/CloseButton";
    import cart from '../views/pages_components/cart'
    import {mapState, mapActions} from 'vuex'
    import Vue from 'vue'
    import Message from 'vue-m-message'

    Vue.use(Message)
    export default {
        data() {
            return {
                auth_user: null,
                suggestList: [],
                categories: [],
                search: '',
                settings: null,
                modals: {
                    modal1: false,
                    modal2: false,
                    modal3: false
                },
            }
        },
        mounted() {
            this.auth_user = localStorage.getItem('auth');
            this.checkStorage();
            this.startHeaderBG();
            this.getAllSettings();
            this.getAllCategory();
        },
        methods: {
            getAllCategory() {
                let vm = this;
                vm.$root.$children[0].$refs.loader.show_loader = true;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.FIND_CATEGORIES, {
                    params: {
                        lang: vm.lang
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    if (status) {
                        vm.categories = data.categories
                        return;
                    }
                    vm.categories = [];
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                    vm.categories = [];
                })
            },
            removeFavourites(element, key) {
                let vm = this;
                let product_id = element.pov.id;
                let filtered_cart = vm.favourites.filter((value, index, arr) => {
                    if (product_id == value.pov.id) {
                        return false
                    }
                    return true;
                });
                // console.log(key)
                vm.$store.dispatch('deleteToFavourites', {key: key, element: element});
            },
            AddToCart(prepared_data, k) {
                let vm = this;
                // let prepared_data = {
                //     product_id: vm.product.id,
                //     branch_id: vm.product.branch_id,
                //     store_id: pov.store_detail ? pov.store_detail.store_id : null,
                //     product_translation: vm.product.translated,
                //     min_amount_needed: pov.min_amount_needed ? vm.pov.min_amount_needed : 1,
                //     pov: pov
                // };
                vm.bindToCart(prepared_data)
                vm.removeFavourites(prepared_data, k)
            },
            bindToCart(product) {
                let vm = this;
                let found = false;
                let product_id = product.pov.id;
                vm.cart.filter((value, index, arr) => {
                    if (product_id == value.pov.id) {
                        found = true;
                    }
                });
                if (found) {

                    Message({
                        title: vm.$ml.get('error'),
                        message: vm.$ml.get('already_added'),
                        className: 'bg-gray text-white',
                        zIndex: 9999999,
                        iconImg: require('@/assets/error.png'),
                        position: 'bottom-center',
                        // type: 'error',
                        showClose: true
                    })
                    return;
                }
                Message({
                    title: vm.$ml.get('success'),
                    message: vm.$ml.get('added_to_cart'),
                    className: 'bg-success text-white',
                    zIndex: 9999999,
                    // iconImg: './img/icons/common/success.png',
                    iconImg: require('@/assets/success.png'),
                    position: 'bottom-center',
                    // type: 'error',
                    showClose: true
                });
                vm.$store.dispatch('addToCart', product);
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
            checkPointModule() {
                return JSON.parse(localStorage.getItem('pointModule'))
            },
            setQuerySearch(setQuerySearch) {
                let vm = this;
                vm.search = setQuerySearch;
                vm.goToResult()
                // vm.suggestList = [];
            },
            hideSearch() {
                let vm = this;
                setTimeout(() => {
                    vm.suggestList = [];
                }, 100)
            },
            getLogo() {
                this.$helper.getLogo()
            },
            isMobile() {
                if (screen.width <= 760) {
                    return true;
                } else {
                    return false;
                }
            },
            ...mapActions([
                'addToCart',
                'deleteToCart',
                'checkStorage',
                'saveToCart',
                'addAuthUser',
                'deleteAuthUser',
            ]),
            goToResult() {
                let search = this.search
                if (search) {
                    search = search.toLowerCase();
                    let route = this.$router.resolve({name: 'search_result', query: {q: search}});
                    let url = 'https://' + location.host + '' + route.href;
                    console.log(url)
                    location.href = url
                }
            },
            getApiSuggest() {
                let vm = this;
                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.PRODUCT_AUTO_COMPLETE, {
                    params: {
                        category: true,
                        lang: vm.lang,
                        query: vm.search,
                    }
                }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    vm.suggestList = data;
                }).catch((error) => {
                    vm.suggestList = []
                })
            },
            startHeaderBG() {
                $(document).ready(function () {
                    let scroll_start = 0;
                    let offset = 600;

                    $(document).scroll(function () {
                        scroll_start = $(this).scrollTop();
                        // console.log(scroll_start)
                        if (scroll_start > offset) {
                            $(".navbar-main").css('background-color', '#2e2e2e');
                        } else {
                            $('.navbar-main').css('background-color', 'transparent');
                        }
                    });

                });
            },
            async Logout() {

                localStorage.removeItem('current_address_data');
                // localStorage.removeItem('current_payment');
                // localStorage.removeItem('current_coupon');
                // localStorage.removeItem('current_address');
                await this.$store.dispatch('deleteAuthUser')
                await this.$store.dispatch('clearCart')
                await this.$store.dispatch('clearFavourite')
                await this.$store.dispatch('clearOffers')
                await localStorage.removeItem('auth');
                setTimeout(() => {

                    location.reload()
                }, 300)
            },
            changeLang(lang) {
                if (lang) {
                    this.$ml.change(lang)
                }
                if (this.$ml.current == 'en') {
                    if (!lang) this.$ml.change('en')
                    localStorage.setItem('current_currency', 'KWD')
                } else {
                    if (!lang) this.$ml.change('ar');
                    localStorage.setItem('current_currency', 'دينار كويتي')
                }
                location.reload()
            }
        },
        computed: {
            ...mapState([
                'auth',
                'favourites',
                'cart'
            ]),
        },
        components: {
            BaseNav,
            Modal,
            cart,
            CloseButton,
            BaseDropdown
        }
    };
</script>


<style>
    .header_bar {
        height: 45px;
        background: #00aeef;
    }

    .news_bar {
        height: 45px;
        background: #5d5d5d;
    }

    .header_tool_bar {
        padding: 10px 0;
        border-bottom: 1px solid #5d5d5d;
        margin-bottom: 5px;
    }

    .header_tool_bar .header_logo {

    }

    .header_tool_bar .header_lang {
        padding: 12px 15px 0 15px;
        margin: 0 20px 0 20px;
    }

    .header_tool_bar .header_lang ul li a {
        font-size: 15px;
    }

    .header_tool_bar .header_lang ul li a.active {
        font-weight: bold;
    }

    .bg-active-login {
        width: 100%;
        padding: 5px;
        color: #fff;
        background: #5d5d5d;
    }


    .bg-active-register {
        width: 100%;
        text-decoration: underline;
        margin-top: 15px !important;
    }

    .header_tool_bar .current_currency {
        font-weight: bold;
        text-align: center;
        background: #5d5d5d;
        padding: 3px;
        color: #fff;
    }

    .header_tool_bar .header_contact {
        margin-top: 60px;
    }

    .header_tool_bar .header_fav_cart {
        position: relative;
    }

    .header_tool_bar .header_fav_cart .cart_count {
        position: absolute;
        bottom: 15px;
        left: 50%;
        font-weight: bold;
    }

    .cart_count2 {
        position: absolute;
        bottom: 14px;
        font-size: 12px;
        left: 50%;
        font-weight: bold;
    }

    .header_menu_bar {
        border-top: 1px solid #888;
        border-bottom: 1px solid #888;
    }

    .header_menu_bar .list_menu {

    }

    .header_menu_bar .list_menu {
        margin-top: 5px;
        margin-bottom: 5px;
        padding: 0;
    }

    .header_menu_bar .list_menu li {
        display: inline-block;
        padding: 0 10px;
        border-left: 1px solid #222;
        text-align: center;
    }

    .header_menu_bar .list_menu.ar li:first-child {
        border-right: 0;
    }

    .header_menu_bar .list_menu.ar li:last-child {
        border-left: 0;
    }

    .header_menu_bar .list_menu.en li:first-child {
        border-left: 0;
    }

    .header_menu_bar .list_menu.en li:last-child {
        border-right: 0;
    }

    .header_menu_bar .list_menu li.active {
        font-weight: bold;
        padding: 5px;
    }

    .header_search_bar {
        background: #5d5d5d;
        min-height: 30px;
        color: #fff;
        margin-bottom: 5px;
    }

    .header_menu_bar .list_menu li.active a {
        color: #fff;
        background: #00adee;
        padding: 5px;
    }

    .rad_left {
        border-radius: 25px 0 0 25px !important;
    }

    .rad_right {
        border-radius: 0 25px 25px 0 !important;
    }

    .search_bar {
        background: rgb(93, 93, 93);
        width: 50px;
        height: 47px;
        top: -2px;
        position: relative;
        text-align: center;
    }

    .search-query-bar {
        margin-top: 90px;
    }

    .autocomplete-items {
        position: absolute;
        border: 1px solid #d4d4d4;
        border-bottom: none;
        border-top: none;
        z-index: 99999;
        /*position the autocomplete items to be the same width as the container:*/
        top: 100%;
        left: 0;
        right: 0;
        max-height: 500px;
        overflow: hidden;
        overflow-y: scroll;
    }

    .autocomplete-items .category {
        color: #00adee;
        padding: 10px;
        background-color: #fff;
    }

    .autocomplete-items .item {
        padding: 10px;
        cursor: pointer;
        background-color: #fff;
        border-bottom: 1px solid #d4d4d4;
    }

    .autocomplete-items div:hover {
        /*when hovering an item:*/
        background-color: #e9e9e9;
    }

    .autocomplete-active {
        /*when navigating through the items using the arrow keys:*/
        background-color: DodgerBlue !important;
        color: #ffffff;
    }

    .new_table {
        border-spacing: 7px;
        border-collapse: separate;
        min-width: 600px;
    }

    .new_table th {
        background: #8d8d8d;
        color: #fff;
    }

    .dropbtn {
        background-color: transparent;
        /*color: white;*/
        padding: 5px 17px 5px 17px;
        font-size: 16px;
        border: none;
        cursor: pointer;
    }

    .dropbtn:after {
        content: '↓';
        position: absolute;
        left: 5px;
        z-index: 99;

    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        z-index: 9999;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        max-height: 400px;
        overflow-y: scroll;
    }

    .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    .dropdown-content a:hover {
        color: #f1f1f1;
        background-color: #00adee
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    .dropdown:hover .dropbtn {
        background-color: #00adee;
        color: #fff;
    }

    .favItem {
        border: 1px solid #eee;
    }

    .favItem .item_header {
        background: #8d8d8d;
        font-weight: bold;
        padding: 10px 5px;
    }

    .row_item {
        display: flex;
        background: #8d8d8d;
    }

    .row_item
    .row_item_key {
        flex: 1;
    }

    .row_item
    .row_item_value {
        flex: 2;
        background: #fff;
        color: #000;
        padding: 5px;
        border-radius: 5px;
    }

    .row_item
    .row_item_value_qty {
        flex: 2;
        background: #fff;
        color: #000;
    }

    .new_header_modal {
        background: #1dadee;
        border-radius: 30px 30px 0 0;
        text-align: center;
        color: #fff;
    }

    .new_content_modal {
        border-radius: 30px 30px 0 0 !important;
        text-align: center;
        overflow: hidden;
    }

    .new_table td {
        vertical-align: middle !important;
    }
</style>
