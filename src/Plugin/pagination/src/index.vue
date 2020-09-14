<template>
    <el-pagination background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageIndex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="prev, pager, next,sizes, jumper"
        :total="total"
        v-if="total != 0">
    </el-pagination>
</template>

<script>
export default {
    name: 'VElPagination',
    props: {
        total:{
            type:Number,
            required:true
        },
        type:{
            type:String,
            default:'Object'
        },
        curPageIndex:{
            type:Number,
            default:1
        }
    },
    data() {
        return {
            pageIndex:1,
            pageSize:10
        };
    },
    watch:{
        curPageIndex(val,oldval){
            this.pageIndex = val;
        }
    },
    methods: {
        handleSizeChange (val) {
            this.pageSize = val;
            this.$emit('submit',{
                pageIndex:this.pageIndex,
                pageSize:this.pageSize
            });
        },
        handleCurrentChange (val) {
            console.log(val);
            this.pageIndex = val;
            this.$emit('submit',{
                pageIndex:this.pageIndex,
                pageSize:this.pageSize
            });
        }
    }
};
</script>