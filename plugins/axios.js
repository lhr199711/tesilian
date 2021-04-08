import { Toast, Dialog } from 'vant'
import { cacheAdapterEnhancer } from 'axios-extensions'
import LRUCache from 'lru-cache' // 自定义缓存配置

const tip = (msg) => {
    Toast(msg)
}

export default ({ app: { $axios, $cookies }, router, store, redirect, error }) => {
    // redirect 路由重定向
    if (process.server) {
        // $axios.defaults.baseURL = 'http://127.0.0.1:8090/'
        $axios.defaults.baseURL = process.env.NODE_ENV !== 'production' ? 'http://192.168.111.120:8090' : 'https://正式'
    } else {
        $axios.defaults.baseURL = process.env.API_URL
    }

    let defaultAdapter = $axios.defaults.adapter
    let cacheCfg = new LRUCache({
        maxAge: 1000 * 30, // 有效期10s
        max: 1000 // 最大缓存数量
    })

    // 在api请求时添加useCache标志即可实现接口缓存
    $axios.defaults.adapter = cacheAdapterEnhancer(
        defaultAdapter,
        { enabledByDefault: false, cacheFlag: 'useCache', defaultCache: cacheCfg }
    )

    // 请求request拦截,请求前最后的配置
    $axios.interceptors.request.use((config) => {
        const token = $cookies.get('token')
        console.log(token)
        token && (config.headers.Authorization = `Bearer ${token}`)

        return config
    }, (err) => {
        return Promise.reject(err)
    })

    // 响应response拦截
    $axios.interceptors.response.use((response) => {
        // 请求成功
        // 1. 根据自己项目需求定制自己的拦截
        // 2. 然后返回数据

        if (response.status === 200) {
            if (response.data.code === 0) {
                // 正常
                if (response.data.data) {
                    return response.data.data
                } else {
                    return response.data
                }
            } else {
                tip(response.data.msg)
                return Promise.reject(response.data.msg)
            }
        } else if (response.status === 401) {
            // 调用安卓方法到安卓登录页
        } else {
            Dialog.alert({
                title: '提示：',
                message: response.statusText ? response.statusText : '请求失败~',
                confirmButtonColor: '#4D9BFF',
                theme: 'round-button'
            })
        }
    }, (err) => {
        // 请求失败
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    tip(err.response.data.error)
                    break
                default:
                    console.error(`resp没有拦截到错误：${err.response.data.error}`)
                    redirect('/404')
                    break
            }
            return Promise.reject(err)
        } else if (process.client && !window.navigator.onLine) {
            tip('网络出了点问题，请连接后再试~')
        } else {
            return Promise.reject(err)
        }
    })
}
