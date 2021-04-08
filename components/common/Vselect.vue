<template>
    <div class="line-select">
        <div class="line-select-input" :class="error?'error':''" @click="selectShow = true">
            <input v-model="showValue" disabled="disabled" type="text">
            <img v-if="selectShow" class="icon" src="../../assets/icon/img/arrow_up.png" alt="">
            <img v-else class="icon" src="../../assets/icon/img/arrow_down.png" alt="">
        </div>
        <div v-if="error" class="error-msg">请选择访客属性</div>
        <div v-show="selectShow" class="select-list">
            <ul>
                <li
                    v-for="(item, index_select) in selectValue"
                    :key="index_select"
                    :class="showValue === item[showName]?'selected':''"
                    @click="getSelectValue(item)"
                >
                    {{ item[showName] }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Vselect',
    props: {
        selectValue: {
            type: Array,
            default: () => []
        },
        userKey: {
            type: String,
            default: 'id'
        },
        showName: {
            type: String,
            default: 'name'
        },
        selectedValue: {
            type: [String, Number],
            default: ''
        },
        error: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        selectShow: false
    }),
    computed: {
        showValue() {
            return this.selectedValue
            ? this.selectValue.find(element => element.id === this.selectedValue).value
            : ''
        }
    },
    methods: {
        getSelectValue(data) {
            this.selectShow = false
            this.$emit('choose', data[this.userKey])
        }
    }
}
</script>

<style lang="less" scoped>
    .line-select{
        position: relative;
        font-size: 28px;
        padding-bottom: 0.4rem;
        .line-select-input{
            border: 1px solid #fff;
            width: 400px;
            height: 65px;
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
            input{
                width: 330px;
                background: transparent;
                border: none;
                outline:0;
                -webkit-appearance:none;
                -moz-appearance: none;
                color: #fff;
                padding: 0 0 0 16px;
            }
            .icon{
                width: 64px;
                padding-right: 16px;
            }
        }
        .error{
            border-color: #F05656;
        }
        .error-msg{
            position: absolute;
            color: #F05656;
            left: 0;
            top: 65px;
        }
        .select-list{
            position: absolute;
            top: 72px;
            left: 0;
            background: #091D2D;
            border: 1px solid rgba(255,255,255,0.60);
            width: 400px;
            color: #fff;
            z-index: 1;
            li{
                height: 65px;
                line-height: 65px;
                padding: 0 16px;
            }
            .selected{
                background: rgba(255,255,255,0.20);
            }
        }
    }
</style>
