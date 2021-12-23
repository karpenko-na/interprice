// https://momentjs.com/
import Vue from 'vue'
import VueMoment from 'vue-moment'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
//import 'moment/locale/ru'

momentDurationFormatSetup(moment)

Vue.use(VueMoment, { moment }) // параметр нужен для совместимости с загрузчиком локалей

//Vue.moment.locale('ru')