<template>
	<div class="none">
		<p class="f32">{{ text }}</p>
	</div>
</template>

<script>
    export default {
        name: 'None',
        props: {
            text: {
                type: String,
                default: '暂时没有内容'
            },
            size: {
                type: String,
                default: '140px'
            }
        }
    }
</script>

<style lang="less" scoped>
    .none{
        text-align: center;
        margin-bottom: 30px;
        .img{
            padding-bottom: 30px;
            width: 560px;
            height: 310px;
        }
    }
</style>
