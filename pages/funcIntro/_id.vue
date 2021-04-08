<template>
  <div>
    <div class="wraper">
      <div class="container">
        <div class="head">
          <h4>{{ data.title }}</h4>
          <p class="desc">{{ data.brief }}</p>
        </div>
        <div class="line" />
        <div class="content" v-html="data.introduction" />
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
            data
        }
    },
    data() {
        return {

        }
    },
    methods: {

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
  padding: 38/@h 0 0;
  color: #fff;
  .container {
    width: 188/@w;
    margin: 0 auto;
    .head {
      padding: 0 0 80px;
      h4 {
        font-size: 10/@h;
        line-height: 1;
        margin:0 0 12/@h;
      }
      p {
        font-size: 6/@h;
      }
    }
    .content {
      margin: 38px 0 20/@h;
      /deep/ h1~h5 {
        font-size: 8/@h;
        line-height: 1;
        margin: 0 0 8/@h;
      }
      /deep/ p {
        font-size: 7/@h;
      }
    }
  }
}
</style>
