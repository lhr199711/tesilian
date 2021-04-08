<template>
	<div class="success-container">
		<van-icon name="checked" color="#3D7EFF" size="70px" />
		<div class="description">
			<p class="gray1e f32">{{ text }}</p>
			<p class="gray9">{{ depict }}</p>
		</div>
		<div class="btn">
			<van-button	round type="primary" block @click="handleClick">完成</van-button>
		</div>
	</div>
</template>

<script>
    export default {
        name: 'Success',
        props: {
            text: {
                type: String,
                default: '成功'
            },
            depict: {
                type: String,
                default: '平台客服将尽快与您联系'
            }

        },
        methods: {
            handleClick() {
                this.$emit('handleClick')
            }
        }
    }
</script>

<style lang="less" scoped>
    .success-container{
        text-align: center;
        margin-top: 220px;
        .description{
            width: 370px;
            margin: 40px auto 0 auto;
        }
        .btn{
            margin: 192px 175px;
        }
    }

</style>
