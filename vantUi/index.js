/**
 * 按需引入vantUi
 */
import {
    Button, Form, Field, Icon, DatetimePicker, Popup,
    RadioGroup, Radio, Checkbox, CheckboxGroup, Lazyload, Swipe, SwipeItem, List, PullRefresh,
    Picker, Toast, Stepper
} from 'vant'

const vant = {
    install(Vue) {
        Vue.use(Button)
        Vue.use(Form)
        Vue.use(Field)
        Vue.use(Icon)
        Vue.use(DatetimePicker)
        Vue.use(Popup)
        Vue.use(RadioGroup)
        Vue.use(Radio)
        Vue.use(Checkbox)
        Vue.use(CheckboxGroup)
        Vue.use(Popup)
        Vue.use(Lazyload)
        Vue.use(Swipe)
        Vue.use(SwipeItem)
        Vue.use(List)
        Vue.use(PullRefresh)
        Vue.use(Picker)
        Vue.use(Toast)
        Vue.use(Stepper)
    }
}

export default vant
