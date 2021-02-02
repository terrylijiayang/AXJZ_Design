<template>
  <div class="homepage-container">
    <div class="home-total">
      <div class="home-total-item" v-for="(item, index) of homeTotalData">
        <div class="wrapper-item">
          <p class="title">{{item.title}}（元）</p>
          <!--<p class="value digital-number" ref="countup" style=" font-family:digital;">{{item.value}}</p>-->
          <p class="value digital-number" >
            <countTo :startVal='0' :endVal='item.value' :duration='5000'></countTo>
          </p>

          <!--<p class="value digitText" >{{item.value}}</p>-->
          <!--  <color-line :id='"main"+index' :color="item.color" :optionData="item.data" width="180px" height="70px"></color-line>-->
        </div>
      </div>
    </div>

    <el-row class="home-part1" :gutter="0">
      <el-col :span="12">
        <div class="near-six-month">
          <div class="title sixtitle">
            <p class="title-value">平台近6个月的项目记录（个）</p>
          </div>
          <div class="content" ref="near-six-month-chart">
            <near-six-month width="100%" height="100%"></near-six-month>
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="detail-item-wrapper">
        <div class="home-detail-item" :style="{ background: item.color}" v-for="(item, index) of homeDetailItem">
          <div class="name" style="  padding: 30px 0 10px 0;text-align: center;font-size: 20px;">{{item.name}}</div>
          <div class="value" style="text-align: center;">
            <span class="num" style="font-size: 28px;">{{(item.value / 10000).toFixed(4)}}</span>万
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="rank">
          <div class="title sixtitle">
            <p class="title-value">慈善爱心榜TOP5</p>
          </div>
          <div class="content" ref="rankContent">
            <ul class="wrapper-user">
              <li v-for="item of rankList" class="user-item">
                <img class="avatar" :src="getImgUrl(item.avatar)" width="35" height="35" loading="lazy" alt="">
                <div class="user-info">
                  <p class="name">昵称：{{item.name}}</p>
                  <p class="value">捐款{{item.value}}元</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row class="home-part2" :gutter="0">
      <el-col :span="12">
        <div class="bad-debt">
          <div class="title sixtitle">
            <p class="title-value">平台近6个月的善款记录（元）</p>
          </div>
          <div class="content" ref="near-six-month-chart1">
            <near-six-month-fund width="100%" height="100%"></near-six-month-fund>
          </div>
         <!-- <div class="content">
            <div class="bad">
              <div class="total">
                <div class="total1">
                  <p>坏账金额</p>
                  <p><span class="num">0</span>元</p>
                </div>
                <div class="total2">
                  <p>坏账比例</p>
                  <p><span class="num">0</span>%</p>
                </div>
              </div>
              <div class="chart">
                <p class="title">本平台自2015年1月上线以来无坏账</p>
                <p class="line"></p>
                <p class="line"></p>
              </div>
            </div>
            <div class="overdue">
              <div class="total">
                <div class="total1">
                  <p>逾期金额</p>
                  <p><span class="num">0</span>元</p>
                </div>
                <div class="total2">
                  <p>逾期比例</p>
                  <p><span class="num">0</span>%</p>
                </div>
              </div>
              <div class="chart">
                <p class="title">本平台自2015年1月上线以来无逾期</p>
                <p class="line"></p>
                <p class="line"></p>
              </div>
            </div>
          </div>-->
        </div>
      </el-col>

      <el-col :span="12">
        <div class="financing-sprinkled">
          <div class="title">
            <p class="title-value">平台用户捐款情况</p>
          </div>
          <div class="content" ref="">
            <!-- 投资 -->
            <div class="investment">
              <span class="title">捐款金额比例</span>
              <investment-pie width="100%" height="50%"></investment-pie>
            </div>
            <!-- 融资 -->
            <div class="financing">
              <span class="title">捐款参与度</span>
              <!--<financing-pie width="100%" height="50%"></financing-pie>-->
              <div class="detail" >
                  <span class="detail-item" v-for="(donationNum,index) in donationNums">
                  {{donationNum.name}}
                  <br>
                  {{(donationNum.value*100).toFixed(2)}} %
                </span>
              <!--  <span class="detail-item">
                  3-6个月
                  <br>
                  29.41%
                </span>
                <span class="detail-item">
                  6-12个月
                  <br>
                  32.77%
                </span>
                <span class="detail-item">
                  12个月以上
                  <br>
                  18.91%
                </span>-->
              </div>
            </div>
          </div>
        </div>
      </el-col>


    </el-row>

  </div>
</template>

