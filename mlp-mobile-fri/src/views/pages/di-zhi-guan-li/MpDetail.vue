<template>
    <div>
        <top-bar top-title="门牌信息"></top-bar>
        <mp-skeleton title avatar :row="10" :async-load="loadData">
            <mp-info :enable-edit="{}" :temp-data="tempData" ref="mpInfo"></mp-info>
        </mp-skeleton>
    </div>
</template>

<script>
    import mpInfo from "../zhi-pai-he-shi/MpInfo";
    import api from "../../../components/api";
    export default {
        name: 'mpDetail',
        data() {
            return {
                tempData: null
            }
        },
        components: {
            mpInfo
        },
        methods: {
            loadData() {
                const mpId = this.$route.params.mpId
                if (mpId) {
                    return api.getMpDetail(mpId).then(responseData => {
                        const taskData = {
                            taskTemp: responseData.data.mp,
                            children: responseData.data.children
                        }
                        this.tempData = taskData;
                    })
                }
            }
        },
    }
</script>