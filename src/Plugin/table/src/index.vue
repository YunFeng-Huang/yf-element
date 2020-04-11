<template>
  <div>
    <el-table
      :data="tableData"
      :span-method="arraySpanMethod"
      :header-cell-style="getRowClass"
      border
      style="width: 100%">
      <el-table-column
        v-for="item,index in tableColumn"
        :key="index"
        :prop="item.props"
        :label="item.label"
        :width="item.width">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name:'VElTable',
    props:['tableData','tableColumn'],
    data() {
        return {
            spanArr:[],
            pos:0
        };
    },
    created() {
        this.getSpanArr(this.tableData);
    },
    methods: {
        getRowClass({rowIndex}) {
            if (rowIndex == 0) {
                return {
                    'background':'#F6F8FC',
                    'font-size':'1rem',
                    'font-family':'MicrosoftYaHei',
                    'font-weight':'400',
                    'color':'rgba(102,102,102,1)',
                    'padding':'0.58rem 0'
                };
            }
            return '';

        },
        //列表合计逻辑
        getSummaries (param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                } else if (index == 3 || index == 4|| index == 5) {
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return (Number(prev) + Number(curr)).toFixed(2);
                            }
                            return Number(prev).toFixed(2);

                        }, 0);
                    } else {
                        sums[index] = '';
                    }
                } else {
                    sums[index] = '--';
                }
            });
            return sums;
        },
        getSpanArr(data) {
            for (var i = 0; i < data.length; i++) {
                if (i === 0) {
                    this.spanArr.push(1);
                    this.pos = 0;
                } else {
                // 判断当前元素与上一个元素是否相同
                    if (data[i].name === data[i - 1].name) {
                        this.spanArr[this.pos] += 1;
                        this.spanArr.push(0);
                    } else {
                        this.spanArr.push(1);
                        this.pos = i;
                    }
                }
            }
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 1) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                };
            }
        }
    }
};
</script>
