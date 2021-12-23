import Vue from "vue";
import App from "./App.vue"
import store from './store'

// плагины
import './plugins/bootstrap/index'
import './plugins/font-awesome/index'
import './plugins/moment/index'
import './plugins/toast/index'

Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App),
}).$mount("#app")
