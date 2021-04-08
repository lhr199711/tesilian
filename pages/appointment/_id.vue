<template>
    <div class="container">
        <Vheader>
            <template #left>
                <div class="title-name">
                    <img class="img" src="../../assets/icon/img/visitor.png" alt="">
                    访客预约
                </div>
            </template>
        </Vheader>
        <van-form label-align="right" validate-first :submit-on-enter="false" @submit="onSubmit">
            <div class="form-container">
                <div class="v-form">
                    <van-field
                        v-model="form.name"
                        label="访问团名称"
                        class="l-input"
                        required
                        :rules="[{ required: true, message: '请填写访问团名称' }]"
                    />
                </div>
                <div class="line-inputs">
                    <div class="title must">
                        访客属性
                    </div>
                    <Vselect :select-value="dict" :selected-value="form.visitorAttributeId" show-name="value" :error="selectErrorShow" @choose="changeDict" />
                </div>
                <div class="error-pos v-form">
                    <van-field
                        v-model="form.peopleNum"
                        type="number"
                        label="人数"
                        class="m-input"
                        required
                        :rules="[{ required: true, message: '请填写人数' }]"
                    />
                </div>
                <div class="time">
                    <div class="error-pos v-form">
                        <van-field
                            :value="showDate"
                            type="number"
                            class="m-input"
                            label="时间"
                            required
                            :readonly="true"
                            :rules="[{ required: true, message: '请填写年月日' }]"
                            @click="yearShow = true"
                        >
                            <template #button>
                                <img class="form-icon" src="../../assets/icon/img/date.png" alt="">
                            </template>
                        </van-field>
                    </div>
                    <div class="v-form">
                        <van-field
                            :value="form.startTime"
                            type="number"
                            class="s-input pl1"
                            :readonly="true"
                            :rules="[{ required: true, message: '请填写开始时间' }]"
                            @click="timePopupShow('start')"
                        >
                            <template #button>
                                <img class="form-icon" src="../../assets/icon/img/time.png" alt="">
                            </template>
                        </van-field>
                    </div>
                    <div class="t">
                        至
                    </div>
                    <div class="v-form">
                        <van-field
                            :value="form.endTime"
                            type="number"
                            class="s-input"
                            :readonly="true"
                            :rules="[{ required: true, message: '请填写结束时间' }]"
                            @click="timePopupShow('end')"
                        >
                            <template #button>
                                <img class="form-icon" src="../../assets/icon/img/time.png" alt="">
                            </template>
                        </van-field>
                    </div>
                </div>

                <div class="line-inputs">
                    <div class="title">
                        主要人员信息
                    </div>
                    <div class="msg">
                        <transition-group name="list">
                            <div v-for="(pel, index) in person" :key="pel.sex" class="msg-item">
                                <div class="v-form"><van-field v-model="pel.name" placeholder="姓名" class="m-input" /></div>
                                <div class="v-form"><van-field v-model="pel.sex" :readonly="true" placeholder="性别" class="s-input pl1" @click="showSexPopup(index)" /></div>
                                <div class="v-form"><van-field v-model="pel.post" placeholder="职务" class="m-input pl1" /></div>
                                <img v-if="person.length>1" class="form-icon l" src="../../assets/icon/img/cut.png" alt="" @click="cutPerson(index)">
                            </div>
                        </transition-group>
                        <img class="form-icon mb40" src="../../assets/icon/img/add.png" alt="" @click="addPerson">
                    </div>
                </div>
                <div class="line-inputs mb40">
                    <div class="title">
                        车辆
                    </div>
                    <div class="line-car">
                        <span v-for="(ca, index_car) in carArr" :key="index_car" class="car-item">
                            {{ ca }}
                            <img class="form-icon ml" src="../../assets/icon/img/cut.png" alt="" @click="cutCar(index_car)">
                        </span>
                        <div v-if="carInput" class="v-form"><van-field v-model="car" class="s-input nopd" @blur="carDone" @keyup.enter.native="carDone" /></div>
                        <img v-else class="form-icon" src="../../assets/icon/img/add.png" alt="" @click="carInput= true">
                    </div>
                </div>

                <div class="v-form-check error-four">
                    <van-field label="参观路径" required :rules="[{ required: true, message: '请选择参观路径' }]">
                        <template #input>
                            <van-radio-group v-model="form.visitPathId" direction="horizontal">
                                <van-radio v-for="(route_item, index_route) in appointRoute" :key="index_route" :name="route_item.id">
                                    {{ route_item.name }}
                                    <template #icon="props">
                                        <img class="img-icon" :src="props.checked ? require('../../assets/icon/img/radioed.png') : require('../../assets/icon/img/radio.png')">
                                    </template>
                                </van-radio>
                            </van-radio-group>
                        </template>
                    </van-field>
                </div>
                <div class="error-name v-form">
                    <van-field
                        v-model="form.appointPeople"
                        label="预约人"
                        class="m-input"
                        required
                        :rules="[{ required: true, message: '请填写预约人' }]"
                    />
                </div>

                <div class="line" />
                <div class="line-inputs pd">
                    <div class="title">
                        会议
                    </div>
                    <van-checkbox-group v-model="form.appointMeetings" class="line-check" direction="horizontal">
                        <van-checkbox v-for="(meet, index_meet) in meeting" :key="index_meet" :name="meet.id">
                            {{ meet.meetRoom }}
                            <template #icon="props">
                                <img class="img-icon" :src="props.checked ? require('../../assets/icon/img/checked.png') : require('../../assets/icon/img/check.png')">
                            </template>
                        </van-checkbox>
                    </van-checkbox-group>
                </div>
                <div class="line-inputs pd">
                    <div class="title">
                        纪念品
                    </div>
                    <van-radio-group v-model="form.isSouvenir" class="line-check">
                        <van-radio :name="1">
                            有
                            <template #icon="props">
                                <img class="img-icon" :src="props.checked ? require('../../assets/icon/img/radioed.png') : require('../../assets/icon/img/radio.png')">
                            </template>
                        </van-radio>
                        <van-radio :name="0">
                            无
                            <template #icon="props">
                                <img class="img-icon" :src="props.checked ? require('../../assets/icon/img/radioed.png') : require('../../assets/icon/img/radio.png')">
                            </template>
                        </van-radio>
                    </van-radio-group>
                </div>
                <div class="line-inputs pd">
                    <div class="title">
                        是否用餐
                    </div>
                    <van-radio-group v-model="form.isDining" class="line-check">
                        <van-radio :name="1">
                            是
                            <template #icon="props">
                                <img class="img-icon" :src="props.checked ? require('../../assets/icon/img/radioed.png') : require('../../assets/icon/img/radio.png')">
                            </template>
                        </van-radio>
                        <van-radio :name="0">
                            否
                            <template #icon="props">
                                <img class="img-icon" :src="props.checked ? require('../../assets/icon/img/radioed.png') : require('../../assets/icon/img/radio.png')">
                            </template>
                        </van-radio>
                    </van-radio-group>
                </div>
                <div v-if="form.isDining === 1" class="banquet">
                    <van-checkbox v-model="form.halal" @change="form.halal === false?form.remark='':''">
                        清真
                        <template #icon="props">
                            <img class="img-icon" :src="props.checked ? require('../../assets/icon/img/checked.png') : require('../../assets/icon/img/check.png')">
                        </template>
                    </van-checkbox>
                    <div class="line-remark">
                        <div class="tit">备注</div>
                        <div class="v-form">
                            <van-field
                            v-model="form.remark"
                            class="remark"
                            @input="form.halal = true"
                        />
                        </div>
                    </div>
                </div>
            </div>

            <div class="foot">
                <div class="button button_cancel" @click="back">
                    取消
                </div>
                <button class="button button_confirm" type="submit">
                    {{ id?'确认':'确认预约' }}
                </button>
            </div>
        </van-form>

        <van-popup v-model="yearShow" class="time-popup">
            <van-datetime-picker
                type="date"
                title="选择年月日"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="onYearConfirm"
                @cancel="yearShow=false"
            />
        </van-popup>

        <van-popup v-model="startTimeShow" class="time-popup">
            <van-datetime-picker
                v-model="form.startTime"
                type="time"
                title="选择开始时间"
                @confirm="onStartTimeConfirm"
                @cancel="startTimeShow=false"
            />
        </van-popup>
        <van-popup v-model="endTimeShow" class="time-popup">
            <van-datetime-picker
                v-model="form.endTime"
                type="time"
                title="选择结束时间"
                @confirm="onEndTimeConfirm"
                @cancel="endTimeShow=false"
            />
        </van-popup>

        <van-popup v-model="sexPopup" class="time-popup">
            <van-picker
                title="请选择性别"
                show-toolbar
                :columns="columns"
                @confirm="onSexConfirm"
                @cancel="sexPopup = false"
            />
        </van-popup>
    </div>
