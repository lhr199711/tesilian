<template>
	<div v-if="loading" class="loading-page" @click.stop.prevent="ban">
		<van-loading color="#1989fa" size="37px" vertical>
			<template #default>
				<span class="wh f28">加载中...</span>
			</template>
		</van-loading>
	</div>
</template>

<script>
    /**
     * 公用过度loading效果
     */
    export default {
        data: () => ({
            loading: false
        }),
        methods: {
            start() {
                this.loading = true
            },
            finish() {
                this.loading = false
            },
            ban() {
                return false
            }
        }
    }
</script>

<style lang="less" scoped>
    .loading-page {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.67);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }
</style>
