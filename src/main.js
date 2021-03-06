// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
const setHtmlFontSize = () => {
  const htmlDom = document.getElementsByTagName('html')[0];
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  htmlDom.style.fontSize = `${htmlWidth / 19.8}px`;
};
window.onresize = setHtmlFontSize;
setHtmlFontSize();

/* eslint-disable no-new */
Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
