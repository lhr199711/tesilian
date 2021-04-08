import Vue from 'vue'
import { Dialog } from 'vant'
import componentsInstall from '@/components/componentsInstall' // 批量注册公用组件
import vant from '~/vantui/index'
import utils from '~/utils/utils' // 引入工具函数

Vue.use(vant)
Vue.use(componentsInstall)

export default (context, inject) => {
    inject('utils', utils)
    inject('dialog', Dialog)
}
