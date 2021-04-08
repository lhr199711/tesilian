<template>
  <div class="wraper">
      <div class="container">
        <h4>vip洽谈室|环境</h4>
        <div class="line" />
        <div class="func">
          <h5>
            <van-icon name="fire" color="#fff" />
            <p>灯光控制</p>
          </h5>
          <div class="func-light">
            <div class="light-btns">
              <div>
                <div :class="[lightMode === 1 ? 'active' : '']" @click="choiceLightMode(1)"><van-icon name="phone-o" /></div>
                <p class="ellipsis">展开模式</p>
              </div>
              <div>
                <div :class="[lightMode === 2 ? 'active' : '']" @click="choiceLightMode(2)"><van-icon name="phone-o" /></div>
                <p class="ellipsis">展开模式</p>
              </div>
              <div>
                <div :class="[lightMode === 3 ? 'active' : '']" @click="choiceLightMode(3)"><van-icon name="phone-o" /></div>
                <p class="ellipsis">展开模式</p>
              </div>
              <div>
                <div :class="[lightMode === 4 ? 'active' : '']" @click="choiceLightMode(4)"><van-icon name="phone-o" /></div>
                <p class="ellipsis">展开模式</p>
              </div>
            </div>
            <div class="light-options">
              <div class="light-options-btns">
                <div :class="[whichLight === 1 ? 'active' : '']" @click="choiceLight(1)">
                  <van-icon name="graphic" />
                  <p>主灯</p>
                </div>
                <div :class="[whichLight === 2 ? 'active' : '']" @click="choiceLight(2)">
                  <van-icon name="graphic" />
                  <p>侧灯</p>
                </div>
                <div :class="[whichLight === 3 ? 'active' : '']" @click="choiceLight(3)">
                  <van-icon name="graphic" />
                  <p>氛围灯</p>
                </div>
                <div class="color-picker">
                  <color-picker class="color-picker-content" v-bind="color" @input="onInput" @select="onSelect" />
                </div>
              </div>
              <div class="custom">自定义</div>
            </div>
          </div>
        </div>
        <div class="func">
          <h5>
            <van-icon name="fire" color="#fff" />
            <p>空调控制</p>
          </h5>
          <div class="air-btns">
            <div>
              <div :class="['air-item', airOpen ? 'active' : '']" @click="choiceAiropen"><van-icon name="fire" color="#fff" /></div>
              <p>开启</p>
            </div>
            <div>
              <div :class="['air-item', airMode ? 'active1' : '']" @click="choiceAirmode"><van-icon name="fire" color="#fff" /></div>
              <p>模式</p>
            </div>
            <div class="stepper">
              <div>
                <Stepper :number.sync="airNumber">
                  <template #unit>
                    <van-icon name="discount" />
                  </template>
                </Stepper>
              </div>
              <p>温度调节</p>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import ColorPicker from '@radial-color-picker/vue-color-picker'
export default {
  components: {
    ColorPicker
  },
  data() {
    return {
      airNumber: 24,
      lightMode: 0,
      whichLight: 0,
      airOpen: false,
      airMode: false,
      color: {
        hue: 50,
        saturation: 100,
        luminosity: 50,
        alpha: 1
      }
    }
  },
  methods: {
    choiceLightMode(index) {
      this.lightMode = index
    },
    choiceLight(index) {
      this.whichLight = index
    },
    choiceAiropen() {
      this.airOpen = !this.airOpen
    },
    choiceAirmode() {
      this.airMode = !this.airMode
    },
    onInput(hue) {
      this.color.hue = hue
      console.log(hue)
    },
    onSelect(hue) {
      console.log(hue)
    }
  }
}
</script>

<style lang="less" scoped>
  @w: 2.24vw;
  @h: 3.96vh;
  .line {
    height: 1px;
    opacity: 0.2;
    background-image: linear-gradient(-63deg, rgba(255,255,255,0.00) 0%, #FFFFFF 47%, rgba(255,255,255,0.00) 95%);
  }
  p {
    word-wrap:break-word;
    word-break:break-all;
  }
  .wraper {
    background: rgba(0,0,0,0.40);
    width: 100vw;
    height: 100vh;
    color: #fff;
    .container {
      width: 186/@w;
      margin: 0 auto;
      h4 {
        font-size: 10/@h;
        line-height: 1;
        padding: 40/@h 0 24/@h;
      }
      .func {
        h5 {
          height: 38/@h;
          display: flex;
          align-items: center;
          font-size: 8/@h;
          i {
            font-size: 50px;
            margin: 0 6/@w 0 0;
          }
        }
        .func-light {
          margin: 0 auto;
          .light-btns {
            display: flex;
            flex-wrap: wrap;
            margin: 0 0 6/@h;
            >div {
              width: 25%;
              margin: 0 0 6/@h;
              .active {
                box-shadow: 0px 0px 20px #fff inset;
              }
              >div {
                width: 30/@w;
                height: 30/@w;
                border: 1px solid #aaa;
                border-radius: 5/@w;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #888;
                margin: 0 auto 6/@h;
                i {
                  font-size: 15/@h;
                }
              }
              p {
                font-size: 6/@h;
                text-align: center;
              }
            }
          }
          .light-options-btns {
            width: 166/@w;
            margin: 0 auto;
            height: 52/@h;
            border-radius: 3/@h;
            border: 1px solid #aaa;
            background: #aaa;
            box-shadow: 0 0 20px #fff;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            >div {
              width: 25%;
              text-align: center;
              color: #ccc;
              i {
                font-size: 15/@h;
              }
              p {
                font-size: 6/@h;
              }
            }
            .color-picker {
              width: 37/@w;
              height: 37/@w;
              .color-picker-content {
                width: 100%;
                height: 100%;
              }
            }
            .active {
              color: #fff;
            }
          }
          .custom {
            text-align: center;
            font-size: 6/@h;
            margin: 8/@h 0 0;
          }
        }
        .air-btns {
          width: 168/@w;
          margin: 0 auto 14/@h;
          display: flex;
          justify-content: space-between;
          >div {
            width: 30/@w;
            .air-item {
              width: 30/@w;
              height: 30/@w;
              border: 1px solid #aaa;
              border-radius: 5/@w;
              display: flex;
              justify-content: center;
              align-items: center;
              background: #888;
              margin: 0 auto 6/@h;
              i {
                font-size: 15/@h;
              }
            }
            .active {
              box-shadow: 0px 0px 20px #fff inset;
            }
            .active1 {
              box-shadow: 0px 0px 20px orangered inset;
            }
            p {
              text-align: center;
              font-size: 6/@h;
            }
          }
          .stepper {
            width: 76/@w;
            >div {
              height: 30/@w;
              display: flex;
              align-items: center;
              margin-bottom: 6/@h;
            }
            /deep/ .btn {
              width: 20/@w;
              height: 20/@w;
              border-radius: 5/@w;
            }
          }
        }
      }
    }
  }
</style>
