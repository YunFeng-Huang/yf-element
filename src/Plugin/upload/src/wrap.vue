<template>
<div class="v-avatar-w" :style="{background:`url(${fileUrl})no-repeat center/cover`}">
    <template v-if="!fileUrl">
        <div class="wrap" style="margin-top: 6px;">
            <i class="el-icon-plus v-avatar-uploader-icon"></i>
            <p>上传</p>
        </div>
    </template>

</div>
</template>

<script>
export default {
    props: ['fileUrl'],
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {

    },
    created() {

    },
    mounted() {

    },
    components: {},
    beforeDestroy() {} //生命周期 - 销毁之前
};
</script>

<style lang="scss" scoped>
//@import ''; 引入公共css类
.wrap {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    p {
        line-height: 1;
        margin-top: 4px;
        font-size: 12px;
        color: #666;
    }
}
</style>
