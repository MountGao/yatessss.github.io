<template>
  <form class="clickable-div" id="upload-form" enctype="multipart/form-data" v-el="image" @click="fileUpload()">
    <input class="clickable-div" type="text" name="mchid" :value="token" @click.stop onclick=""> <br />
    <input class="clickable-div" type="file" id="shopphoto" name="shopphoto" @click.stop onclick=""/> <br />
    <input class="clickable-div" type="file" id="goodsphoto" name="goodsphoto" @click.stop onclick=""/> <br />
    <input class="clickable-div" type="file" id="idcardfront" name="idcardfront" @click.stop onclick=""/> <br />
    <input class="clickable-div" type="file" id="idcardback" name="idcardback" @click.stop onclick=""/> <br />
    <input class="clickable-div" type="file" id="licensephoto1" name="licensephoto1" @click.stop onclick=""/> <br />
    <input class="clickable-div" type="file" id="orgphoto" name="orgphoto" @click.stop/> <br />
    <input class="clickable-div" type="file" id="foodcirculationpermit" name="foodcirculationpermit" @click.stop/> <br />
    <input class="clickable-div" type="file" id="foodhygienelicense" name="foodhygienelicense" @click.stop/> <br />
    <input class="clickable-div" type="file" id="foodservicelicense" name="foodservicelicense" @click.stop/> <br />
    <input type="button" value="Upload" />
  </form>

  <div id="index-page">
    <h1>为了更好地使用钱方好近的支付服务，请补充缺失资料，其中图片的文字需清晰可辨认。</h1>
    <div class="select-box">
      <div class="select-sub-box" @click="shopDisplay">
        <span class="select-title">店铺类型</span>
        <div class="select-btn">
          <span>{{shopText}}</span>
          <i></i>
        </div>
      </div>
      <div class="select-sub-box" @click="industryDisplay">
        <span class="select-title">所属行业</span>
        <div class="select-btn">
          <span>{{industryText}}</span>
          <i></i>
        </div>
      </div>
    </div>

    <div class="actionsheet_wrap">
      <div class="weui_mask_transition" v-show="shopVisible" @click="shopDisplay"></div>
      <div :class="{'weui_actionsheet_toggle': shopVisible, 'weui_actionsheet': true}" >
        <div class="weui_actionsheet_menu">
          <div class="weui_actionsheet_cell" v-for="(index, item) in shops" @click="changeShop(item, index),pushTypeData()" >{{item}}</div>
        </div>
      </div>
    </div>

    <div class="actionsheet_wrap">
      <div class="weui_mask_transition" v-show="industryVisible" @click="industryDisplay"></div>
      <div :class="{'weui_actionsheet_toggle': industryVisible, 'weui_actionsheet': true}" >
        <div class="weui_actionsheet_menu">
          <div class="weui_actionsheet_cell" v-for="(index, item) in industries" @click="changeIndustry(item, index),pushTypeData()" >{{item}}</div>
        </div>
      </div>
    </div>

    <upload v-for="(index, item) in result_data" :name="item.name" :name-cn="item.nameCn" :bg-url="item.bgUrl" :img-url="item.imgUrl" :tip="item.tip" :is-upload="item.isUpload" :com-title="item.comTitle"> </upload>

    <div :class="{ 'submit-btn': true, 'submit-btn-true': isSubmit, 'submit-btn-false': !isSubmit }" @click="submitFunc">提交</div>

    <loading :visible="loading"> </loading>

    <alert :alert-title="alertTitle" :alert-tip="alertTip" :alert-visible.sync="alertVisible"></alert>
  </div>

