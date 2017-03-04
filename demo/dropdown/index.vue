<style lang="scss" type="scss" rel="stylesheet/scss">

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  padding: 20px;
}
.dropdown-wrap {
  display: inline-block;
  font-size: 22px;
  line-height: 1.3;
  color: #323232;
  position: relative;
  cursor: pointer;
  .dropdown-title {
    position: relative;
    padding: 0 40px 0 20px;
    &.dropdown-title-hover {
      color: #4fae9b;
      &:after {
        border-color: #4fae9b transparent transparent;
        transform: rotate(-180deg);
      }
    }
    &:after {
      display: block;
      content: '';
      transition: transform .3s ease;
      transform-origin: center 1px;
      position: absolute;
      top: 50%;
      right: 0;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-color: #000 transparent transparent;
    }
    p {

    }
  }
  .dropdown-item-wrap {
    display: block;
    transition: all .3s cubic-bezier(.55,0,.1,1);
    opacity: 0;
    transform: scaleY(0);
    width: 300px;
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 50px;
    &.show-dropdown {
      opacity: 1;
      transform: scaleY(1);
    }
    >ul {
      list-style: none;
      border: 1px solid #eee;
      position: absolute;
      width: 300px;
      top: 50px;
      left: 0;
      .dropdown-item {
        padding: 10px 20px;
        display: flex;
        >div {
          flex: auto;
          .item-title{
            font-size: 24px;
            color: #000;
            font-weight: 700;
            line-height: 1.5;
          }
          .hot-place {
            color: #333;
          }
        }
        &:hover {
          background-color: #f7f7f7;
        }
        &:not(:last-child) {
          position: relative;
          &:after {
            display: block;
            width: calc( 100% - 40px);
            content: '';
            position: absolute;
            bottom: 0;
            left: 20px;
            border-bottom: 1px solid #eee;
          }
        }
        .arrow-wrap {
          width: 30px;
          min-width: 30px;
          flex-grow: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          .arrow {
            display: block;
            width: 12px;
            height: 12px;
            border: solid #867e7a;
            border-width: 0 1px 1px 0;
            -webkit-transform: rotate(45deg);
            transform: rotate(-45deg);
          }
        }
      }
      .triangle {
        position: absolute;
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;
        border-bottom: 8px solid #fff;
        top: -14px;
        left: 18px;
        &.triangle-active {
          border-bottom: 8px solid #f7f7f7;
        }
        &:after {
          content: "";
          position: absolute;
          top: -10px;
          left: -9px;
          z-index: -1;
          width: 0;
          height: 0;
          border-top: 9px solid transparent;
          border-right: 9px solid transparent;
          border-left: 9px solid transparent;
          border-bottom: 9px solid #eee;
        }
      }
    }
  }
}
</style>

<template>
  <div class="dropdown-wrap">
    <div :class="{'dropdown-title': true, 'dropdown-title-hover': visible }"><p>{{title}}</p></div>
    <div :class="{'dropdown-item-wrap': true, 'show-dropdown': visible }">
      <ul>
        <div :class="{'triangle': true, 'triangle-active': visibleTriangle}"></div>
        <li v-for="(index, item) in list" id="dropdown-item-{{index}}" class="dropdown-item" @click="handleClick($event, item)">
          <div>
            <p class="item-title">{{item.title}}</p>
            <p v-if="item.hot" class="hot-place">{{item.hot}}</p>
          </div>
          <div class="arrow-wrap"><span class="arrow"></span></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
//   标题
    title: {
      type: String,
      required: true
    },
//   /*列表数据
//    * {
//    *   title: @string,
//    *   hot: @string
//    * }
//    */
    list: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      visible: false,
      visibleTriangle: false
    }
  },
  ready () {
    this.initEvent()
  },
  methods: {
    initEvent () {
      this.$el.addEventListener('mouseenter', this.show)
      this.$el.addEventListener('mouseleave', this.hide)
      document.getElementById('dropdown-item-0').addEventListener('mouseenter', this.activeTriangle)
      document.getElementById('dropdown-item-0').addEventListener('mouseleave', this.deactiveTriangle)
    },
    show () {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.visible = true
      }, 250)
    },
    hide () {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.visible = false
      }, 150)
    },
    handleClick (e, item) {
      window.alert(`点击了： ${item.title}\n点击元素的innerHTML：${e.target.innerHTML}`)
    },
    activeTriangle () {
      this.visibleTriangle = true
    },
    deactiveTriangle () {
      this.visibleTriangle = false
    }
  }
}
</script>
