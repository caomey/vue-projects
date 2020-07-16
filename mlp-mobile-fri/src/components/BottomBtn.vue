<template>
    <div class="bottom-btn-box">
        <van-button block :type="type" v-bind="$attrs" v-on="$listeners" v-bind:class="{'primary-bottom-btn': isPrimary }" />
    </div>
</template>

<script>
    export default {
        computed: {
            isPrimary() {
                return this.type === 'primary';
            }
        },
        props: {
            type: {
                type: String,
                default: 'primary'
            }
        },

    }
</script>

<style lang="less" scoped>
    .bottom-btn-box {
        position: relative;
        margin-left: 5%;
        margin-right: 5%;
        top: 50px;
        padding-bottom: 50px;
    }

    .primary-bottom-btn {
        background-color: @primary;
        color: @backfont;
        border-color: @primary;
    }
</style>