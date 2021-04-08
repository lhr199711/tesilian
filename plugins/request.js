export default ({ app: { $axios } }, inject) => {
    const requestList = {}
    const methods = ['get', 'post']
    methods.forEach((method) => {
        requestList[method] = function (url, data) {
            return $axios({ method, url, data })
        }
    })
    inject('request', requestList)
}
