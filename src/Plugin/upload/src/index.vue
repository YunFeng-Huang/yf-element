<template>
    <div>
        <el-upload v-if="!cut" class="v-avatar-uploader" :action="_uploadUrl()"  :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <wrap :fileUrl="fileUrl"></wrap>
        </el-upload>
        <div v-else class="v-avatar-uploader" @click="_Opencropper">
            <wrap :fileUrl="fileUrl"></wrap>
        </div>
        <Custom-Cropper v-if="cropperShow"  @clipData="clipData" :imgData="imgData"></Custom-Cropper>
    </div>
</template>

<script>
import mixin_upload from '@/utils/mixin_upload.js';
import wrap from './wrap';
export default {
    components:{wrap},
    props:{
        cut:{
            type:Boolean,
            default:false
        },
        imgRatio:{
            type:Number,
            default:690/260
        },
        imgMaxSize:{
            type:Number,
            default:2 * 1024 * 1024
        }
    },
    mixins: [mixin_upload],
    name: 'VElUpload',
    data() {
        return {
            imgData : {
                imgRatio: this.imgRatio, // 图片宽高比
                imgMaxSize: this.imgMaxSize, // 图片允许最大size  1M
                imgUrl: null // 有图片时  图片路径
            },
            cropperShow:false
        };
    },
    watch:{
        fileUrl(newval){
            this.imgData.imgUrl = newval;
        }
    },
    methods: {
        clipData(e){
            console.log(e,'e');
            e && this.$emit('update:fileUrl',e);
            this.cropperShow = false;
        },
        _Opencropper(){
            this.cropperShow = true;
            this.imgData.imgUrl = this.fileUrl;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg';
            const isPNG = file.type === 'image/png';
            if (!isJPG && !isPNG) {
                this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!');
                return false;
            }
            return new Promise(resolve=>{
                this._changeFile(file).then(res=>{
                    resolve(res);
                });
            });
        },

        handleRemove(file) {
            let fileList = this.$refs.upload.uploadFiles;
            let index = fileList.findIndex(fileItem => {
                return fileItem.uid === file.uid;
            });
            fileList.splice(index, 1);
        },
        handleAvatarSuccess(e) {
            this.$emit('update:fileUrl', e.previewLink);
        }
    },
    mounted() {}
};
</script>

<style lang="scss" scoped>
.v-avatar-uploader {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #e5e5e5;

    .v-avatar-w {
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
