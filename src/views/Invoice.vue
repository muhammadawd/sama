<template>
    <div class="containers" style="margin: auto;padding: 15px" v-if="sale">

        <header class="header" style="margin:0">
            <div style="width: 40%;display: inline-block;text-align: left">
                <div style="display: grid">
                    <img :src="require('@/assets/images/tlogo-02.png')" alt="" height="130px"
                         @click="goHome"/>
                    <div style="display: inline-block;margin-top:20px ">
                        <div style="width: 50%;display: inline-block">
                            <div style="background: #49a9e2;width: 22px;height: 22px;border-radius: 5px;color: #fff;text-align: center;line-height: 22px;display: inline-block">
                                <i class="fa fa-facebook"></i>
                            </div>
                            {{$helper.getSettings().facebook ?$helper.getSettings().facebook :''}}
                        </div>
                        <div style="width: 50%;display: inline-block">
                            <div style="background: #49a9e2;width: 22px;height: 22px;border-radius: 5px;color: #fff;text-align: center;line-height: 22px;display: inline-block">
                                <i class="fa fa-twitter"></i>
                            </div>
                            {{$helper.getSettings().twitter}}
                        </div>
                        <div style="width: 50%;display: inline-block">
                            <div style="background: #49a9e2;width: 22px;height: 22px;border-radius: 5px;color: #fff;text-align: center;line-height: 22px;display: inline-block">
                                <i class="fa fa-envelope"></i>
                            </div>
                            {{$helper.getSettings().front_email}}
                        </div>
                        <div style="width: 50%;display: inline-block">
                            <div style="background: #49a9e2;width: 22px;height: 22px;border-radius: 5px;color: #fff;text-align: center;line-height: 22px;display: inline-block">
                                <i class="fa fa-instagram"></i>
                            </div>
                            {{$helper.getSettings().instagram}}
                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 20%;display: inline-block">
                <div style="border: 1px solid #000;border-radius: 18px;padding: 5px;">
                    <h5 style="font-weight: bold;font-size: 15px;text-align: center">cash / credit invoice</h5>
                    <b>No:</b> {{sale.serial}}
                </div>
            </div>
            <div style="width: 40%;display: inline-block;text-align: right">
                <div style="display: grid">
                    <img :src="$helper.getSettings().logo ? $helper.getSettings().logo :require('@/assets/images/tlogo-01.png')"
                         height="120px" alt=""
                         style="width: 70%;margin-left: auto;" @click="goHome"/>
                    <div>
                        <slot v-if="$helper.getSettings()">
                            {{$helper.getSettings().address_en}}
                        </slot>
                    </div>
                    <div>
                        <slot v-if="$helper.getSettings()">
                            {{$helper.getSettings().address_ar}}
                        </slot>
                    </div>
                    <div style="font-weight: bold">
                        <slot v-if="$helper.getSettings()">
                            Mob :
                            {{$helper.getSettings().phone1}}
                            {{$helper.getSettings().phone2}}
                        </slot>
                    </div>
                    <div>
                        التاريخ :
                        {{sale.created_at}}
                    </div>
                </div>
            </div>
            <!--<address>-->
            <!--    <b style="text-transform: uppercase">{{$sale['user']['first_name'] ?? ''}} {{$sale['user']['last_name'] ?? '' }}</b>-->
            <!--    <b style="text-transform: uppercase">{{$sale['user']['email'] ?? '' }}</b>-->
            <!--    <p>{{$sale['address']['governorate']['translated']['name'] ?? ''}}</p>-->
            <!--    <p>{{$sale['address']['city']['translated']['name'] ?? ''}}</p>-->
            <!--    <p>{{$sale->address->detailed_address ?? ''}}</p>-->
            <!--</address>-->
            <!--<div class="invoice-company-logo"><img-->
            <!--        src="{{asset('assets/images/logo.png')}}"-->
            <!--        width="100px"></div>-->
        </header>

        <div style="border: 1px solid #000;width: 100%;padding: 8px;margin-top: 10px">
            <!--<div style="direction: rtl">-->
            <!--<div style="width: 15%;display: inline-block;text-align: right">-->
            <!--اسم العميل-->
            <!--</div>-->
            <!--<div style="border-bottom: 1px dotted #000;width: 70%;display: inline-block;text-align: center">-->
            <!--{{sale.user.first_name}} {{sale.user.last_name}} , {{sale.user.phone}}-->
            <!--</div>-->
            <!--<div style="width: 15%;display: inline-block;text-align: left">-->
            <!--Customer Name-->
            <!--</div>-->
            <!--</div>-->


            <div style="direction: rtl;margin-top: 5px">
                <div style="direction: rtl;width: 50%;display: inline-block;padding-left: 12px">
                    <div style="width: 20%;display: inline-block;text-align: right">
                        رقم العميل
                    </div>
                    <div style="border-bottom: 1px dotted #000;width: 55%;display: inline-block;text-align: center"></div>
                    <div style="width: 25%;display: inline-block;text-align: left">
                        Customer Code
                    </div>
                </div>
                <div style="direction: rtl;width: 50%;display: inline-block">
                    <div style="width: 20%;display: inline-block;text-align: right">
                        طلب الشراء
                    </div>
                    <div style="border-bottom: 1px dotted #000;width: 60%;display: inline-block;text-align: center"></div>
                    <div style="width: 20%;display: inline-block;text-align: left">
                        L.P.O.No.
                    </div>
                </div>
            </div>
            <div style="direction: rtl;margin-top: 5px">
                <div style="direction: rtl;width: 50%;display: inline-block;padding-left: 12px">
                    <div style="width: 20%;display: inline-block;text-align: right">
                        امر التسليم
                    </div>
                    <div style="border-bottom: 1px dotted #000;width: 55%;display: inline-block;text-align: center"></div>
                    <div style="width: 25%;display: inline-block;text-align: left">
                        N.O.No.
                    </div>
                </div>
                <div style="direction: rtl;width: 50%;display: inline-block">
                    <div style="width: 20%;display: inline-block;text-align: right">
                        شروط السداد
                    </div>
                    <div style="border-bottom: 1px dotted #000;width: 50%;display: inline-block;text-align: center"></div>
                    <div style="width: 30%;display: inline-block;text-align: left">
                        Terms Of Payment
                    </div>
                </div>
            </div>
        </div>


        <table class="meta tables" style="width:48%">
            <tr>
                <th><span>Store: </span>
                    <small>(المتجر)</small>
                </th>
                <td><span>Kuwait </span></td>
            </tr>
            <tr>
                <th><span>Receipt: </span>
                    <small>(الدفع)</small>
                </th>
                <td><span>{{sale.payment ? sale.payment.token : ''}} </span></td>
            </tr>
            <tr>
                <th><span>Address: </span>
                    <small>(العنوان)</small>
                </th>
                <td><span>{{sale.address ? sale.address.full_address : '' }} </span></td>
            </tr>
        </table>
        <table class="meta tables" style="float:right;width:48%">
            <tr>
                <th><span>Date: </span>
                    <small>(التاريخ)</small>
                </th>
                <td><span>{{new Date().toDateString()}}</span>
                </td>
            </tr>
            <tr>
                <th><span>Customer Details: </span>
                    <small>(العميل)</small>
                </th>
                <td><span> {{sale.user.first_name}} {{sale.user.last_name}} , {{sale.user.phone}} </span>
                </td>
            </tr>
            <tr>
                <th><span>Payment Type  </span>
                    <small>(نوع الدفع)</small>
                </th>
                <td><span>
                {{sale.payment_type.type == 'cash' ? 'cash' : 'visa'}}
                </span>
                </td>
            </tr>
        </table>
        <table class="meta tables" style="width:100%">
            <tr>
                <th style="width: 150px;"><span>Notes: </span>
                    <small>(ملاحظات)</small>
                </th>
                <td><span>{{sale.address? sale.address.detailed_address : '' }}</span>
                </td>
            </tr>
        </table>
        <div><br></div>
        <article>
            <h1></h1>
            <table class="tables inventory mt-3">
                <thead>
                <tr>
                    <th style="text-align:center" width="150"><span>Code</span>
                        <div>الكود</div>
                    </th>
                    <th style="text-align:center" width="150"><span>Image</span>
                        <div>الصورة</div>
                    </th>
                    <th style="text-align:center"><span>Description</span>
                        <div>الوصف</div>
                    </th>
                    <th style="text-align:center" width="50"><span>Qty</span>
                        <div>الكمية</div>
                    </th>
                    <th style="text-align:center" width="150"><span>Unit Price</span>
                        <div>السعر</div>
                    </th>
                    <!--<th style="text-align:center" width="150"><span>DISCOUNT</span></th>-->
                    <th style="text-align:center" width="200"><span>Total Price</span>
                        <div>الاجمالى</div>
                    </th>
                </tr>
                </thead>
                <tbody>

                <template>
                    <!-- v-for="(details , key) in sale.sale_details"> -->
                    <tr v-for="(item , keys) in sale.sale_details" :key="keys">
                        <td style="text-align:center;padding:0">
                            <span>
                                {{item.product_option_value.barcode}}
                            </span>
                        </td>
                        <td style="text-align:center;padding:0">
                            <slot v-if="item.product_option_value.product.main_image">
                                <img :src="item.product_option_value.product.main_image" class="mt-1 mb-1" style="width:120px" alt="..">
                            </slot>
                        </td>

                        <td style="text-align:center">
                        <span>
                            <b>{{item.product_option_value.product.translated.title}}  
                                <span v-for="(value,key) in item.product_option_value.product_option_value_details"
                                      :key="key">
                                    {{value.option_value.translated.title}} {{value.option_value.unit ? value.option_value.unit.translated.title : ''}} ,</span>
                            </b>
                        </span>
                        </td>
                        <td style="text-align:center"><span> {{item.quantity}}</span></td>

                        <td style="text-align:center"><span>{{parseFloat(item.price).toFixed(3)}}</span><span
                                data-prefix> KWD </span></td>

                        <td style="text-align:center">
                            <span> {{((item.quantity) * (item.price)).toFixed(3)}}</span>
                            <span data-prefix> KWD</span>
                        </td>

                    </tr>
                </template>

                </tbody>
            </table>


            <template v-if="has_return">
                <h3 style="margin-top:20px;font-weight:bold">RETURNS</h3>
                <table class="tables inventory">
                    <thead>
                    <tr>
                        <th style="text-align:center" width="50"><span>Qty</span>
                            <div>(الكمية)</div>
                        </th>
                        <th style="text-align:center"><span>Status</span>
                            <small>(الحالة)</small>
                        </th>
                        <th style="text-align:center"><span>Description</span>
                            <div>(الوصف)</div>
                        </th>
                        <th style="text-align:center" width="150"><span>Date </span>
                            <div>(التاريخ)</div>
                        </th>
                        <!--<th style="text-align:center" width="150"><span>DISCOUNT</span></th>-->
                        <th style="text-align:center" width="200"><span>Total Price</span>
                            <div>(الاجمالى)</div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(item , key) in sale.sale_details.returns">
                        <tr v-for="(returns , _key) in item.returns" :key="_key">
                            <td style="text-align:center"> {{returns.quantity}}</td>
                            <td style="text-align:center;background:#f44336;font-weight:bold;opacity:0.7">
                                <span>RETURN</span>
                            </td>

                            <td style="text-align:center">
                            <span>
                                {{item.product_option_value.product.translated.title}} <br>
                                <slot v-for="(options,key) in item.product_option_value.product_option_value_details">
                                {{options.option_value.translated.title}}
                                {{options.option_value.option.translated.title}}
                                {{options.option_value.unit ? options.option_value.unit.translated.title : ''}}
                            ,
                                </slot>
                            </span>
                            </td>

                            <td style="text-align:center">{{returns.created_at}}</td>
                            <td style="text-align:center">{{parseFloat(returns.cost).toFixed(3)}} KWD</td>
                        </tr>
                    </template>

                    </tbody>
                </table>
            </template>

        </article>
        <!--{{$sale['paid_at']}}-->
        <table class="tables mt-3 balance" style="float:right">
            <tr>
                <th><span>  Subtotal </span></th>
                <td><span>{{parseFloat(sale.total).toFixed(3)}}</span><span data-prefix> KWD </span></td>
            </tr>
            <tr v-if="sale.total_return">
                <th><span>  Total Return </span></th>
                <td><span>{{parseFloat(sale.total_return).toFixed(3)}}</span><span data-prefix> KWD </span></td>
            </tr>
            <tr>
                <th><span>Total Discount </span></th>
                <td>
                    <span>{{((parseFloat(sale.total).toFixed(3))-( parseFloat(sale.total_after_discount).toFixed(3))).toFixed(3)}} </span><span
                        data-prefix> KWD </span>
                </td>
            </tr>
            <tr v-if="sale.delivery_cost">
                <th><span>  Shipping  </span></th>
                <td><span>{{parseFloat(sale.delivery_cost).toFixed(3)}}</span><span data-prefix> KWD </span></td>
            </tr>
            <tr v-if="sale.payment_type.type != 'cash'">
                <th><span>  Payment Fees  </span></th>
                <td>
                    <span>{{parseFloat((sale.total_paid - sale.delivery_cost - sale.total_after_discount)).toFixed(3)}}</span><span
                        data-prefix> KWD </span></td>
            </tr>
            <tr>
                <th><span>  Total  </span></th>
                <td><span>{{parseFloat(sale.total_paid).toFixed(3)}}</span><span data-prefix> KWD </span></td>
            </tr>
        </table>
        <div style="clear:both"></div>
        <article>
            <div>
                <!--<h3 style="font-weight:bold;margin-top:20px">PAYMENT-->
                <!--<small>(الدفع)</small>-->
                <!--</h3>-->
                <!--<h3 style="font-weight:bold;margin-top:20px;text-transform:uppercase">({{(sale.payment_type.type) ==-->
                <!--'cash' ? 'cash' : 'visa'}})-->
                <!--&lt;!&ndash;<small>{{$sale['paid_at'] ?? 'NOT PAID'}}</small>&ndash;&gt;-->
                <!--</h3>-->
                <hr style="height: 2px;margin-top:5px;background: #555;">

                <h5 style="font-weight:bold;margin-top:15px;text-align:right;font-size:13px">
                    يتم استبدال مشترياتك واسترداد قيمتها خلال 14 يوم من تاريخ الشراء يجب ان تكون مشترياتك فى حالتها
                    وتغليفها الاساسي (غير مستعملة وغير معدلة ومرفقة بفات
                    ورة الشراء الاصلية ) المشتريات التى تتم بواسطة البطاقات المصرفية (اعتماد/ائتمان) ترد نقدا بعد 3 ايام
                    من تاريخ
                    الشراء المبين فى ايصال الشراء الاصلى نعتذر عن عدم استبدال او استرداد قيمة مشترياتك من الاكسسوارات
                    نتطلع لخدمتكم فى زيارتكم القادمة
                </h5>
                <!--<h5 style="font-weight:bold;margin-top:15px;text-align:left;font-size:13px">-->
                <!--Exchange and refunds are accepted within 14 days from purchasing date.-->
                <!--Items must be in their original condition and packaging-->
                <!--(Unused ,unaltered having the original tags attached at time of exchange or refund ).-->
                <!--Bank cards purchases (credit/debit) will be refunded against cash after 3 days from-->
                <!--the date of purchase as it appears on the original purchasing receipt.-->
                <!--Accessoires are neither exchangeable nor refundable.-->
                <!--We look forward to serving you in your next visit.-->
                <!--</h5>-->

                <!-- <h3 style="font-weight:bold;margin-top:40px;text-transform:uppercase"></h3>
                <h4 style="font-weight:bold;margin-top:20px">THANK YOU FOR YOUR VISIT</h4> -->


            </div>

            <div style="display: flex;direction: rtl">
                <!--<div style="text-align: right;width: 50%;padding: 8px;margin-top: 10px;margin: 5px">-->
                <!--<h4 style="font-weight: bold;">شروط السداد</h4>-->
                <!--<ul style="direction: rtl;list-style-type: square;font-size: 14px">-->
                <!--<li>-->
                <!--يعد التوقيع على الفاتورة ملزماً للعميل وذلك بناء على طلبه من المتجر الإلكترونى للشركة-->
                <!--</li>-->
                <!--<li>-->
                <!--تعتبر هذه الفاتورة صحيحه إذا لم تراجع إدارة الشركة بشأنها خلال أسبوع من تاريخها-->
                <!--</li>-->
                <!--<li>-->
                <!--إن التوقيع على هذه الفاتورة من المستلم بعد استلامه للمنتجات بحالة جيدة ومطابقة للمواصفات-->
                <!--</li>-->
                <!--<li>-->
                <!--اتعهد بأن ادفع قيمة هذه الفاتورة حسب الطريقة المتفق عليها عن طريق المتجر الإلكترونى-->
                <!--</li>-->
                <!--</ul>-->
                <!--</div> -->
                <!--<div style="text-align: left;width: 50%;padding: 8px;margin-top: 10px;margin: 5px">-->
                <!--<h4 style="font-weight: bold;">Cheque Payment Or Bank Transfer To </h4>-->
                <!--<div>-->
                <!--Roll And Pack Co . For Papers , Plastic products And Derivatives.-->
                <!--</div>-->
                <!--<div>National Bank Of Kuwait</div>-->
                <!--<div>Account No : 2018040370</div>-->
                <!--<div>IBAN : KW42NBOK0000000000002018040370</div>-->
                <!--<div>SWIFT Code : NBOKKWKW</div>-->
                <!--</div> -->
            </div>
            <div style="display: flex;direction: rtl">
                <div style="border: 1px solid #000;width: 50%;padding: 8px;margin-top: 10px;margin: 5px">
                    <div style="direction: rtl">
                        <div style="width: 25%;display: inline-block;text-align: right">
                            اسم المستلم
                        </div>
                        <div style="border-bottom: 1px dotted #000;width: 50%;display: inline-block;text-align: center"></div>
                        <div style="width: 25%;display: inline-block;text-align: left">
                            Recipient's Name
                        </div>
                    </div>
                    <div style="direction: rtl">
                        <div style="width: 20%;display: inline-block;text-align: right">
                            التوقيع
                        </div>
                        <div style="border-bottom: 1px dotted #000;width: 60%;display: inline-block;text-align: center"></div>
                        <div style="width: 20%;display: inline-block;text-align: left">
                            Signature
                        </div>
                    </div>
                    <div style="direction: rtl">
                        <div style="width: 20%;display: inline-block;text-align: right">
                            التاريخ
                        </div>
                        <div style="border-bottom: 1px dotted #000;width: 60%;display: inline-block;text-align: center"></div>
                        <div style="width: 20%;display: inline-block;text-align: left">
                            Date
                        </div>
                    </div>
                </div>
                <div style="border: 1px solid #000;width: 50%;padding: 8px;margin-top: 10px;margin: 5px">
                    <div style="direction: rtl">
                        <div style="width: 25%;display: inline-block;text-align: right">
                            مندوب المبيعات
                        </div>
                        <div style="border-bottom: 1px dotted #000;width: 50%;display: inline-block;text-align: center"></div>
                        <div style="width: 25%;display: inline-block;text-align: left">
                            Salesman
                        </div>
                    </div>
                    <div style="direction: rtl">
                        <div style="width: 20%;display: inline-block;text-align: right">
                            المحاسب
                        </div>
                        <div style="border-bottom: 1px dotted #000;width: 60%;display: inline-block;text-align: center"></div>
                        <div style="width: 20%;display: inline-block;text-align: left">
                            Accountant
                        </div>
                    </div>
                    <div style="direction: rtl">
                        <div style="width: 20%;display: inline-block;text-align: right">
                            التوقيع
                        </div>
                        <div style="border-bottom: 1px dotted #000;width: 60%;display: inline-block;text-align: center"></div>
                        <div style="width: 20%;display: inline-block;text-align: left">
                            Signature
                        </div>
                    </div>
                </div>
            </div>

        </article>
    </div>
