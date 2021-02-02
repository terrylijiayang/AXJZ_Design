<template>
  <div id="myPie" :style="{width: '300px', height: '220px'}"></div>
</template>

<script>
  import {BackService} from './backstageLoginService'

  export default {
      name: "investment-pie",
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
        donationRatio:[],
      }
    },
    mounted() {
      BackService.getDonationnRatio().then(res => {
        this.donationRatio=res.data;
        this.initChart()
      })
      },
    methods: {
        initChart() {
          let myChart = this.$echarts.init(document.getElementById('myPie'))
          myChart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
           /* legend: {
              orient: 'vertical',
              x: 'left',
              data: ['1万元以下', '1-10万', '10-40万', '40万以上']
            },*/
            series: [
              {
                name: '捐款金额',
                type: 'pie',
                radius: ['60%', '80%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '18',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data:this.donationRatio
              }
            ]
          })
        }
      }
    }


</script>

<style scoped>

</style>
