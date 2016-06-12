/**
 * Created by yatessss on 16/6/3.
 */
import 'lib-flexible'
import FastClick from 'fastclick'
window.FastClick = FastClick
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
Vue.use(VueResource)
Vue.use(VueRouter)
import '../../filters/index'

import App from './main'
import List from './list'
import Details from './details'

/* eslint-disable no-new */

let router = new VueRouter()

router.map({
  '': {
    component: List
  },
  '/details': {
    component: Details
  }
})

router.start(App, '#content')
