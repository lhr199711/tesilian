/**
 * 使用svg图标
 */
import Vue from 'vue'
import SvgIcon from '@/components/svgIcon.vue' // svg component

Vue.component('svg-icon', SvgIcon)
const req = require.context('@/assets/icon/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