</template>
<script>
    import apiServiesRoutes from '../bootstrap/apiServiesRoutes'

    export default {
        data() {
            return {
                lang: this.$ml.current,
                token: null,
                has_return: true,
                sale: null
            }
        },
        mounted() {
            let vm = this;
            let auth = localStorage.getItem('auth');
            auth = JSON.parse(auth);
            if (auth) {
                vm.token = auth.token;
            }
            this.getAllSettings()
        },
        methods: {
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
                            KNET_PAYMENT_PERCENT: parseFloat(data.payment_setting.KNET_PAYMENT_PERCENT),
                            KNET_PAYMENT_FIXED: parseFloat(data.payment_setting.KNET_PAYMENT_FIXED),
                            VISA_PAYMENT_PERCENT: parseFloat(data.payment_setting.VISA_PAYMENT_PERCENT),
                            VISA_PAYMENT_FIXED: parseFloat(data.payment_setting.VISA_PAYMENT_FIXED),
                            CARDS_PAYMENT_PERCENT: 1,
                            CARDS_PAYMENT_FIXED: 1,
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
                        let recipt_code = vm.$route.params.recipt_code;
                        let branch_id = vm.$route.params.branch_id;
                        vm.showInvoice(branch_id, recipt_code)
                    }
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }).catch((error) => {
                    vm.$root.$children[0].$refs.loader.show_loader = false;

                })
            },
            showInvoice(branch_id, recipt_code) {
                let vm = this;

                axios.get(apiServiesRoutes.BASE_URL + apiServiesRoutes.GET_SALE + `/${branch_id}` + `/${recipt_code}`,
                    {
                        headers: {
                            Authorization: "Bearer " + vm.token
                        },
                        params: {
                            lang: vm.lang,
                        }
                    }).then((resp) => {
                    let status = resp.data.status;
                    let data = resp.data.data;
                    if (status) {
                        console.log(data.sale.sale_details, "dddd");
                        vm.sale = data.sale;
                        vm.has_return = false
                        _.forEach(data.sale.sale_details[0].details, (item) => {
                            console.log(item)
                            _.forEach(item.returns, (returns) => {
                                vm.has_return = true
                            })
                        })

                    }
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                }).catch((err) => {
                    // vm.$router.push({'name': 'login'})
                    vm.$root.$children[0].$refs.loader.show_loader = false;
                })
            }, goHome() {

                this.$router.push({name: 'home'});
            }
        },
        components: {}
    }
