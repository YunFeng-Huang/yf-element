<template>
    <div>
        <el-table class="cur-table"
            :data="tableData"
            ref="multipleTable"
            :header-cell-style="$root.getRowClass"
            style="width: 100%"
            v-loading="$root.loading"
            :row-key="getRowKey"
            @selection-change="handleSelectionChange"
            :border = "border"
            :show-summary = "showSummary"
            :span-method="arraySpanMethod"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            >
            <template v-for="(item0,index0) in tableColumn">
                <template v-if="item0.type&&item0.type==='selection'">
                    <el-table-column :key="index0" type="selection" width="70" :reserve-selection="true"></el-table-column>
                </template>
                <template v-else-if="item0.type&&item0.type==='index'">
                    <el-table-column :key="index0" type="index" label="序号" width="60"></el-table-column>
                </template>
                <template v-else-if="item0.options&&item0.options.length>0">
                    <el-table-column
                        :key="index0"
                        :prop="item0.prop?item0.prop:''"
                        :label="item0.label?item0.label:''"
                        :min-width="item0.width?item.width:''" show-overflow-tooltip>
                        <template v-slot="scope">
                            <span v-if="(scope.row&&scope.row[item0.prop]!=='')||scope.row[item0.prop]===0">
                                <i v-if="scope.row.iconUrlPath&&scope.row.iconUrlPath.length>0&&item0.showIcon"
                                    class="table-pay"
                                    :style="{background:`url(${scope.row.iconUrlPath})no-repeat center/contain`,marginRight:'4px'}"></i>
                                <span v-for="(item1,index1) in item0.options" :key="index1">
                                    <span :class="item0.class&&item0.class[index1].value===item1.value?item0.class[index1].label:''" v-if="scope.row[item0.prop]==item1.value">
                                        {{item1.label}}
                                    </span>
                                </span>
                                <span v-if="item0.showTooltip&&scope.row[item0.tooltipProp]">
                                    <el-tooltip class="item pos-ab" effect="dark" offset="30"  placement="top-start">
                                        <div slot="content">{{scope.row[item0.tooltipProp]}}</div>
                                        <el-button type="text" class="el-icon-info"></el-button>
                                    </el-tooltip>
                                </span>
                            </span>
                            <span v-else>-</span>
                        </template>
                    </el-table-column>
                </template>
                <template v-else-if="item0.type&&item0.type==='operation'" >
                    <el-table-column
                        :key="index0"
                        :label="item0.label?item0.label:''"
                        :min-width="item0.width?item0.width:''">
                        <template v-slot="scope">
                            <slot :row="scope.row" :index="scope.$index"></slot>
                        </template>
                    </el-table-column>
                </template>
                <template v-else>
                    <el-table-column
                        :key="index0"
                        :prop="item0.prop?item0.prop:''"
                        :label="item0.label?item0.label:''"
                        :min-width="item0.width?item0.width:''" show-overflow-tooltip>
                        <template v-slot="scope">
                            <span>{{scope.row[item0.prop]||scope.row[item0.prop]===0?scope.row[item0.prop]:'-'}}</span>
                            <span v-if="item0.twoProp">/ {{scope.row[item0.twoPropName]}}</span>
                        </template>
                    </el-table-column>
                </template>
            </template>
        </el-table>
    </div>
</template>

<script>
//twoProp 是否显示第二个字段 twoPropName 第二个字段名字
export default {
    name: 'VElTable',
    // props: ['tableData', 'tableColumn','isOpenDialog','border','showSummary','show'], //isOpenDialog判断弹框打开，清理选中
    props:{
        tableData: {
            type: Array
        },
        tableColumn:{
            type: Array
        },
        isOpenDialog:{
            type:Boolean,
            default: false
        },
        border:{
            type:Boolean,
            default: false
        },
        showSummary:{
            type:Boolean,
            default: false
        },
        showKey:{
            type:Boolean,
            default: false
        }
    },
    data() {
        return {
            spanArr: [],
            pos: 0
        };
    },
    created() {
    },
    watch:{
        isOpenDialog(){
            this.$refs.multipleTable&&this.$refs.multipleTable.clearSelection();
        }
    },
    mounted(){

    },
    methods: {
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (!this.$parent.colspanMethods) {
                return;
            }
            let resultObject = this.$parent.colspanMethods({row, column, rowIndex, columnIndex});
            return resultObject;
        },
        handleSelectionChange(value){
            this.$emit('setSelectList',value);
        },
        getRowKey(row){
            if (this.showKey){
                let rowKey = this.$parent.getRowKey(row);
                return rowKey;
            }
            return row.key;


        }
    }
};
</script>
<style>
.el-tooltip__popper{max-width:40%;}
</style>
<style lang="scss" scoped>
    .table-pay {
        display: inline-block;
        width: 18px;
        height: 18px;
        background-repeat: no-repeat;
        background-size: 100%;
        vertical-align: middle;
    }
    .green {
        color: #1eb713;
    }
    .red {
        color: #f01313;
    }
</style>
