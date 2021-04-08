/**
 * 统一管理 api
 */
import utils from '~/utils/utils'

export default ({ app: { $request }, store }, inject) => {
    inject('api', {
        /**
         * 添加访客预约
         */
        addAppointment(data) {
            return $request.post('/api/pad/reception/appoint/add', data)
        },
        /**
         * 修改预约数据
         */
        editAppoint(data) {
            return $request.post('/api/pad/reception/appoint/update', data)
        },
        /**
         * 历史预约列表
         */
        getAppointmentList(data) {
            return $request.get(`/api/pad/reception/appoint/getHistory?${utils.serialization(data)}`)
        },
        /**
         *获取预约详情
         */
        getAppointmentDetail(data) {
            return $request.get(`/api/pad/reception/appoint/getById?${utils.serialization(data)}`)
        },
        /**
         * 查询餐厅
         */
        getRestaurant() {
            return $request.get('/api/pad/reception/appoint/getRestaurant')
        },
        /**
         * 获取功能或商品的简介
         */
        getGoodsIntro(data) {
            return $request.get(`/api/pad/reception/thing/brief?${utils.serialization(data)}`)
        },
        /**
         * 获取功能或商品的详情
         */
        getGoodsDetail(data) {
            return $request.get(`/api/pad/reception/thing/Details/${data.id}`)
        },
        /**
         * /pad/reception/appoint/getDict 查询访客属性
         */
        getDict() {
            return $request.get('/api/pad/reception/appoint/getDict')
        },
        /**
         * 查询路线信息
         */
        getRoute() {
            return $request.get('/api/pad/reception/appoint/getRoute')
        },
        /**
         * 查询会议室
         */
        getMeeting() {
            return $request.get('/api/pad/reception/appoint/getMeeting')
        },
        /**
         * 添加、取消喜欢
         */
        modifyLike(data) {
            return $request.post('/api/pad/reception/appoint/favorite', data)
        },
        /*
         * 控制器指令
         */
        sendControllerKey(data) {
            return $request.post('/api/pad/reception/cmd/sendKey', data)
        }
    })
}