<script>
  import {BackService} from './backstageLoginService'
  import NearSixMonth from './near-six-month'
  import NearSixMonthFund from './near-six-month-fund'
  import InvestmentPie from './investment-pie'
  import countTo from 'vue-count-to'
  // import CountUp from 'countup.js'
  export default {
    data() {
      return {
        homeTotalData: [],
        homeDetailItem: [],
        rankList: [],
        numAnim: null,
        donationNums:[],
      };
    },
    components:{
      NearSixMonth,
      NearSixMonthFund,
      InvestmentPie,
      countTo
    },
    mounted(){
      this.getData();
    },
    methods:{
   /*   initCountUp() {
        this.$nextTick(() => {
          let countupLength = this.$refs.countup.length
          let i = 0
          for (i; i < countupLength; i++) {
            this.numAnim = new CountUp(this.$refs.countup[i], 0, this.$refs.countup[i].innerText, 2, 1.5)
            this.numAnim.start()
          }
        })
      },*/
      getImgUrl(icon) {
        return require('../../../assets/images/' + icon );
      },
      getData(){
        BackService.getBackHome().then(res => {
          this.homeTotalData=res.data.homeTotalDTOS;
          this.homeDetailItem=res.data.homeDetailItemDTOS;
          this.rankList=res.data.homeRankListDTOS;
        }).catch(err => {});
        BackService.getDonationNums().then(res => {
          this.donationNums=res.data;
        }).catch(err => {});
     /*   this.homeTotalData=[
          {title:'平台善款总额',value:111230},
          {title:'已为申请人受益',value:111230},
          {title:'待使用善款',value:111230},
          {title:'已使用善款',value:111230},
        ]
        this.homeDetailItem=[
          {name:'注册用户数',value:122200,color:'rgb(236, 64, 122)'},
          {name:'人均捐款额',value:1332200,color:'rgb(171, 71, 188)'},
          {name:'慈善项目量',value:1211100,color:'rgb(33, 150, 243)'},
          {name:'帮助用户量',value:1224440,color:'rgb(0, 150, 136)'},
        ]
        this.rankList=[
          {name:'小明',value:2200,avatar:'https://s2.ax1x.com/2020/02/26/3aZoa8.png'},
          {name:'小红',value:100,avatar:'https://s2.ax1x.com/2020/02/26/3aZoa8.png'},
          {name:'小花',value:100,avatar:'https://s2.ax1x.com/2020/02/26/3aZoa8.png'},
          {name:'小明明',value:100,avatar:'https://s2.ax1x.com/2020/02/26/3aZoa8.png'},
          {name:'小红包',value:100,avatar:'https://s2.ax1x.com/2020/02/26/3aZoa8.png'},
        ]*/
      },
    },
  }
</script>

