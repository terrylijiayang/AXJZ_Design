<template>
  <div>
    <div id="myChartFund" :style="{width: '600px', height: '220px',margin:'0px auto'}"></div>
  </div>
</template>

<script>
  import {BackService} from './backstageLoginService'
    export default {
      name: "near-six-month-fund",
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
          rasied:[],
          used:[],
        }
      },
      mounted() {
        BackService.getSixMonth().then(res => {
          this.rasied=res.data.raised;
          this.used=res.data.used;
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
          let myChart = this.$echarts.init(document.getElementById('myChartFund'))
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
            legend: {
              data: ['项目筹集金额', '项目可使用金额']
            },
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
                 name: '项目筹集金额',
                 type: 'line',
                 stack: '总量',
                 data: this.rasied
               },
               {
                 name: '项目可使用金额',
                 type: 'line',
                 stack: '总量',
                 data: this.used
               },
            ]
          });
        },
      }
    }
</script>

<style scoped>

</style>
