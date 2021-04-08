<template>
    <div class="container">
        <Vheader>
            <template #left>
                <div class="title-name">
                    <img class="img" src="../../assets/icon/img/visitor.png" alt="">
                    访客详情
                </div>
            </template>
        </Vheader>
        <div class="visitor-msg">
            <div class="item">
                <span class="name">访问团名称</span><span class="v">{{ data.name }}</span>
            </div>
            <div class="item">
                <span class="name">访客属性</span><span class="v">{{ data.dictVO.value }}</span>
            </div>
            <div class="item">
                <span class="name">人数</span><span class="v">{{ data.peopleNum }}</span>
            </div>
            <div class="item">
                <span class="name">时间</span><span class="v">{{ date }}  {{ data.startTime }}至{{ data.endTime }}</span>
            </div>

            <div class="item">
                <span class="name">主要人员信息</span><span class="v">
                    <span v-for="(person, index_person) in data.persons" :key="index_person" class="person">
                        {{ person.name }}<img v-if="person" class="icon" :src="person.sex === 1? require('../../assets/icon/img/man.png'):require('../../assets/icon/img/woman.png')" alt="">
                    </span>
                </span>
            </div>
            <div class="item">
                <span class="name">车辆</span>
                <span class="v">
                    <span v-for="(car, index_car) in data.vehicles" :key="index_car" class="tag">{{ car }}</span>
                </span>
            </div>
            <div class="item">
                <span class="name">参观路径</span><span class="v">{{ data.routeVO.name }}</span>
            </div>
            <div class="item">
                <span class="name">预约人</span><span class="v">{{ data.appointPeople }}</span>
            </div>
            <div class="line" />
            <div class="item">
                <span class="name">会议</span><span class="v">
                    <span v-for="(din, index_din) in data.meetingVOS" :key="index_din" class="mr40">{{ din.meetRoom }}</span>
                </span>
            </div>
            <div class="item">
                <span class="name">纪念品</span><span class="v">{{ data.isSouvenir === 1?'有':'无' }}</span>
            </div>
            <div class="item">
                <span class="name">是否用餐</span>
                <span v-if="data.isDining === 1" class="v">
                    是（{{ data.halal?'清真，':'' }}{{ data.remark }}）
                </span>
                <span v-else class="v">否</span>
            </div>
        </div>
        <img v-if="data.state === 2" class="cancel-png" src="../../assets/icon/img/cancel.png" alt="">
        <div v-if="data.state === 2" class="foot">
            <div class="button button_cancel" @click="close">
                关闭
            </div>
            <div class="button button_confirm" @click="handleAppointment('add')">
                再次预约
            </div>
        </div>
        <div v-else class="foot">
            <div class="button button_cancel" @click="cancel">
                取消预约
            </div>
            <div class="button button_confirm" @click="handleAppointment('edit')">
                编辑预约
            </div>
        </div>
</div>
</template>
<script>
    import Vheader from '~/components/layout/Vheader'
    export default {
        components: {
            Vheader
        },
        async asyncData({ app, params, query }) {
            const data = await app.$api.getAppointmentDetail(params)
            return {
                data
            }
        },
        data() {
            return {
                data: ''
            }
        },
        computed: {
            date() {
                let [year, month, day] = this.data.visitDate.split('-')
                return `${year}年${month}月${day}日`
            }
        },
        mounted() {
            //

        },
        methods: {
            close() {
                // 调用安卓方法返回
                window.androidFn.CloseWebviewPopup()
            },
            cancel() {
                // 调用安卓方法取消预约
                let obj = {
                    date: `${this.date} ${this.data.startTime}-${this.data.endTime}`,
                    name: this.data.name,
                    id: this.data.id
                }
                window.androidFn.CancellationAppointment(JSON.stringify(obj))
            },
            handleAppointment(type) {
                if (type === 'edit') {
                    this.$router.replace({ path: `/appointment/${this.data.id}` })
                } else if (type === 'add') {
                    this.$router.replace({ path: '/appointment' })
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .container{
        // background: rgba(0,0,0,0.4);
        box-shadow: 0 0 20px #fff;
        width: 100vw;
        height: 100vh;
        color: #fff;
        position: relative;
    }
    .cancel-png{
        position: absolute;
        top: 14.5%;
        right: 7%;
        width: 196px;
        height: 196px;
    }
    .visitor-msg{
        padding: 58px 160px;
        height: 78vh;
        overflow-y: scroll;
        .line{
            margin: 12px 0;
        }
        .item{
            padding: 26px 0;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .name{
                color: rgba(255, 255, 255, 0.6);
                min-width: 192px;
                max-width: 192px;
                font-size: 32px;
                margin-right: 56px;
                text-align: right;
            }
            .v{
                flex: 1;
                .tag{
                    background: #3c3f41;
                    border-radius: 8px;
                    font-size: 28px;
                    text-align: center;
                    padding: 8px 39px;
                    display: inline-block;
                    margin-right: 24px;
                }
                .person{
                    margin-right: 42px;
                    display: inline-flex;
                    align-items: center;
                    .icon{
                        width: 34px;
                        padding-left: 5px;
                    }
                }
            }

        }

    }
    .mr40{margin-right: 40px;}
    .foot{
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