</script>

<style>

    @import url('https://fonts.googleapis.com/css?family=Tajawal|El+Messiri|Reem+Kufi|Baloo+Bhaijaan|Lateef|Mada');


    .h1 {
        font: bold 100% sans-serif;
        letter-spacing: 0.5em;
        text-align: center;
        text-transform: uppercase;
    }

    /* table */

    table {
        font-size: 75%;
        table-layout: fixed;
        width: 100%;
    }

    table {
        border-collapse: separate;
        border-spacing: 2px;
    }

    th, td {
        border-width: 1px;
        padding: 0.5em;
        position: relative;
        text-align: left;
    }

    th, td {
        border-radius: 0.25em;
        border-style: solid;
    }

    th {
        background: #EEE;
        border-color: #BBB;
    }

    td {
        border-color: #DDD;
    }


    /* header */

    .header {
        margin: 0 0 3em;
    }

    .header:after {
        clear: both;
        content: "";
        display: table;
    }

    .header h1 {
        background: #000;
        border-radius: 0.25em;
        color: #FFF;
        margin: 0 0 1em;
        padding: 0.5em 0;
        font-size: 15px;
    }

    .header address {
        float: left;
        font-size: 75%;
        font-style: normal;
        line-height: 1.25;
        margin: 0 1em 1em 0;
    }

    .header address p {
        margin: 0 0 0.25em;
    }

    .header span, .header img {
        display: block;
        float: right;
    }

    .header span {
        margin: 0 0 1em 1em;
        max-height: 25%;
        max-width: 60%;
        position: relative;
    }

    .header img {
        max-height: 100%;
        max-width: 100%;
    }

    .header input {
        cursor: pointer;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        height: 100%;
        left: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }

    /* article */

    .article, .article address, .tables.meta, .tables.inventory {
        /*margin: 0 0 3em;*/
        margin-top: 5px;
    }

    .article:after {
        clear: both;
        content: "";
        display: table;
    }

    .article h1 {
        clip: rect(0 0 0 0);
        position: absolute;
    }

    .article address {
        float: left;
        font-size: 125%;
        font-weight: bold;
    }

    /* table meta & balance */

    .tables.meta, .tables.balance {
        float: left;
        width: 54%;
    }

    .tables.meta:after, .tables.balance:after {
        clear: both;
        content: "";
        display: table;
    }

    /* table meta */

    .tables.meta th {
        width: 50%;
    }

    .tables.meta td {
        width: 60%;
    }

    /* .tables items */

    .tables.inventory {
        clear: both;
        width: 100%;
    }

    .tables.inventory th {
        font-weight: bold;
        text-align: right;
    }

    .tables.inventory td:nth-child(1) {
        width: 26%;
    }

    .tables.inventory td:nth-child(2) {
        width: 38%;
    }

    .tables.inventory td:nth-child(3) {
        text-align: right;
        width: 12%;
    }

    .tables.inventory td:nth-child(4) {
        text-align: right;
        width: 12%;
    }

    .tables.inventory td:nth-child(5) {
        text-align: right;
        width: 12%;
    }

    /* .tables balance */

    .tables.balance th, .tables.balance td {
        width: 50%;
    }

    .tables.balance td {
        text-align: right;
    }

    /* aside */

    aside h1 {
        border: none;
        border-width: 0 0 1px;
        margin: 0 0 1em;
    }

    aside h1 {
        border-color: #999;
        border-bottom-style: solid;
    }

    /* javascript */

    .add, .cut {
        border-width: 1px;
        display: block;
        font-size: .8rem;
        padding: 0.25em 0.5em;
        float: left;
        text-align: center;
        width: 0.6em;
    }

    .add, .cut {
        background: #9AF;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        background-image: -moz-linear-gradient(#00ADEE 5%, #0078A5 100%);
        background-image: -webkit-linear-gradient(#00ADEE 5%, #0078A5 100%);
        border-radius: 0.5em;
        border-color: #0076A3;
        color: #FFF;
        cursor: pointer;
        font-weight: bold;
        text-shadow: 0 -1px 2px rgba(0, 0, 0, 0.333);
    }

    .add {
        margin: -2.5em 0 0;
    }

    .add:hover {
        background: #00ADEE;
    }

    .cut {
        opacity: 0;
        position: absolute;
        top: 0;
        left: -1.5em;
    }

    .cut {
        -webkit-transition: opacity 100ms ease-in;
    }

    tr:hover .cut {
        opacity: 1;
    }

    @media print {
        * {
            -webkit-print-color-adjust: exact;
        }

        html {
            background: none;
            padding: 0;
        }

        body {
            box-shadow: none;
            margin: 0;
        }

        span:empty {
            display: none;
        }

        .add, .cut {
            display: none;
        }
    }

    @media (min-width: 1200px) {
        .containers {
            max-width: 1040px;
        }
    }

    small {
        font-size: 10px !important;
    }

    @page {
        margin: 0;
    }
</style>
