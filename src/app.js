/* 启动文件 */
import 'es6-shim'
import Vue from 'vue/dist/vue.js'
import router from '@/routes/'
import App from '@/components/App'
import store from './store'


// 挂载到 DOM，自此外部就可通过 router.app 访问到根组件
// router.start(App, '#app')
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});

// === 以下是 Webpack 处理其他 assets 的测试，取消注释即可进行测试 === //
/* 处理 less / sass */
// import '@/assets/less/normalize.less'
// import '@/assets/scss/normalize.scss'
import '@/assets/less/style.less'

/* 处理 img，小于 10KB 的转为 base64，否则使用 URL */
// import base64 from '@/assets/img/smaller.png'
// import url from '@/assets/img/larger.png'

// appendImgToBody(base64)
// appendImgToBody(url)

// function appendImgToBody(content) {
//   const img = document.createElement('img')
//   img.src = content
//   document.body.appendChild(img)
// }
