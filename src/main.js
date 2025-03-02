import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone, faLocationDot, faXmark, faCircleArrowLeft, faCircleArrowRight, faSpinner, faCheck, faEllipsis, faPlus, faClose, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Notifications from 'vue-notification'

library.add(faPhone, faLocationDot, faXmark, faCircleArrowLeft, faCircleArrowRight, faSpinner, faCheck, faEllipsis, faPlus, faClose, faEdit, faTrash)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
