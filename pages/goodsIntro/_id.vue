<template>
  <div>
    <div class="wraper">
      <div class="container">
        <div class="head">
          <div class="title">
            <p>{{ data.title }} | {{ data.name }}</p>
            <div class="icon-right" @click="changeLike">
              <van-icon class="icon" name="like" :color="formatColor" />
            </div>
          </div>
          <p class="desc">{{ data.brief }}</p>
        </div>
        <div class="line" />
        <!-- <div class="goods-img">
          <img v-lazy="'https://img01.yzcdn.cn/vant/apple-1.jpg'">
        </div> -->
        <div class="content" v-html="data.introduction" />
        <div class="info" @click="goDetail">
          详细信息>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    async asyncData({ app, params, query }) {
        let sendData = { id: params.id }

        if (query.appointId !== 'null' && query.appointId) {
            sendData.appointId = query.appointId
        }
        const data = await app.$api.getGoodsIntro(sendData)

        return {
            data,
            id: params.id,
            appointId: query.appointId !== 'null' && query.appointId ? query.appointId : ''
        }
    },
    data() {
        return {
            isLike: false
        }
    },
    computed: {
        formatColor() { // crt 0 表示不喜欢 1表示喜欢
            return this.data.crt ? '#F05656 ' : '#fff'
        }
    },
    methods: {
        changeLike() {
            window.androidFn.isLike(!!this.appointId, this.data.crt === 0 ? 1 : 0)

            if (this.appointId) {
                let obj = {
                    appointId: this.appointId,
                    thingId: this.id
                }
                if (this.data.crt) {
                    obj.operate = 1
                } else {
                    obj.operate = 0
                }
                this.$api.modifyLike(obj).then((res) => {
                    this.data.crt === 0 ? this.data.crt = 1 : this.data.crt = 0
                })
            }
        },
        goDetail() {
            window.androidFn.goGoodsDetail(`/likeDetail/${this.id}`)
        }
    }
}
</script>

<style lang="less" scoped>
@w: 2.24vw;
@h: 3.96vh;
p {
  word-wrap:break-word;
  word-break:break-all;
  font-size: 8/@h;
  line-height: 10/@h;
}
.line {
  height: 1px;
  opacity: 0.2;
  background-image: linear-gradient(-63deg, rgba(255,255,255,0.00) 0%, #FFFFFF 47%, rgba(255,255,255,0.00) 95%);
}
.wraper {
  background: rgba(0,0,0,0.40);
  width: 100vw;
  height: 100vh;
  padding: 34/@h 0 0;
  color: #fff;
  .container {
    width: 186/@w;
    margin: 0 auto;
    .head {
      .title {
        height: 20/@h;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 0 6/@h;
        p {
          font-size: 10/@h;
          height: 20/@h;
          line-height: 20/@h;
        }
        .icon-right {
          width: 20/@h;
          height: 20/@h;
          border:1px solid #aaa;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon {
            font-size: 14/@h;
          }
        }
      }
      .desc {
        margin:0 0 8/@h;
      }
    }
    .goods-img {
      height: 160/@h;
      line-height: 160/@h;
      img {
        width: 100%;
        vertical-align: middle;
        height: 90%;
      }
    }
    .content {
        padding: 40px 0 28/@h;
        /deep/ h1~h6 {
            font-size: 10/@h;
            line-height: 1;
            margin:0 0 6/@h;
        }
    }
    .info {
      color: skyblue;
    }
  }
}
</style>
