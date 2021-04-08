/**
 * 工具函数
 */

/**
 * 序列化data
 */
function serialization(data) {
    let arr = []
    for (let i in data) {
        arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]))
    }
    return arr.join('&')
}

/**
 * 函数防抖 (只执行最后一次点击)
 */
function debounce(handler, delay) {
    let timer = null

    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function () {
            handler.apply(this, args)
        }, delay)
    }
}
/**
 * 函数节流
 */
function throttle(handler, interval = 1000) {
    let starTime = 0

    return function (...args) {
        let endTime = +new Date()

        if (endTime - starTime >= interval) {
            starTime = endTime
            handler.apply(this, args)
        }
    }
}

export default {
    serialization,
    debounce,
    throttle
}
