<template>
  <div class="com-box">
    <h3 v-if="comTitle" class="com-title">{{comTitle}}</h3>
    <div class="upload-box">
      <h2>{{nameCn}}</h2>
      <div class="img-box" id="{{nameId}}" :style="bgUrl">
        <!--<img :src="imgUrl">-->
      </div>
      <p class="tip" v-if="tip">{{tip}}</p>
      <!--<div v-if="isUpload" class="upload-btn upload-true">图片已提交</div>-->
      <div v-if="!isUpload" class="upload-btn upload-false clickable-div" onclick="document.querySelector('input').click()" @click="inputBtn(name, $event)">上传图片</div>
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  .clickable-div{
    cursor: pointer;
  }
  .com-box{
    .com-title{
      font-size: 30px;
      color: #8A8C92;
      margin: 0 0 0 30px;
    }
  }
  .upload-box{
    width: 690px;
    margin: 30px auto;
    background: #ffffff;
    border-radius: 10px;
    padding: 20px 0;
    h2{
      margin: 0 0 0 30px;
      color: #2F323A;
      font-size: 30px;
    }
    .img-box{
      height: 340px;
      margin-top: 27px;
      margin-bottom: 16px;
      overflow: hidden;
      >div{
        height: 102%;
        width: 100%;
        position: relative;
        top: -2px; /*px*/
        background: #fff no-repeat center;
        background-size: contain;
      }
      img{
        height: 340px;
        width: 100%;
      }
    }
    .tip{
      margin: 0;
      padding: 0 20px;
      text-align: justify;
      color: #979797;
      font-size: 26px;
    }
    .upload-btn{
      width: 310px;
      height: 70px;
      margin: 42px auto 0 auto;
      border-radius: 6px;
      text-align: center;
      line-height: 70px;
      font-size: 30px;
    }
    .upload-true{
      border: 2px solid #A7A9AE; /*px*/
      color: #A7A9AE;
    }
    .upload-false{
      border: 2px solid #fd5359; /*px*/
      color: #fd5359;
    }
  }
</style>
<script>
//  import lrz from 'lrz'

  export default{
    props: ['name', 'nameCn', 'imgUrl', 'isUpload', 'tip', 'bgUrl', 'comTitle'],
    data () {
      return {
        msg: 'hello vue'
      }
    },
    computed: {
      nameId () {
        return this.name + 'content'
      }
    },
    methods: {
      inputBtn (name, event) {
        let _this = this
        let select = document.getElementById(name)
        let preview = document.getElementById(_this.nameId)
        select.click()
        select.addEventListener('change', handleFile, false)
        function handleFile () {
          window.URL = window.URL || window.webkitURL
          var sUserAgent = navigator.userAgent.toLowerCase()
          var selectedFile = select.files[0]

          if (sUserAgent.match(/android/i) === 'android') {
            let img = new window.Image()
            img.src = window.URL.createObjectURL(selectedFile)
            preview.innerHTML = ''
            preview.appendChild(img)

            let reader = new window.FileReader()
            reader.onload = function (e) { img.src = e.target.result }
            reader.readAsDataURL(selectedFile)
          } else {
//            判断文件类型是否为图片
            var imageType = /image.*/

            if (!selectedFile.type.match(imageType)) {
              return false
            }
//            let size = selectedFile.size
            let div = document.createElement('div')
            div.innerHTML = ''
            preview.innerHTML = ''
            preview.appendChild(div)

            let reader = new window.FileReader()
            reader.onload = function (e) {
              let result = e.target.result
              div.style.backgroundImage = 'url(' + result + ')'
            }
            reader.readAsDataURL(selectedFile)
          }
        }
      }
    },
    components: {
    }
  }
</script>


