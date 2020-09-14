<template>
  <div>
        <el-dialog
        class="dialog"
        title="设置"
        :visible.sync="dialogVisible"
        :width="dialogWidth"
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        >
            <el-form :model="form" ref="form" :rules="formRules" :label-width="formLabelWidth">
                <el-form-item label="是否参与会员折扣" required>
                    <el-radio-group v-model="form.discountEnable">
                        <el-radio :label="1">参与</el-radio>
                        <el-radio :label="0">不参与</el-radio>
                    </el-radio-group>
                    <div class="Comment-span">(如设置该门店不参与会员折扣，则用户购买该门店下的商品时，将不能进行会员折扣)</div>
                </el-form-item>
                <div v-show="form.discountEnable == 1">
                    <el-form-item>
                        <template #label>
                            <div style="font-weight:600;font-size:18px;">会员折扣</div>
                        </template>
                    </el-form-item>
                    <el-form-item
                    class="input-200"
                    v-for="(item,index) in form.discountSaveModelList"
                    :label="item.memberLevelName"
                    :key="index"
                    :prop="'discountSaveModelList.'+index+'.discount'"
                    :rules="formRules.discount"
                    >
                        <el-input v-model="item.discount">
                            <template #append>折</template>
                        </el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelBtn">取消</el-button>
                <el-button type="primary" @click="saveBtn">保存</el-button>
            </div>
        </el-dialog>
  </div>
</template>

<script>
export default {
    name:'VMemberDialog',
    props:{
        dynamicData: {
            type: Object,
            required: true
        },
        dialogMemberVisible: {
            type: Boolean,
            required: true
        },
        dialogWidth: {
            type: String,
            default: '500px'
        },
        formLabelWidth: {
            type: String,
            default: '150px'
        }
    },
    data() {
        const discount = (rule, value, callback) => {
            let regex = /^(([0-9][0-9]{0,3})|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(
                value
            );
            if (!value) {
                callback(new Error('请输入折扣'));
            } else if (value > 10) {
                callback(new Error('折扣不能大于10折'));
            } else if (value < 1) {
                callback(new Error('折扣不能小于1折'));
            } else if (!regex) {
                callback(new Error('格式不正确，且小数点后两位！'));
            } else {
                callback();
            }
        };
        return {
            dialogVisible: this.dialogMemberVisible,
            form:{
                discountSaveModelList:[],
                discountEnable: 1
            },
            formRules:{
                discount:[
                    { required: true, message: '请输入折扣', trigger:['change', 'blur']},
                    { validator: discount }
                ]
            }
        };
    },
    watch: {
        dialogMemberVisible: {
            handler(val){
                this.dialogVisible = val;
                if (val){
                    this.form = JSON.parse(JSON.stringify(this.dynamicData));
                }
            },
            immediate: true
        }
    },
    methods: {
        cancelBtn(){
            this.dialogVisible = false;
            this.$emit('update:dialogMemberVisible', false);
        },
        saveBtn(){
            this.$refs.form.validate(valid =>{
                if (valid){
                    this.$emit('save',this.form);
                } else {
                    this.$message.warning('请检查填写信息');
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
/* 备注信息 */
.Comment-span {
    font-size: 1rem;
    font-family: MicrosoftYaHei;
    color: rgba(170, 170, 170, 1);
}
.dialog{
    /deep/ .el-input__inner{
        text-align: center;
    }
    .input-200 {
            /deep/ .el-input{
            width: 200px;
        }
    }
}
</style>