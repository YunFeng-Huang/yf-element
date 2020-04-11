# zhihuijingqu-web

> A Vue.js project

## 文档

``` bash

> 先 npm 下载插件

  npm i yf-element

> 然后你可以像使用普通组件一样使用 v-el-search

# 搜索框
<v-el-search :dataList="dataList" inline @submit="findBtn">
    <el-button slot="right" @click="addActivity">
        <span>+</span>
        添加活动
    </el-button>
</v-el-search>

```
## 文档

| 序号 | 参数 | 说明 | 类型 | 必填 | 可选值 | 默认值 | 补充 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 1 | dataList | 数组 | Array | true | - | - | -|
| 2 | reset | 是否有重置按钮 | Boolean | false | - | - | - |
| 3 | loading | 加载状态 | Boolean | false | - | - | -|
| 4 | btnRight | 查询按钮左浮动还是右浮动 | Boolean | false | - | - | - |
| 5 | inline | 是否横向排练 | Boolean | false | - | - | - |
| 6 | size | 按钮样式 | String | false | - | 'medium' | - |
| 7 | @submit | 查询回调 | function | - | - | - | - |
| 8 | @resetSub | 重置回调 | function | - | - | - | - |

> -----------------------------------------------------------


| 序号 | 名字 | 说明 | 可选值 |
| ---- | ---- | ---- | ---- |
| 1 | type | 类型 | 'input、picker-date、picker-daterange、picker-daterange-two、select'｜
| 2 | label | - | - |
| 3 | key | 返回给你的key | - |
| 4 | value | value | - |
| 5 | placeholder | - | - |
| 6 | width | 宽度 | 如 200px |
| 7 | options | 配置 | - |

## dataList
```
dataList:[
{
    type: 'input',
    label: '订单号',
    key: 'orderNum',
    placeholder:'请输入订单号',
    value: ''
},
{
    type: 'picker-date',
    label: '开始日期',
    width:'300',
    key: 'createStartTime',
    value: '',
    options:{
        disabledDate: (time) => {
            return time.getTime() < Date.now() - 8.64e7*366;
        }
    }
},
{
    type: 'picker-date',
    label: '结束日期',
    width:'300',
    hidden:true,
    key: 'createEndTime',
    value: '',
    options:{
        disabledDate: (time) => {
            let startDateObj = new Date(this.form.createStartTime);
            return time.getTime() < startDateObj.getTime()  || time.getTime() < Date.now() - 8.64e7*366;
        }
    }
},
{
  type: 'picker-daterange-two',
  label: '时间段',
  key: 'daterange',
  value: '',
  options: {
      onPick: (obj) => {
          this.pickerMinDate = new Date(obj.minDate).getTime();
          if (obj.maxDate){
              this.pickerMinDate=null;
          }
      },
      disabledDate:(time)=> {
          if (this.pickerMinDate) {
              return time.getTime() < new Date(this.pickerMinDate).getTime() - 8.64e7 || time.getTime() < this.pickerMinDate ;
          }
      }
  }
},
{
    type: 'select',
    label: '分账状态',
    key: 'profitStatus',
    value: '',
    options:[{
        value: '',
        label: '全部'
        }, {
        value: 'success',
        label: '成功'
        }, {
        value: 'fail',
        label: '失败'
        }, {
        value: 'watting',
        label: '等待分账'
    }]
},
]


# 报表
<v-el-table :tableData="tableData" :tableColumn="tableColumn"></v-el-table>
     
tableData: [
  {
    id: '12987122',
    name: '王小虎0',
    amount1: '234',
    amount2: '3.2',
    amount3: 10
  }, {
    id: '12987123',
    name: '王小虎1',
    amount1: '165',
    amount2: '4.43',
    amount3: 12
  },
],
tableColumn:[
  {
    props:'id',
    label:'姓名',
    width:''
  },
  {
    props:'name',
    label:'数值',
    width:''
  }
],
```


