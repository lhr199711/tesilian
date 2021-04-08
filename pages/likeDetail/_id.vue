<template>
  <div class="wraper">
    <h4>
      <p>
        <van-icon class="icon" size="32" name="like" color="#fff" />
        <span>详情</span>
      </p>
      <van-icon class="close" name="cross" color="#fff" size="26" @click="close" />
    </h4>
    <div class="line" />
    <div class="container">
        <div class="carousel">
            <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(image, index) in data.detailImgUrls" :key="index">
                    <img :src="image">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="describe">
            <h5>{{ data.title }}<span> | </span>{{ data.name }}</h5>
            <div v-html="data.detail" />
        </div>
    </div>
  </div>
</template>

<script>
export default {
    async asyncData({ app, params, query }) {
        const data = await app.$api.getGoodsDetail(params)

        data.detailImgUrls = data.detailImgUrls ? JSON.parse(data.detailImgUrls) : []

        return {
            data
        }
    },
    data() {
        return {
            show: true
        }
    },
    methods: {
        close() {
            window.androidFn.CloseWebviewPopup()
        }
    }
}
</script>
<style lang="less" scoped>
  @w: 23.2vw;
  @h: 13.6vh;
  .line {
    width: 84%;
    height: 2px;
    opacity: 0.2;
    background-image: linear-gradient(-63deg, rgba(255,255,255,0.00) 0%, #FFFFFF 47%, rgba(255,255,255,0.00) 95%);
    margin:0 auto;
  }
  .carousel {
    /deep/ .van-swipe__indicators .van-swipe__indicator {
      width: 10px;
      height: 10px;
    }
  }
  .wraper {
    background: rgba(0,0,0,0.40);
    width: 100vw;
    height: 100vh;
    h4 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      height: 120px;
      .close {
        margin-right: 48px;
      }
      p {
        display: flex;
        font-size: 40px;
        height: 100%;
        align-items: center;
        line-height: 120px;
        .icon {
          margin: 0 48px;
        }
      }
      div {
        font-size: 50px;
        margin-right: 44px;
      }
    }
    .container {
      padding: 78px 0 0 120px;
      display: flex;
      .carousel {
        width: 800/@w;
        height: 1080/@h;
        margin-right: 80px;
        .swipe {
          height: 100%;
        }
        img {
          width: 100%;
          height: 1000/@h;
        }
      }
      .describe {
        box-sizing: border-box;
        width: 1280/@w;
        height: 1080/@h;
        padding-right: 72px;
        overflow-y: auto;
        color:#ccc;
        /deep/ h1~h5 {
          color: #fff;
          font-size: 40px;
          line-height: 56px;
          margin-bottom: 64px;
        }

        /deep/ p {
            font-size: 28px;
            line-height: 48px;
        }

      }
    }
  }
</style>
