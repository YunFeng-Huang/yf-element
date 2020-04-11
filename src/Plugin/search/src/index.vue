<template>
<div class="v-el-search" :class="{'column':!inline}">
  <el-form ref="form" inline :model="formInline" class="v-demo-form-inline" :style="{'overflow':overflow}">
  <el-form-item :label="item.label" v-for="(item,index) in formList" :key="index" :style="{'width':item.width||'auto'}" v-if="!item.hidden">
      <el-input :size="size" v-if="item.type == 'input'" v-model="formInline[item.key]" :placeholder="item.placeholder||'请输入...'"></el-input>
      <el-select :size="size" v-if="item.type == 'select'" v-model="formInline[item.key]" :placeholder="item.placeholder||'请选择...'">
        <el-option v-for="item in item.options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
      :size="size"
      v-if="item.type == 'picker-date'"
      v-model="formInline[item.key]"
      type="date"
      :picker-options="item.options"
      :format="item.format || 'yyyy-MM-dd'"
      :value-format="item.valueFormat || 'yyyy-MM-dd'"
      placeholder="选择日期">
      </el-date-picker>
      <el-date-picker
      :size="size"
      v-if="item.type == 'picker-daterange'"
      v-model="formInline[item.key]"
      type="daterange"
      :format="item.format || 'yyyy-MM-dd'"
      :value-format="item.valueFormat || 'yyyy-MM-dd'"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
      </el-date-picker>
      <el-date-picker
        v-if="item.type == 'picker-daterange-two'"
        v-model="formInline[item.key]"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        style="width:100%"
        :format="item.format || 'yyyy-MM-dd'"
        :value-format="item.valueFormat || 'yyyy-MM-dd'"
        :picker-options="item.options"
        end-placeholder="结束日期">
        </el-date-picker>
  </el-form-item>

  <el-form-item label="1" class="no-title floatRight">
     <slot name="right"></slot>
  </el-form-item>
  <el-form-item v-if="!change" label="1" class="no-title" :class="{'floatRight':btnRight}">
    <div class="btn-w">
      <el-button type="primary" :loading="loading" @click.prevent="_Submit">查询</el-button>
      <el-button v-if="reset" @click="_Reset">重置</el-button>
      <slot></slot>
      <el-button @click="_Change" v-if="Noshow"> <i class="el-icon-caret-top" :class="{'active':change}"></i></el-button>
    </div>
  </el-form-item>
</el-form>
<div class="btn-w clearfix floatRight" style="margin-bottom: 10px;" v-if="Noshow">
      <el-button type="primary" :loading="loading" @click.prevent="_Submit">查询</el-button>
      <el-button v-if="reset" @click="_Reset">重置</el-button>
      <slot></slot>
      <el-button @click="_Change" v-if="Noshow"> <i class="el-icon-caret-top" :class="{'active':change}"></i></el-button>
    </div>
</div>
</template>

<script>
export default {
    name: 'VElSearch',
    props: {
        dataList: {
            type: Array,
            required: true
        },
        //是否又重置按钮
        reset: {
            type: Boolean,
            default: false
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
        btnRight:{
            type: Boolean,
            default: false
        },
        // 是否横向排练
        inline: {
            type: Boolean,
            default: false
        },
        // 按钮样式
        size: {
            type: String,
            default: 'medium'
        }


    },
    data() {
        return {
            formInline: {},
            change: false,
            formList: [],
            Noshow: false,
            overflow: 'auto',
            itemBottom:22
        };
    },
    methods: {
        _Submit() {
            console.log(this.formInline, 'formInline');
            this.$emit('submit', this.formInline);
        },
        _Reset() {
            for (let key in this.formInline) {
                this.formInline[key] = '';
            }
            this.$emit('resetSub');
        },
        _Change() {
            let node_ul = document.querySelector('.v-demo-form-inline');
            let node_li = document.querySelector('.v-demo-form-inline .el-form-item');
            if (!this.change) {
                this.formList = this.dataList;
                node_ul.style.height = null;
                this.overflow = 'auto';
            } else {
                node_ul.style.height = (node_li.clientHeight + this.itemBottom) * 3 + 'px';
                this.overflow = 'hidden';
            }
            this.change = !this.change;
        },
        _GetValue() {
            let node_ul = document.querySelector('.v-demo-form-inline');
            let node_li = document.querySelectorAll('.v-demo-form-inline .el-form-item')[0];
            if ((node_li.clientHeight + this.itemBottom) * 3 < node_ul.clientHeight) {
                node_ul.style.height = (node_li.clientHeight + this.itemBottom) * 3 + 'px';
                this.overflow = 'hidden';
                this.Noshow = true;
            } else {
                this.Noshow = false;
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.formList = this.dataList;
            this.formList.map(v => {
                this.$set(this.formInline, v.key, v.value);
            });
            setTimeout(() => {
                this._GetValue();
            }, 100);
        });
    }
};
</script>
<style lang="scss">
.v-el-search.column{
  .el-form-item__content{
    display: block;
  }
}
.v-el-search{
  .no-title{
    .el-form-item__label{
      visibility: hidden;
    }
  }
}
</style>
<style lang="scss" scoped>
.floatRight{
  float: right!important;
}
.el-icon-caret-top{
  transform: rotate(180deg);
}
.el-icon-caret-top.active {
  transform: rotate(0deg);
  transition: all 0.3s;
}
</style>
