<template>
  <div class="sterper-component">
      <div class="wraper">
          <div class="left btn" @click="subtract"><van-icon name="minus" /></div>
          <div class="content">
              <p>{{ number }}</p>
              <slot name="unit" />
            </div>
          <div class="right btn" @click="add"><van-icon name="plus" /></div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        number: {
            type: Number,
            default: 26,
            required: true
        },
        max: {
            type: Number,
            default: 36
        },
        min: {
            type: Number,
            default: 10
        }
    },
    methods: {
        subtract() {
            if (this.number === this.min) { return }
            this.$emit('update:number', this.number - 1)
        },
        add() {
            if (this.number === this.max) { return }
            this.$emit('update:number', this.number + 1)
        }
    }
}
</script>

<style lang="less" scoped>
    .sterper-component {width: 100%}
    .wraper {
        display: flex;
        justify-content: space-between;
        .content {
            display: flex;
            align-items: center;
        }
        .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #aaa;
        }
    }
</style>