</template>

<script>
    import Vheader from '~/components/layout/Vheader'
    import utils from '~/utils/utils'
    export default {
        components: {
            Vheader
        },
        async asyncData({ app, params, query }) {
            const dict = await app.$api.getDict()
            const appointRoute = await app.$api.getRoute()
            const meeting = await app.$api.getMeeting()

            if (params.id) {
                const data = await app.$api.getAppointmentDetail(params)
                let form = {
                    name: data.name,
                    appointPeople: data.appointPeople,
                    peopleNum: data.peopleNum,
                    visitDate: data.visitDate,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    isSouvenir: data.isSouvenir,
                    isDining: data.isDining,
                    visitPathId: data.routeVO.id,
                    visitorAttributeId: data.dictVO.id,
                    appointMeetings: [],
                    halal: data.halal === 1,
                    remark: data.remark
                }
                if (data.meetingVOS.length) {
                    for (const ir of data.meetingVOS) {
                        form.appointMeetings.push(ir.id)
                    }
                }

                if (data.persons) {
                    for (let i of data.persons) {
                        if (i.sex === 1) {
                            i.sex = '男'
                        } else if (i.sex === 2) {
                            i.sex = '女'
                        } else {
                            i.sex = ''
                        }
                    }
                }

                return {
                    data,
                    form,
                    carArr: data.vehicles,
                    carInput: !params.id,
                    person: data.persons ? data.persons : [{ name: '', sex: '', post: '' }],
                    id: params.id,
                    dict,
                    appointRoute,
                    meeting
                }
            } else {
                return {
                    dict,
                    appointRoute,
                    meeting
                }
            }
        },
        data() {
            return {
                id: '',
                form: {
                    name: '',
                    appointPeople: '', // 预约人
                    peopleNum: '',
                    visitDate: '',
                    startTime: '',
                    endTime: '',
                    isSouvenir: 0,
                    isDining: 0, // 是否用餐
                    visitPathId: '', // 参观路径
                    visitorAttributeId: '', // 访客属性
                    appointMeetings: [], // 会议厅ID
                    halal: false, // 用餐是否清真
                    remark: '' // 用餐备注
                },
                startTimeShow: false,
                endTimeShow: false,
                timeTag: '',

                sexPopup: false,
                currentSexIndex: '',
                columns: ['男', '女'],

                yearShow: false,
                minDate: new Date(), // 当前时间之后
                maxDate: new Date(2022, 10, 1),

                radio: '1',
                checked: '',

                person: [
                    { name: '', sex: '', post: '' }
                ],

                car: '',
                carArr: [],
                carInput: true,

                selectErrorShow: false
            }
        },
        computed: {
            showDate() {
                if (this.form.visitDate) {
                    let [year, month, day] = this.form.visitDate.split('-')
                    return `${year}年${month}月${day}日`
                } else {
                    return ''
                }
            }
        },
        methods: {
            onSubmit: utils.throttle(function() {
                if (!this.form.visitorAttributeId) {
                    this.selectErrorShow = true
                    return false
                }
                this.form.halal = Number(this.form.halal)
                this.form.vehicles = this.carArr
                this.form.persons = this.person
                for (let i of this.form.persons) {
                    if (i.sex === '男') {
                        i.sex = 1
                    } else if (i.sex === '女') {
                        i.sex = 2
                    } else {
                        i.sex = 0
                    }
                }

                let url
                if (this.id) {
                    this.form.id = this.id
                    url = 'editAppoint'
                } else {
                    url = 'addAppointment'
                }
                console.log(this.form)
                console.log(JSON.stringify(this.form))

                this.$api[url](this.form).then((res) => {
                    console.log(res)
                    if (res) {
                        this.$toast(this.id ? '更新成功' : '添加成功')
                        // 清空表单
                        this.form = {
                            name: '',
                            appointPeople: '',
                            peopleNum: '',
                            visitDate: '',
                            startTime: '',
                            endTime: '',
                            isSouvenir: 0,
                            isDining: 0,
                            visitPathId: '',
                            visitorAttributeId: '',
                            appointMeetings: [],
                            halal: '',
                            remark: ''
                        }
                        this.person = [{ name: '', sex: '', post: '' }]
                        this.carArr = []
                        this.carInput = true
                    }
                })
            }, 5000),
            back() {
                // 调用安卓方法返回上一页
                window.androidFn.CloseWebviewPopup()
            },
            addPerson() {
                if (!this.person[this.person.length - 1].name) {
                    this.$toast('请填写人员信息')
                    return false
                }
                this.person.push({ name: '', sex: '', post: '' })
            },
            cutPerson(index) {
                this.person.splice(index, 1)
            },
            timePopupShow(value) {
                if (value === 'start') {
                    this.startTimeShow = true
                } else if (value === 'end') {
                    if (!this.form.startTime) {
                        this.$toast('请选择开始时间')
                        return false
                    }
                    this.endTimeShow = true
                }
            },
            showSexPopup(index) {
                // 记录当前数组值
                this.currentSexIndex = index
                this.sexPopup = true
            },
            onSexConfirm(value) {
                this.person[this.currentSexIndex].sex = value
                this.sexPopup = false
                this.currentSexIndex = ''
            },
            onYearConfirm(value) {
                console.log(value)

                let date = new Date(value)
                let y = date.getFullYear()
                let m = date.getMonth() + 1
                m = m < 10 ? ('0' + m) : m
                let d = date.getDate()
                d = d < 10 ? ('0' + d) : d

                this.form.visitDate = `${y}-${m}-${d}`
                this.yearShow = false
            },
            onStartTimeConfirm(value) {
                this.form.startTime = value
                this.startTimeShow = false
            },
            onEndTimeConfirm(value) {
                this.form.endTime = value
                this.endTimeShow = false
            },
            carDone() {
                if (this.car) {
                    this.carArr.push(this.car)
                    this.car = ''
                    this.carInput = false
                }
            },
            cutCar(index) {
                this.carArr.splice(index, 1)
                if (this.carArr.length === 0) {
                    this.carInput = true
                }
            },
            changeDict(data) {
                this.selectErrorShow = false
                this.form.visitorAttributeId = data
            }
        }
    }