</template>
<style lang="scss" rel="stylesheet/scss">
  form{
    display: none;
  }
  input{
    cursor: pointer;
  }
  .clickable-div{
    cursor: pointer;
  }
  #index-page{
    width: 750px;
    padding: 30px;
    >h1{
      color: #8A8C92;
      font-size: 34px;
    }
    .select-box{
      width: 690px;
      margin: 58px auto 30px auto;
      padding: 0 30px;
      background: #ffffff;
      border-radius: 10px;
      .select-sub-box{
        height: 95px;
        .select-title{
          color: #2F323A;
          font-size: 34px;
          line-height: 95px;
        }
        .select-btn{
          position: relative;
          float: right;
          line-height: 95px;
          clear: both;
          >span{
            color: #8A8C92;
            font-size: 30px;
            margin-right: 40px;
          }
          >i{
            position: absolute;
            top: 35px;
            right: 0px;
            display: block;
            width: 25px;
            height: 25px;
            border: solid #A7A9AE;
            border-width: 2px 2px 0 0; /*px*/
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
          }
        }
      }
      >div:first-child{
        border-bottom: 2px solid #EFEFEF; /*px*/
      }
    }
    .submit-btn{
      margin: 40px auto 20px auto;
      width: 690px;
      height: 90px;
      text-align: center;
      line-height: 90px;
      font-size: 34px;
      color: #ffffff;
    }
    .submit-btn-true{
      background: #fd5359;
    }
    .submit-btn-false{
      background: #A7A9AE;
    }
  }

  .weui_mask_transition {
    background: rgba(0,0,0,.6);
    -webkit-transition: background .3s;
    transition: background .3s;
  }
  .weui_mask, .weui_mask_transition, .weui_mask_transparent {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .weui_actionsheet {
    position: fixed;
    left: 0;
    bottom: 0;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 2;
    width: 100%;
    background-color: #efeff4;
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s,-webkit-transform .3s;
  }
  .weui_actionsheet_menu{
    padding: 10px 0;
  }
  .weui_actionsheet_toggle {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  .weui_actionsheet_cell {
    position: relative;
    height: 85px;
    line-height: 85px;
    text-align: center;
    color: #606470;
    font-size: 35px;
  }
  .weui_actionsheet_cell:first-child:before {
    display: none;
  }
  .weui_actionsheet_cell:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 2px;
    border-top: 2px solid #d9d9d9; /*px*/
    color: #d9d9d9;
    -webkit-transform-origin: 0 0;
    transorm-origin: 0 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }
</style>
<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import upload from './upload.vue'
  import loading from './loading.vue'
  import alert from './alert.vue'

  Vue.use(VueResource)
  export default {
    components: {
      upload,
      loading,
      alert
    },
    data () {
      return {
        token: '',
        industryVisible: false,
        shopVisible: false,
        shop: null,
        industry: null,
        shops: ['个体户', '企业'],
        industries: ['餐饮店', '便利店', '食品店', '其他店铺'],
        result_1: null,
        result_2: null,
        init_data: [

//          0
          {
            name: 'shopphoto',
            nameCn: '店铺门头照片',
            bgUrl: {
              backgroundImage: "url('http://near.m1img.com/op_upload/62/146502860635.jpg')",
              backgroundSize: '100% 100%'
            },
            imgUrl: '',
            tip: '',
            isUpload: false
          },

//          1
          {
            name: 'goodsphoto',
            nameCn: '店铺内景照片',
            bgUrl: {
              backgroundImage: "url('http://near.m1img.com/op_upload/62/146502865726.jpg')",
              backgroundSize: '100% 100%'
            },
            imgUrl: '',
            tip: '',
            isUpload: false
          },

//          2
          {
            name: 'idcardfront',
            nameCn: '法人身份证正面照片',
            bgUrl: {
              backgroundImage: "url('http://near.m1img.com/op_upload/62/146502517984.jpg')",
              backgroundSize: '100% 100%'
            },
            imgUrl: '',
            tip: '必须使用有效期内二代身份证，身份证号码及头像清晰可见，商户年龄在18—70周岁范围内，且信息需与清算银行持卡人一致',
            isUpload: false,
            comTitle: '法人信息'
          },

//          3
          {
            name: 'idcardback',
            nameCn: '法人身份证反面照片',
            bgUrl: {
              backgroundImage: "url('http://near.m1img.com/op_upload/62/146502576263.jpg')",
              backgroundSize: '100% 100%'
            },
            imgUrl: '',
            tip: '',
            isUpload: false
          },

//          4
          {
            name: 'licensephoto1',
            nameCn: '营业执照',
            bgUrl: {
              backgroundImage: "url('http://near.m1img.com/op_upload/62/146502887556.jpg')",
              backgroundSize: '100% 100%'
            },
            imgUrl: '',
            tip: '清晰彩色原件扫描件或者数码照片，如复印件需要加盖公章。经营者姓名需要与用户真实姓名一致，确保信息展示完整、清晰，并真实有效',
            isUpload: false,
            comTitle: '上传凭证信息'
          },

//          5
          {
            name: 'orgphoto',
            nameCn: '组织机构代码证',
            bgUrl: {
              backgroundImage: "url('http://near.m1img.com/op_upload/62/146502889281.jpg')",
              backgroundSize: '100% 100%'
            },
            imgUrl: '',
            tip: '',
            isUpload: false
          },

//          6
          {
            name: 'foodcirculationpermit',
            nameCn: '食品流通许可证',
            bgUrl: {
              backgroundImage: "url('http://near.m1img.com/op_upload/62/146502880429.jpg')",
              backgroundSize: '100% 100%'
            },
            imgUrl: '',
            tip: '若经营类目含食品类，则需要补充《食品流通许可证》或《食品卫生许可证》',
            isUpload: false
          },
//          7
          {
            name: 'foodhygienelicense',
            nameCn: '食品卫生许可证',
            bgUrl: {
              backgroundImage: "url('http://near.m1img.com/op_upload/62/146502884576.jpg')",
              backgroundSize: '100% 100%'
            },
            imgUrl: '',
            tip: '若经营类目含食品类，则需要补充《食品流通许可证》或《食品卫生许可证》',
            isUpload: false
          },
//          8
          {
            name: 'foodservicelicense',
            nameCn: '餐饮服务许可证',
            bgUrl: {
              backgroundImage: "url('http://near.m1img.com/op_upload/62/14650287162.jpg')",
              backgroundSize: '100% 100%'
            },
            imgUrl: '',
            tip: '《餐饮服务许可证》或下属门店的《餐饮服务许可证》和申请公司的从属关系证明',
            isUpload: false
          }
        ],
        result_data: [],
        isSubmit: 0,
        loading: false,
        alertTitle: '好近提醒您',
        alertTip: '',
        alertVisible: false

      }
    },
    computed: {
      shopText () {
        return this.shop ? this.shop : '请选择'
      },
      industryText () {
        return this.industry ? this.industry : '请选择'
      }
    },
    created: function () {
      window.location.replace(window.location.href)
      this.getData()
    },
    methods: {
      getData () {
        let _this = this
        Vue.http.options.headers = {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
        }
        Vue.http.options.xhr = {
          withCredentials: true
        }
        Vue.http.options.emulateJSON = true
        Vue.http({
          url: 'https://o.qfpay.com/mchnt/user/voucher?format=jsonp',
          method: 'JSONP'
        }).then(function (res) {
          console.log(res.data.respcd)
          if (res.data.respcd === '0000') {
            _this.token = res.data.data.token
            _this.compareArr(res.data.data.voucher_list, _this.init_data)
          } else if (res.data.respcd === '2002') {
            window.location.href = 'https://qfpay.com/mobile/account/login?next=http://m.haojin.in/v2/supplement-information.html'
          } else {
            window.alert(res.data.data.respmsg)
          }
          _this.pushBasicData()
        })
      },
      industryDisplay () {
        this.industryVisible = !this.industryVisible
      },
      shopDisplay () {
        this.shopVisible = !this.shopVisible
      },
      changeShop (e, index) {
        this.shop = e
        this.result_1 = index
        this.shopVisible = !this.shopVisible
//        console.log(this.result_1)
      },
      changeIndustry (e, index) {
        this.industry = e
        this.result_2 = index
        this.industryVisible = !this.industryVisible
//        console.log(this.result_2)
      },
      compareArr (oldArr, newArr) {
        var _this = this
        var _oldArr = oldArr
        var _newArr = newArr
        for (let i = 0, len1 = _newArr.length; i < len1; i++) {
          for (let j = 0, len2 = _oldArr.length; j < len2; j++) {
            if (_newArr[i].name === _oldArr[j].name) {
              let initData = _this.init_data
              initData[i].bgUrl = {
                backgroundImage: "url('http://near.m1img.com/op_upload/62/146520417256.png')",
                backgroundSize: '100% 100%'
              }
              initData[i].isUpload = true
              _this.$set('init_data', initData)
            }
          }
        }
      },
      pushBasicData () {
        let _this = this
//        var arr = []
        for (let i = 0; i < 5; i++) {
          _this.result_data.push(_this.init_data[i])
        }
//        _this.$set('result_data', arr)
      },
      pushTypeData () {
        let _this = this
        var typeNum
        if (_this.result_1 != null && _this.result_2 != null) {
          typeNum = '' + _this.result_1 + _this.result_2
//          判断是否选择了图片
          _this.isSubmitType()
        }
//        console.log(_this.result_data)
        switch (typeNum) {
          case '00':
            return (function () {
              _this.result_data = []
              _this.pushBasicData()
              _this.result_data.push(_this.init_data[8])
//              console.log('00')
            }())
          case '01':
          case '02':
            return (function () {
              _this.result_data = []
              _this.pushBasicData()
              _this.result_data.push(_this.init_data[6], _this.init_data[7])
//              console.log('01,02')
            }())
          case '03':
            return (function () {
              _this.result_data = []
              _this.pushBasicData()
              _this.result_data.push(_this.init_data[6], _this.init_data[7], _this.init_data[8])
//              console.log('03')
            }())
          case '10':
            return (function () {
              _this.result_data = []
              _this.pushBasicData()
              _this.result_data.push(_this.init_data[5], _this.init_data[8])
//              console.log('10')
            }())
          case '11':
          case '12':
            return (function () {
              _this.result_data = []
              _this.pushBasicData()
              _this.result_data.push(_this.init_data[5], _this.init_data[6], _this.init_data[7])
//              console.log('11,12')
            }())
          case '13':
            return (function () {
              _this.result_data = []
              _this.pushBasicData()
              _this.result_data.push(_this.init_data[5], _this.init_data[6], _this.init_data[7], _this.init_data[8])
//              console.log('13')
            }())
          default:
            return (function () {
              _this.result_data = []
              _this.pushBasicData()
            }())
        }
      },
      fileUpload () {
        let _this = this
//        console.log('触发上传!')
        var form = document.getElementById('upload-form')
        var formData = new window.FormData(form)
        this.loading = true
        Vue.http({
          url: 'https://openapi-test.qfpay.com/mch/v1/uploadcert?format=cors',
          method: 'post',
          data: formData,
          cache: false,
          contentType: false,
          processData: false
        }).then(function () {
          _this.loading = false
          window.location.reload()
        })
      },
      submitFunc () {
        let _this = this
        if (_this.isSubmit === 0) {
          _this.changeAlert('您还没有选择店铺类型和所属行业哦~')
        } else if (_this.isSubmit === 2) {
          _this.changeAlert('您已经上传了所有图片~')
        } else {
          _this.fileUpload()
        }
      },
      isSubmitType () {
        let _this = this
//        let inputArr = document.querySelectorAll('input[type=file]')
        for (let i = 0, len = _this.init_data.length; i < len; i++) {
          if (_this.init_data[i].isUpload === false) {
            _this.isSubmit = 1
            return
          }
          _this.isSubmit = 2
        }
      },
      changeAlert (e) {
        this.alertVisible = true
        this.alertTip = e
      }
    }
  }
</script>