<style scoped>
  .homepage-container{
    min-width: 800px;
  }
  .home-total {
    width: 100%;
    min-width: 800px;
    height: 160px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin: 0 0 15px 0;
  }
  .home-total .home-total-item {
    box-sizing: border-box;
    display: inline-block;
    width: 25%;
    height: 100%;
    padding: 15px 0;
    vertical-align: top;
  }
  .home-total .home-total-item .wrapper-item {
    height: 100%;
    padding: 0 20px;
    border-right: 1px solid #ccc;
    text-align: center;
  }
  .home-total .home-total-item .wrapper-item .title {
    margin: 0px 0;
  }
  .home-total .home-total-item .wrapper-item .value {
    margin: 5px 0;
    font-size: 34px;
    color: #ffc107;
  }
  .home-total .home-total-item :last-child  .wrapper-item{
    border: none;
  }
  .home-part1 {
    margin: 0 !important;
  }
  .home-part1 .near-six-month {
    border: 1px solid #eee;
    height: 300px;
  }
  .home-part1 .near-six-month .title {
    background: #dde3ef;
    padding: 10px 0;
  }
  .home-part1 .near-six-month .title .title-value {
    margin-left: 4px;
    text-indent: 4px;
    color: #666;
  }
  .near-six-month .title .title-value :before {
     display: inline-block;
     content: '';
     width: 4px;
     height: 16px;
     background: purple;
     margin-right: 4px;
     border-radius: 4px;
     vertical-align: middle;
   }
  .sixtitle :before{
    display: inline-block;
    content: '';
    width: 4px;
    height: 16px;
    background: purple;
    margin-right: 4px;
    border-radius: 4px;
    vertical-align: middle;
  }
  .home-part1 .near-six-month .content {
    width: 100%;
    height: 260px;
  }
  .home-part1 .detail-item-wrapper {
    display: flex;
    height: 300px;
    overflow: hidden;
    flex-wrap: wrap;
    flex-flow: row wrap;
    justify-content: space-around;
    align-content: space-around;
    padding: 0 10px;
    color: #fff;
  }
  .home-part1 .detail-item-wrapper .home-detail-item {
    flex: 0 0 48%;
    height: 145px;
    border: 1px solid #eee;
    background-image: linear-gradient(rgba(255, 255, 255, .1), rgba(255, 255, 255, .3)) !important;
    cursor: pointer;
  }
  .home-part1 .detail-item-wrapper .home-detail-item:hover {
    background-image: none !important;
  }
  .home-part1 .detail-item-wrapper .home-detail-item:nth-child(3), .home-detail-item:nth-child(4) {
    margin-top: 10px;
  }
  .home-part1 .detail-item-wrapper.home-detail-item .name{
    padding: 30px 0 10px 0;
    text-align: center;
    font-size: 20px;
  }
  .home-part1 .detail-item-wrapper.home-detail-item .value {
    text-align: center;
  }
  .home-part1 .detail-item-wrapper.home-detail-item .value .num {
    font-size: 28px;
  }
  .home-part1 .rank .title {
    background: #dde3ef;
    padding: 10px 0;
  }
  .home-part1 .rank .title .title-value {
    margin-left: 4px;
    text-indent: 4px;
    color: #666;
  }
  .home-part1 .rank .title .title-value :before {
     display: inline-block;
     content: '';
     width: 4px;
     height: 16px;
     background: purple;
     margin-right: 4px;
     border-radius: 4px;
     vertical-align: middle;
   }
  .home-part1 .rank .content {
    position: relative;
    width: 100%;
    height: 228px;
    overflow: auto;
  }
  .home-part1 .rank .content .wrapper-user {
    margin: 0;
    list-style: none;
    padding-left: 0;
  }
  .home-part1 .rank .content .wrapper-user .user-item {
    height: 60px;
    padding: 5px;
  }
  .home-part1 .rank .content .wrapper-user .user-item .avatar {
    border: 1px solid #888;
    border-radius: 100px;
    vertical-align: inherit;
  }
  .home-part1 .rank .content .wrapper-user .user-item .user-info {
    display: inline-block;
    padding-left: 5px;
  }
  .home-part1 .rank .content .wrapper-user .user-item .user-info .name {
    color: #999;
    font-size: 14px;
  }
  .home-part1 .rank .content .wrapper-user .user-item .user-info .value {
    color: red;
  }

  .home-part2 {
    margin-top: 15px;
  }
  .home-part2 .financing-sprinkled {
    border: 1px solid #eee;
    height: 350px;
  }
  .home-part2 .financing-sprinkled .title {
    background: #dde3ef;
    padding: 10px 0;
  }
  .home-part2 .financing-sprinkled .title .title-value {
    margin-left: 4px;
    text-indent: 4px;
    color: #666;
  }
  .home-part2 .financing-sprinkled .title :before {
     display: inline-block;
     content: '';
     width: 4px;
     height: 16px;
     background: purple;
     margin-right: 4px;
     border-radius: 4px;
     vertical-align: middle;
   }
  .home-part2 .financing-sprinkled .content {
    display: inline-flex;
    width: 100%;
    height: 310px;
  }
  .home-part2 .financing-sprinkled .content .investment {
    height: 310px;
    width: 50%;
  }
  .home-part2 .financing-sprinkled .content .investment .title {
    display: inherit;
    text-align: center;
    background: transparent;
    padding-top: 20px;
  }
  .home-part2 .financing-sprinkled .content .investment .detail {
    margin-left: 10px;
    text-align: center;
  }
  .home-part2 .financing-sprinkled .content .investment .detail .detail-item {
    display: inline-block;
    width: 40%;
    margin: 5px;
    padding-left: 5px;
    border-left: 5px solid #ccc;
    color: #666;
  }
  .home-part2 .financing-sprinkled .content .financing {
    height: 310px;
    width: 50%;
  }
  .home-part2 .financing-sprinkled .content .financing .title {
    display: inherit;
    text-align: center;
    background: transparent;
    padding-top: 20px;
  }
  .home-part2 .financing-sprinkled .content .financing .detail {
    margin-left: 10px;
    text-align: center;
  }
  .home-part2 .financing-sprinkled .content .financing .detail .detail-item {
    display: inline-block;
    width: 40%;
    margin: 5px;
    padding-left: 5px;
    border-left: 5px solid #ccc;
    color: #666;
  }
  .home-part2 .bad-debt {
    height: 350px;
    min-width: 540px;
    /*margin-left: 10px;*/
    border: 1px solid #eee;
  }
  .home-part2 .bad-debt .title {
    background: #dde3ef;
    padding: 10px 0;
  }
  .home-part2 .bad-debt .title .title-value {
    margin-left: 4px;
    text-indent: 4px;
    color: #666;
  }
  .home-part2 .bad-debt .title .title-value :before {
     display: inline-block;
     content: '';
     width: 4px;
     height: 16px;
     background: purple;
     margin-right: 4px;
     border-radius: 4px;
     vertical-align: middle;
   }
  .home-part2 .bad-debt .content {
    height: inherit;
  }
  .home-part2 .bad-debt .content .bad {
    height: 50%;
    padding: 20px 30px;
  }
  .home-part2 .bad-debt .content .bad .total {
    display: inline-block;
    width: 200px;
    color: #666;
    vertical-align: top;
  }
  .home-part2 .bad-debt .content .bad .total .total1 {
    text-align: center;
  }
  .home-part2 .bad-debt .content .bad .total .total1 .num {
    font-size: 24px;
  }
  .home-part2 .bad-debt .content .bad .total .total2 {
    text-align: center;
    margin-top: 20px;
  }
  .home-part2 .bad-debt .content .bad .total .total2 .num {
    font-size: 24px;
  }
  .home-part2 .bad-debt .content .bad .chart {
    display: inline-block;
    margin-left: 15px;
  }
  .home-part2 .bad-debt .content .bad .chart .title {
    background: none;
    border-bottom: 1px solid #ccc;
  }
  .home-part2 .bad-debt .content .bad .chart .line {
    border-bottom: 1px solid #ccc;
    padding-bottom: 30px;
  }
  .home-part2 .bad-debt .content .bad .chart .line :last-child {
     border-bottom-color: #000;
   }
