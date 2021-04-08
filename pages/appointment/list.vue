<template>
    <div class="container">
        <Vheader>
            <template #left>
                <div class="title-name">
                    <img class="img" src="../../assets/icon/img/visitor.png" alt="">
                    历史预约
                </div>
            </template>
        </Vheader>
        <div class="list-container">
            <van-list
				v-model="loading"
				:finished="finished"
				finished-text="没有更多了"
				@load="onLoad"
			>
                <div v-if="finished && showList.length === 0" class="none">
                    <img class="icon" src="../../assets/icon/img/visitor_none.png" alt="">
                    <span class="t">还没有任何预约哦~</span>
                </div>
                <template v-else>
                        <div v-for="(item , index ) in showList" :key="index" class="list-item">
                            <p class="date">{{ item.time }}</p>
                            <div v-for="(infoMsg , index_msg ) in item.msg" :key="index_msg" class="visitor-item">
                                <div class="visitor-msg">
                                    <div class="fl">
                                        <p class="name">{{ infoMsg.name }} <span v-if="infoMsg.dictVO.id" class="tag">{{ infoMsg.dictVO.value }}</span></p>
                                        <div class="time">{{ infoMsg.startTime }} - {{ infoMsg.endTime }}</div>
                                    </div>
                                    <div class="fl">
                                        <p class="num">
                                            <span v-for="(per , index_person) in infoMsg.persons" :key="index_person">
                                                {{ per.name }}
                                                {{ index_person === infoMsg.persons.length-1?'':'、' }}
                                            </span>
                                            等{{ infoMsg.peopleNum }}人
                                        </p>
                                        <div>
                                            <span v-if="infoMsg.isDining === 1" class="tag">用餐</span>
                                            <span v-if="infoMsg.isSouvenir === 1" class="tag">纪念品</span>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="infoMsg.state === 2" class="visitor-action">
                                    <div class="cancel_icon">
                                        <img class="img" src="../../assets/icon/img/cancel.png" alt="">
                                    </div>
                                </div>
                                <div v-else class="visitor-action">
                                    <div class="like-num">
                                        <img class="mg" src="../../assets/icon/img/like.png" alt="">
                                        <span>{{ infoMsg.favoriteNum }}</span>
                                    </div>
                                    <div class="detail" @click="goDetail(infoMsg.id)">
                                        <img class="mg" src="../../assets/icon/img/visitor.png" alt="">
                                        <span>详情</span>
                                    </div>
                                </div>
</div>
                        </div>
                </template>
            </van-list>
        </div>
    </div>
</template>
<script>
    import Vheader from '~/components/layout/Vheader'
    export default {
        name: 'List',
        components: {
            Vheader
        },
        asyncData({ app, params, query }) {
            return {
                uid: ''
            }
        },
        data() {
            return {
                list: [],
                showList: [],
                loading: false,
                finished: false,
                uid: ''
            }
        },
        methods: {
            onLoad() {
                let sendData = { pageSize: 10, pullDirect: 1 }
                if (this.uid) {
                    sendData.uid = this.uid
                }

                this.$api.getAppointmentList(sendData).then((res) => {
                    this.loading = false

                    if (res.length > 0 && this.uid !== res[res.length - 1].id) {
                        this.list = this.list.concat(res)
                        this.showList = this.listSort(this.list)

                        this.uid = res[res.length - 1].id
                    } else {
                        this.finished = true
                    }
                })
            },

            listSort(arr) {
                //  先归类，再分组
                let newArr = []
                arr.forEach((appoint, i) => {
                    let index = -1
                    let alreadyExists = newArr.some((newAppoint, j) => {
                        if (appoint.visitDate === newAppoint.visitDate) {
                            index = j
                            return true
                        } else {
                            return false
                        }
                    })
                    if (!alreadyExists) {
                        let [year, month, day] = appoint.visitDate.split('-')
                        newArr.push({
                            time: `${year}年${month}月${day}日`,
                            msg: [appoint]
                        })
                    } else {
                        newArr[index].msg.push(appoint)
                    }
                })
                // this.list.sort((a, b) => a.visitDate.localeCompare(b.visitDate) || a.startTime.localeCompare(b.startTime))
                newArr.sort((a, b) => a.time.localeCompare(b.time))
                for (const value of newArr) {
                    value.msg.sort((a, b) => a.startTime.localeCompare(b.startTime))
                }
                return newArr
            },
            goDetail(id) {
                this.$router.replace({ path: `/appointmentDetail/${id}` })
            }

        }
    }
</script>
<style lang="less" scoped>
    .container{
        // background: rgba(0,0,0,0.4);
        border-radius: 12px;
        box-shadow: 0 0 20px #fff;
        width: 100vw;
        height: 100vh;
        color: #fff;
    }
    .list-container{
        padding: 24px 60px 60px 60px;
        width: 100%;
        height: 91.2vh;
        overflow-y: scroll;
        .list-item{
            padding-top: 16px;
            .date{
                font-size: 32px;
                margin-bottom: 24px;
                padding-left: 16px;
            }
            .visitor-item{
                background: rgba(0,0,0,0.40);
                border-radius: 12px;
                margin-bottom: 24px;
                height: 220px;
                display: flex;
                .visitor-msg{
                    border-right: 4px solid rgba(255,255,255,0.1);
                    padding: 40px;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .fl{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    .name{
                        font-size: 40px;
                    }
                    .num{
                        font-size: 32px;
                        color: rgba(255,255,255,0.6);
                    }
                    .time{font-size: 48px;}
                    .tag{
                        background: #3c3f41;
                        border-radius: 8px;
                        font-size: 28px;
                        width: 120px;
                        text-align: center;
                        padding: 8px 0;
                        display: inline-block;
                        margin-left: 24px;
                    }
                }
                .visitor-action{
                    min-width: 240px;
                    max-width: 240px;
                    display: flex;
                    flex-direction: column;
                    .like-num, .detail{
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .mg{
                            padding-right: 40px;
                        }
                    }
                    .like-num{
                        border-bottom: 4px solid rgba(255,255,255,0.1);
                    }
                    .cancel_icon{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        height: 100%;
                        .img{
                            height: 197px;
                            width: 197px;
                        }
                    }
                }
            }
        }
    }
    .none{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        height: 75.2vh;
        .icon{
            height: 160px;
            width: 160px;
            margin-bottom: 40px;
        }
        .t{
            color: rgba(255,255,255,0.4);
        }
    }
    .van-list__finished-text{
        color: rgba(255,255,255,0.4) !important;
    }
</style>
