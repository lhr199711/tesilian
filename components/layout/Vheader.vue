<template>
    <div>
        <div class="header">
            <slot name="left" />
            <div @click="close">
                <van-icon name="cross" color="#ffffff" size="20px" />
            </div>
        </div>
        <div class="line" />
    </div>
</template>

<script>
/**
 * 二级页面，列表，详情头部
 */
export default {
    name: 'Vheader',
    methods: {
        close() {
            // 调用Android方法关闭？
            window.androidFn.CloseWebviewPopup()
        }
    }
}
</script>

<style lang="less" scoped>
    .header{
        width: 100%;
        height: 8.8vh;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 23px;

    }
    .line{
        width: 100%;
        height: 1px;
        background-image: linear-gradient(-63deg, rgba(255,255,255,0.00) 0%, #FFFFFF 47%, rgba(255,255,255,0.00) 95%);
    }
    .title-name{
        color: #fff;
        font-size: 30px;
        font-weight: bolder;
        display: flex;
        align-items: center;
        .img{
            padding-right: 23px;
        }
    }
</style>
