<template>
    <div class="mlp-remind-box van-hairline--bottom">
        <div class="bar-placeholder"></div>
        <div class="mlp-remind">
            <span style="padding-left:5px">温馨提示：左侧标注了‘*’号，是必须填写的信息!!！</span>
        </div>
    </div>
</template>



<style lang="less">
    .mlp-remind-box {
        position: fixed;
        top: 0;
        z-index: 1;
        width: 100%;
        max-width: @max-width;
    }

    .mlp-remind {
        background-color: @backfont;
        color: red;
        font-size: 0.7rem;
        // display: block;
        line-height: @remind-line-height;
    }
</style>