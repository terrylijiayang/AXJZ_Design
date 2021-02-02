<template>
    <div>
      <div id="myChart" :style="{width: '600px', height: '220px',margin:'0px auto'}"></div>
    </div>
</template>

<script>
  import {BackService} from './backstageLoginService'

  export default {
      name: "near-six-month",
      props: {
        width: {
          type: String,
          default: ''
        },
        height: {
          type: String,
          default: ''
        }
      },
      data() {
        return {
          optionData: [],
          // legendData: ['捐款总额', '营收', '净利润', '直接访问', '搜索引擎'],
          xAxisData: this.getNearSixMonth(),
          nums:[],
        }
      },
      mounted() {
        BackService.getSixMonth().then(res => {
          this.nums=res.data.nums;
          this.initChart()
        })
      },
      methods: {
        getNearSixMonth() {
          let value = []
          let currentMonth = 0
          if (new Date().getMonth() >= 6) {
            currentMonth = new Date().getMonth()
            for (let i = 0; i < 6; i++) {
              value.push(new Date().getFullYear() + '-' + (currentMonth + i - 5))
            }
          } else {
            currentMonth = new Date().getMonth()
            for (let i = 1; i <= 6; i++) {
              if ((currentMonth + i - 5) < 1) {
                value.push((new Date().getFullYear() - 1) + '-' + (currentMonth + i + 7))
              } else {
                value.push(new Date().getFullYear() + '-' + (currentMonth + i - 5))
              }
            }
          }
          return value
        },
        initChart(){
          let myChart = this.$echarts.init(document.getElementById('myChart'))
          // 绘制图表
          myChart.setOption({
            tooltip: {
              trigger: 'axis'
            },
            grid: {
              left: '50px',
              right: '10px',
              bottom: '30px',
              top: '10px'
            },
           /* legend: {
              // data: ['慈善项目总数', '项目筹集金额', '项目可使用金额']
              data: ['慈善项目总数']
            },*/
            xAxis: {
              type: 'category',
              boundaryGap: true,
              data: this.xAxisData
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '慈善项目总数',
                type: 'line',
                stack: '总量',
                data: this.nums
              },
            ]
          });
        },
      }
    }
</script>

<style scoped>

</style>