/*  .home-part2 .bad-debt .content .bad .chart :after {
     content: '0';
     position: relative;
     font-size: 70px;
     left: 20px;
     top: -70px;
     color: #ddd;
   }*/
  .home-part2 .bad-debt .content .overdue {
    padding: 10px 30px;
    height: 50%;
  }
  .home-part2 .bad-debt .content .overdue .total {
    display: inline-block;
    width: 200px;
    color: #666;
    vertical-align: top;
  }
  .home-part2 .bad-debt .content .overdue .total  .total1 {
    text-align: center;
  }
  .home-part2 .bad-debt .content .overdue .total  .total1 .num {
    font-size: 24px;
  }
  .home-part2 .bad-debt .content .overdue .total .total2 {
    text-align: center;
    margin-top: 20px;
  }
  .home-part2 .bad-debt .content .overdue .total .total2 .num {
    font-size: 24px;
  }
  .home-part2 .bad-debt .content .overdue .chart {
    display: inline-block;
    margin-left: 15px;
  }
  .home-part2 .bad-debt .content .overdue .chart .title {
    background: none;
    border-bottom: 1px solid #ccc;
  }
  .home-part2 .bad-debt .content .overdue .chart .line {
    border-bottom: 1px solid #ccc;
    padding-bottom: 30px;
  }
  .home-part2 .bad-debt .content .overdue .chart .line :last-child {
     border-bottom-color: #000;
   }
/*  .home-part2 .bad-debt .content .overdue .chart :after {
     content: '0';
     position: relative;
     font-size: 70px;
     left: 20px;
     top: -70px;
     color: #ddd;
   }*/
  .home-part2 .el-col {
    border-radius: 4px;
  }
  .home-part2 .bg-purple-dark {
    background: #99a9bf;
  }
  .home-part2 .bg-purple {
    background: #d3dce6;
  }
  .home-part2 .bg-purple-light {
    background: #e5e9f2;
  }
  .home-part2 .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .digitText{
    /*width: 300px;
    height: 200px;
    position: absolute;
    left: 50%;*/
    margin-left: -150px;
    background-image: -webkit-linear-gradient(left,blue,#66ffff 10%,#cc00ff 20%,#CC00CC 30%, #CCCCFF 40%, #00FFFF 50%,#CCCCFF 60%,#CC00CC 70%,#CC00FF 80%,#66FFFF 90%,blue 100%);
    -webkit-text-fill-color: transparent;/* 将字体设置成透明色 */
    -webkit-background-clip: text;/* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
    -webkit-background-size: 200% 100%;
    -webkit-animation: masked-animation 4s linear infinite;
    font-size: 35px;
  }
  @keyframes masked-animation {
    0% {
      background-position: 0  0;
    }
    100% {
      background-position: -100%  0;
    }
  }
</style>
