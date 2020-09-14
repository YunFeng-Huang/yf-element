<template>
<div class="v-el-search" :class="{ column: !inline,MarginBottom50:Noshow }">
    <el-form ref="form" inline :label-position="labelPosition" :model="formInline" class="v-demo-form-inline" :style="{ overflow: overflowData?overflowData:overflow }">
        <template v-for="(item, index) in formList">
            <template v-if="item.type == 'picker-daterange-two'">
                <el-form-item :label="item.label[0]" :key="index" :style="{ width: item.width || 'auto' }">
                    <template v-if="!item.hidden">
                        <el-date-picker :size="size" v-model="formInline[item.key[0]]" type="date" :picker-options="pickerOptions0" :format="item.format || 'yyyy-MM-dd'" :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'" :placeholder="item.label[0]">
                        </el-date-picker>
                    </template>
                </el-form-item>
                <el-form-item :label="item.label[1]" :key="index+123" :style="{ width: item.width || 'auto' }">
                    <template v-if="!item.hidden">
                        <el-date-picker :size="size" v-model="formInline[item.key[1]]" type="date" :picker-options="pickerOptions1" :format="item.format || 'yyyy-MM-dd'" :value-format="item.valueFormat || 'yyyy-MM-dd 23:59:59'" :placeholder="item.label[1]">
                        </el-date-picker>
                    </template>
                </el-form-item>
            </template>
            <template v-else>
                <el-form-item v-if="!item.hidden" :label="item.label" :key="index" :style="{ width: item.width || 'auto' }">
                    <el-input :size="size" v-if="item.type == 'input'" v-model="formInline[item.key]" :placeholder="item.placeholder || '请输入...'"></el-input>
                    <el-select :size="size" v-if="item.type == 'select'" v-model="formInline[item.key]" @change="_selectChange(item.key)" :placeholder="item.placeholder || '请选择...'">
                        <el-option v-for="(item,index) in item.options" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-date-picker :size="size" v-if="item.type == 'picker-date'" v-model="formInline[item.key]" type="date" :picker-options="item.options" :format="item.format || 'yyyy-MM-dd'" :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'" :default-value="item.value" placeholder="选择日期">
                    </el-date-picker>
                    <el-date-picker :size="size" v-if="item.type == 'picker-daterange'" v-model="formInline[item.key]" type="daterange" :format="item.format || 'yyyy-MM-dd'" :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </template>
        </template>
        <div class="no-title floatRight">
            <slot name="right"></slot>
        </div>
        <div class="btn-w no-title" v-if="!change" :class="{ floatRight: btnRight }">
            <el-button type="primary" v-if="query" :loading="loading" @click.prevent="_Submit">查询</el-button>
            <el-button v-if="reset" @click="_Reset">重置</el-button>
            <slot></slot>
            <el-button @click="_Change" v-if="Noshow"><i class="el-icon-caret-top" :class="{ active: change }"></i></el-button>
        </div>
    </el-form>
    <div class="btn-w clearfix floatRight" style="margin-bottom: 10px;" v-if="Noshow">
        <el-button type="primary" :loading="loading" @click.prevent="_Submit">查询</el-button>
        <el-button v-if="reset" @click="_Reset">重置</el-button>
        <slot></slot>
        <el-button @click="_Change" v-if="Noshow">
            <i class="el-icon-caret-top" :class="{ active: change }"></i></el-button>
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex';
export default {
    name: 'VElSearch',
    props: {
        dataList: {
            type: Array,
            required: true
        },
        //是否显示重置按钮
        reset: {
            type: Boolean,
            default: false
        },
        //是否显示查询按钮
        query: {
            type: Boolean,
            default: true
        },
        //是否需要重置回调
        // resetSub:{
        //     type: Boolean,
        //     default: false
        // },
        loading: {
            type: Boolean,
            default: false
        },
        btnRight: {
            type: Boolean,
            default: false
        },
        // 是否横向排练
        inline: {
            type: Boolean,
            default: true
        },
        // 按钮样式
        size: {
            type: String,
            default: 'medium'
        },
        labelPosition: {
            type: String,
            default: 'right'
        },
        overflowData: {
            type: String,
            required:false
        },
        defaultInit: {
            type: Boolean,
            default: true
        },
        defaultDange: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formInline: {},
            change: false,
            formList: [],
            Noshow: false,
            overflow: 'auto',
            itemBottom: 22,
            startTimeKey: '',
            EndTimeKey: '',
            pickerOptions0: {
                disabledDate: time => {
                    return time.getTime() > Date.now();
                }
            },
            pickerOptions1: {
                disabledDate: time => {
                    // 限制结束日期大于起始日期并小于当前日期
                    return (
                        time.getTime() < new Date(this.formInline[this.startTimeKey]).getTime() || time.getTime() > Date.now()
                    );
                }
            }
        };
    },
    watch: {
        isSidebarNavCollapse(){

        }
    },
    computed: {
        ...mapGetters('permission', ['ROLETYPE', 'ISDAMZBF','isSidebarNavCollapse'])
    },
    methods: {
        _Submit() {
            console.log(this.formInline, 'formInline');
            this.$emit('submit', this.formInline);
        },
        _selectChange(k) {
            console.log(this.formInline, 'formInline');
            this.$emit('selectChange', {
                type: k,
                form: this.formInline
            });
        },
        _Reset() {
            this._Init();
            this.$emit('resetSub');
            this.$emit('submit', this.formInline);
        },
        _Change() {
            let nodeUl = document.querySelector('.v-demo-form-inline');
            let nodeLi = document.querySelector(
                '.v-demo-form-inline>div'
            );
            if (!this.change) {
                this.formList = this.dataList;
                nodeUl.style.height = null;
                this.overflow = 'auto';
            } else {
                nodeUl.style.height =
                    (nodeLi.clientHeight + this.itemBottom) * 3 + 'px';
                this.overflow = 'hidden';
            }
            this.change = !this.change;
        },
        _GetValue() {
            let nodeUl = document.querySelector('.v-demo-form-inline');
            let nodeLi = document.querySelectorAll(
                '.v-demo-form-inline>div'
            )[0];
            if (
                (nodeLi.clientHeight + this.itemBottom) * 3 < nodeUl.clientHeight
            ) {
                nodeUl.style.height = (nodeLi.clientHeight + this.itemBottom) * 3 + 'px';
                this.overflow = 'hidden';
                this.Noshow = true;
            } else {
                this.Noshow = false;
            }
        },
        _Init() {
            this.formList = this.dataList;
            this.formList.filter(Boolean).map((v, index) => {
                if (this.ROLETYPE !== '21' && this.ROLETYPE !== '22' && (v.key === 'merchantId' || v.key === 'organizerId')) {
                    this.formList[index] = null;
                } else if (v.type === 'picker-daterange-two') {
                    if (v.value.length > 0) {
                        v.value[0] && this.$set(this.formInline, v.key[0], v.value[0] + ' 00:00:00');
                        v.value[1] && this.$set(this.formInline, v.key[1], v.value[1]+' 23:59:59');
                    } else {
                        let today = new Date();
                        let curMonth = String(today.getMonth() + 1).length > 1 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1);
                        let curMonth0 = String(today.getMonth()).length > 1 ? today.getMonth() : '0' + today.getMonth();
                        let curDate = String(today.getDate()).length > 1 ? today.getDate() : '0' + today.getDate();
                        let end = today.getFullYear() + '-' + curMonth + '-' + curDate;
                        let start = today.getFullYear() + '-' + curMonth0 + '-' + curDate;
                        if (this.defaultDange) {
                            this.$set(this.formInline, v.key[0], start + ' 00:00:00');
                        } else {
                            this.$set(this.formInline, v.key[0], end + ' 00:00:00');
                        }
                        this.$set(this.formInline, v.key[1], end + ' 23:59:59');

                    }
                } else {
                    this.$set(this.formInline, v.key, v.value);
                }
            });
            this.formList = this.formList.filter(Boolean);
            // this.$nextTick(() => {
            //     this._GetValue();
            // });
        },
        TakeInit() {
            this._Init();
            this.$emit('submit', this.formInline);
        }
    },
    mounted() {
        this.dataList.map(v => {
            if (v.type === 'picker-daterange-two') {
                this.startTimeKey = v.key[0];
                this.EndTimeKey = v.key[1];
            }
        });
        if (this.defaultInit) {
            this.TakeInit();
        }
    }
};
</script>

<style lang="scss">
.v-el-search.column {
    .el-form-item__content {
        display: block;
    }
}

.v-el-search {
    .no-title {
        display: inline-block;
        margin-bottom: 22px;

        .el-form-item__label {
            visibility: hidden;
        }
    }
}
</style>
<style lang="scss" scoped>
.floatRight {
    float: right !important;
}

.el-icon-caret-top {
    transform: rotate(180deg);
}

.el-icon-caret-top.active {
    transform: rotate(0deg);
    transition: all 0.3s;
}
.MarginBottom50{
    margin-bottom:50px;
}
</style>
