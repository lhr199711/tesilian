<template>
	<div class="wait-container">
		<p class="gray1e f32">资料审核中...</p>
		<div class="wait-btn">
			<van-button	round type="primary" block @click="handleClick">完成</van-button>
		</div>
	</div>
</template>

<script>
    export default {
        name: 'Wait',
        methods: {
            handleClick() {
                this.$emit('handleClick')
            }
        }
    }
</script>

<style lang="less" scoped>
    .wait-container{
        text-align: center;
        margin-top: 282px;
        .img{
            width: 560px;
            height: 310px;
            margin: 0 auto;
        }
        .wait-btn{
            margin: 72px 175px;
        }
    }

</style>