</script>

<style lang="less" scoped>
    .list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
        transition: all 0.3s;
    }
    .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateY(5px);
    }

    .container{
        background: rgba(0,0,0,0.4);
        box-shadow: 0 0 20px #fff;
        width: 100vw;
        // height: 100vh;
        .form-container{
            padding: 4.8vh 6.3vw 2.4vh 6.3vw;
            overflow-y: scroll;
            height: 80vh;
        }
    }
    .mb40{
        margin-bottom: 40px;
    }
    .v-form{
        font-size: 32px;
    }
    .form-icon{height: 40px;width: 40px;}
    .foot{
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 80px;
    }

    .time{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .t{
            padding: 0 16px 52px 16px;
            color: #fff;
        }

    }
    .line-inputs{
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;

        .title{
            width: 192px;
            height: 65px;
            line-height: 65px;
            margin-right: 40px;
            color: #fff;
            text-align: right;
        }
        .must{
            position: relative;
            &::before{
                position: absolute;
                content: '';
                height: 8px;
                width: 8px;
                background: #F05656;
                top: 26px;
                left: 32px;
            }
        }
        .msg{
            flex: 1;
            display: flex;
            flex-direction: column;
            .msg-item{
                display: flex;
                align-items: center;
                .l{
                    margin: 0 0 25px 16px;
                }
            }
        }
        .line-car{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .car-item{
                color: #fff;
                border-radius: 16px;
                background: rgba(255, 255, 255, 0.2);
                padding: 12px 16px;
                font-size: 28px;
                margin-right: 30px;
                display: flex;
                align-items: center;
                .ml{margin-left: 40px;}
            }
        }
        .line-check{
            display: flex;
            align-items: center;
            /deep/ .van-radio{
                padding-right: 32px;
                &__label{
                    color: #fff;
                }
            }
            /deep/ .van-checkbox{
                padding-right: 32px;
                &__label{
                    color: #fff;
                }
            }
        }
    }
    .pd{
        padding: 32px 0;
        display: flex;
        align-items: center;
    }
    .pdb{
        padding-bottom: 32px;
        display: flex;
        align-items: center;
    }

    .time-popup{
        background: rgba(0,0,0,0.40);
        border-radius: 12px;
        width: 47vw;
    }

    .img-icon{
        height: 30px;
        width: 30px;
    }

    .banquet{
        display: flex;
        align-items: center;
        padding: 38px 0;
        margin: 0 232px;
        border-top: 1px solid #fff;
        /deep/ .van-checkbox{
            padding: 0 50px 0 0;

            &__label{
               color: #fff;
            }
        }
    }

    .line-remark{
        color: #fff;
        display: flex;
        align-items: flex-start;
        .tit{
            height: 65px;
            line-height: 65px;
            padding-right: 40px;
        }
        /deep/ .van-cell{
            padding: 0;
        }
    }
</style>
