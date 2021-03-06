/** 批量注册公用组件 */
export default {
    install(Vue) {
        const components = require.context('~/components/common', false, /\.vue$/)
        components.keys().forEach((path) => {
            const fileName = path.replace(/(.*\/)*([^.]+).*/ig, '$2') // 获取组件文件名
            Vue.component(fileName, components(path).default || components(path))
        })
    }
}
