<template>
  <div>
    <div class="wraper">
      <h4>接待处<span>|</span>接待大屏</h4>
      <div class="line" />
      <div class="direct-btns">
        <img v-show="nowImg === 'default'" src="@/assets/icon/img/control_default.png" alt="">
        <img v-show="nowImg === 'top'" src="@/assets/icon/img/control_top.png" alt="">
        <img v-show="nowImg === 'right'" src="@/assets/icon/img/control_right.png" alt="">
        <img v-show="nowImg === 'bottom'" src="@/assets/icon/img/control_bottom.png" alt="">
        <img v-show="nowImg === 'left'" src="@/assets/icon/img/control_left.png" alt="">
        <img v-show="nowImg === 'sure'" src="@/assets/icon/img/control_sure.png" alt="">
        <div class="top" @touchstart="clickDirect('top',38)" @touchend="reduct" />
        <div class="bottom" @touchstart="clickDirect('bottom',40)" @touchend="reduct" />
        <div class="left" @touchstart="clickDirect('left',37)" @touchend="reduct" />
        <div class="right" @touchstart="clickDirect('right',39)" @touchend="reduct" />
        <div class="sure" @touchstart="clickSure(13)" @touchend="reduct" />
      </div>
      <div class="func-btns">
        <div :class="[whichItem === 1 ? 'active' : '']" @touchstart="clickItem(1,36)" @touchend="reductItem">
          <img src="@/assets/icon/img/homepage.png" alt="">
        </div>
        <div :class="[whichItem === 2 ? 'active' : '']" @touchstart="clickItem(2,27)" @touchend="reductItem">
          <img src="@/assets/icon/img/return.png" alt="">
        </div>
        <div :class="[whichItem === 3 ? 'active' : '']" @touchstart="clickItem(3,44)" @touchend="reductItem">
          <img src="@/assets/icon/img/screen_capture.png" alt="">
        </div>
        <div :class="[whichItem === 4 ? 'active' : '']" @touchstart="clickItem(4,18)" @touchend="reductItem">
          <img src="@/assets/icon/img/application.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '~/utils/utils'
export default {
  asyncData({ app, params, query }) {
    return {
      id: params.id ? params.id : ''
    }
  },
  data() {
    return {
      nowImg: 'default',
      timer: 0,
      whichItem: 0
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    clickDirect(direc, keyCode) {
      this.nowImg = direc
      this.$api.sendControllerKey({
        keyCode,
        thingId: this.id
      })
      this.timer = setInterval(() => {
        this.$api.sendControllerKey({
          keyCode,
          thingId: this.id
        })
      }, 400)
    },
    clickSure: utils.throttle(function(keyCode) {
      this.nowImg = 'sure'
      this.$api.sendControllerKey({
        keyCode,
        thingId: this.id
      })
    }, 400),
    reduct() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      this.nowImg = 'default'
    },
    clickItem: utils.throttle(function(index, keyCode) {
      this.whichItem = index
      this.$api.sendControllerKey({
        keyCode,
        thingId: this.id
      })
    }, 400),
    reductItem() {
      this.whichItem = -1
    }
  }
}
</script>

<style lang="less" scoped>
  .wraper {
    background: rgba(0,0,0,0.40);
    width: 100vw;
    height: 100vh;
    color: #fff;
    .line {
      width: 90%;
      height: 2px;
      opacity: 0.2;
      background-image: linear-gradient(-63deg, rgba(255,255,255,0.00) 0%, #FFFFFF 47%, rgba(255,255,255,0.00) 95%);
      margin:0 auto;
    }
    h4 {
      font-size: 44px;
      line-height: 56px;
      padding: 152px 0 96px 80px;
      span {
        margin: 0 16px;
      }
    }
    .direct-btns {
      position: relative;
      width: 840px;
      height: 840px;
      margin: 70px auto 50px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
      >div {
        position: absolute;
      }
      .top,.bottom {
        right: 0;
        left: 0;
        margin: 0 auto;
        width: 264px;
        height: 146px;
      }
      .left,.right {
        top: 0;
        bottom: 0;
        margin:auto 0;
        width: 150px;
        height: 250px;
      }
      .top {
        top: 19px;
      }
      .bottom {
        bottom: 19px;
      }
      .left {
        left: 19px;
      }
      .right {
        right: 19px;
      }
      .sure {
        width: 380px;
        height: 380px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border-radius: 190px;
        overflow: hidden;
      }
    }
    .func-btns {
      width: 74%;
      margin:0 auto 40px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      >div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 47%;
        height: 156px;
        margin-bottom: 60px;
        border-radius: 30px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .active {
        box-shadow: 0px 0px 40px #fff inset;
      }
    }
  }
</style>
