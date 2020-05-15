<template>
  <div id="home">
    <div class="top">
      <!-- 顶部 导航栏 -->
      <div class="title">
        <h3>实验室检测平台</h3>
        <p></p>
      </div>
      <div class="nav"></div>
    </div>
    <div class="content">
      <!-- 水表 电表 -->
      <div class="left">
        <div class="electricity_meter">
          <div class="electricty_title">
            <p>电表能耗情况</p>
            <el-radio-group v-model="electricty_time">
              <el-radio-button label="electricty_day">日</el-radio-button>
              <el-radio-button label="electricty_week">周</el-radio-button>
              <el-radio-button label="electricty_year">年</el-radio-button>
            </el-radio-group>
          </div>
          <div class="electricity_charts" ref="electricity_charts" style="width:90%; height:90%"></div>
        </div>
        <div class="water_meter">
          <div class="water_title">
            <p>水表能耗情况</p>
            <el-radio-group v-model="water_time">
              <el-radio-button label="water_day">日</el-radio-button>
              <el-radio-button label="water_week">周</el-radio-button>
              <el-radio-button label="water_year">年</el-radio-button>
            </el-radio-group>
          </div>
          <div class="water_charts" ref="water_charts" style="width:80%; height:90%"></div>
        </div>
      </div>
      <div class="main">
        <div class="main_top">
          <!-- 实景图 -->
          <div class="live_action">
            <h3></h3>
            <div></div>
          </div>
          <!-- 温湿度情况 警报列表 -->
          <div class="main_right">
            <div class="humiture_meter">
              <el-carousel :interval="5000000" arrow="never" height="270px">
                <el-carousel-item v-for="item in 5" :key="item">
                  <h5>温湿度情况</h5>
                  <div class="humiture_table">
                    <div class="table_tittle">30栋负一层</div>
                    <div class="table_main">
                      <el-table
                        :data="tableData"
                        align="center"
                        stripe
                        style="width: 100%"
                        height="210px"
                      >
                        <el-table-column prop="date" align="center" label="实验室名称" width="150"></el-table-column>
                        <el-table-column prop="name" align="center" label="温度" width="120"></el-table-column>
                        <el-table-column prop="address" align="center" label="湿度" width="120"></el-table-column>
                      </el-table>
                    </div>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="alarm">
              <h5>警报列表</h5>
              <div class="alarm_list">
                <el-table :data="alarm" stripe style="width: 100%" height="210px">
                  <el-table-column prop="time" label="时间" width="60"></el-table-column>
                  <el-table-column prop="name" label="实验室名称" width="100"></el-table-column>
                  <el-table-column prop="eqname" label="设备昵称"></el-table-column>
                  <el-table-column prop="eqtype" label="设备类型"></el-table-column>
                  <el-table-column prop="alarm" label="报警类型"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
        <!-- 监控列表 -->
        <div class="video_monitoring">
          <p>实时现场监控</p>
          <el-carousel :interval="10000" arrow="always" height="160px">
            <el-carousel-item v-for="item in 3" :key="item">
              <div class="video_list">
                <img src="../assets/images/monitoring_two.png" alt style="width:16%;height:65px" />
                <img src="../assets/images/monitoring_two.png" alt style="width:16%;height:65px" />
                <img src="../assets/images/monitoring_two.png" alt style="width:16%;height:65px" />
                <img src="../assets/images/monitoring_two.png" alt style="width:16%;height:65px" />
                <img src="../assets/images/monitoring_two.png" alt style="width:16%;height:65px" />
                <img src="../assets/images/monitoring_two.png" alt style="width:16%;height:65px" />
                <img src="../assets/images/monitoring_two.png" alt style="width:16%;height:65px" />
                <img src="../assets/images/monitoring_two.png" alt style="width:16%;height:65px" />
                <img src="../assets/images/monitoring_two.png" alt style="width:16%;height:65px" />
                <img src="../assets/images/monitoring_two.png" alt style="width:16%;height:65px" />
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 温湿度数据
      tableData: [
        {
          date: "分析室一",
          name: "26.8",
          address: "65.85"
        },
        {
          date: "高温室",
          name: "25.8",
          address: "62.65"
        },

        {
          date: "恒温室",
          name: "25.8",
          address: "62.65"
        },
        {
          date: "恒温室",
          name: "25.8",
          address: "62.65"
        },
        {
          date: "恒温室",
          name: "25.8",
          address: "62.65"
        }
      ],
      // 警报数据
      alarm: [
        {
          time: "09:23",
          name: "30栋一层",
          eqname: "分析室一",
          eqtype: "生命科技",
          alarm: "温度超标"
        },
        {
          time: "09:23",
          name: "30栋一层",
          eqname: "分析室一",
          eqtype: "生命科技",
          alarm: "温度超标"
        },
        {
          time: "09:23",
          name: "30栋一层",
          eqname: "分析室一",
          eqtype: "生命科技",
          alarm: "温度超标"
        },
        {
          time: "09:23",
          name: "30栋一层",
          eqname: "分析室一",
          eqtype: "生命科技",
          alarm: "温度超标"
        }
      ],
      // 电表数据
      electricity: [99, 50, 60, 20, 76],
      // 水表数据
      water: [240, 200, 160, 120, 280],
      dataAxis: ["29栋一层", "29栋二层", "30栋负一层", "30栋一层", "30栋二层"],
      electricty_time: "electricty_day",
      water_time: "water_day"
    };
  },
  components: {},
  created() {},
  mounted() {
    this.drawElectricity();
    this.drawWater();
  },
  methods: {
    //绘制电表
    drawElectricity() {
      // let vm = this;
      let dataShadow = [];
      let myCharts = this.$echarts.init(this.$refs.electricity_charts);
      let options = {
        xAxis: {
          data: this.dataAxis,
          axisLabel: {
            // textStyle: {
            color: "#fff",
            interval: 0,
            rotate: 30,
            fontsize: 12
            // }
          }
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          }
        },
        dataZoom: [
          {
            type: "inside"
          }
        ],
        series: [
          {
            type: "bar",
            barCategoryGap: "40%",
            data: dataShadow
          },
          {
            type: "bar",
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#4cbcfa" },
                { offset: 0.5, color: "#2c7ba6" },
                { offset: 1, color: "#183645" }
              ])
            },
            data: this.water
          }
        ]
      };
      myCharts.setOption(options);
    },
    //绘制水表
    drawWater() {
      var dataShadow = [];
      let myCharts = this.$echarts.init(this.$refs.water_charts);
      let options = {
        yAxis: {
          data: this.dataAxis,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#fff",
            fontsize: 12
          }
        },
        xAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          }
        },
        dataZoom: [
          {
            type: "inside"
          }
        ],
        series: [
          {
            type: "bar",
            barCategoryGap: "40%",
            data: dataShadow
          },
          {
            type: "bar",
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#1e2d3b" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#c165d1" }
              ])
            },
            data: this.water
          }
        ]
      };
      myCharts.setOption(options);
    }
  }
};
</script>

<style lang="less">
#home {
  height: 100%;
  background: url(../assets/images/background_one.png) no-repeat;
  background-size: 100% 100%;
  // 顶部样式
  .top {
    .title {
      height: 48px;
      text-align: center;
      h3 {
        font-size: 1.5rem;
        line-height: 75px;
        color: #ffffff;
      }
    }
    .nav {
      height: 47px;
    }
  }
  .content {
    height: 86%;
    display: flex;
    justify-content: space-evenly;
    // 水电表样式
    .left {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 25%;
      height: 100%;
      padding: 20px;
      .electricity_meter {
        width: 100%;
        height: 45%;
        border-radius: 10px;
        background: rgba(31, 47, 71, 0.5);
        margin-bottom: 10%;
        .electricty_title {
          color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 36px;
          p {
            font-size: 16px;
            font-weight: 400;
          }
        }
      }
      .water_meter {
        width: 100%;
        height: 45%;
        border-radius: 10px;
        background: rgba(31, 47, 71, 0.5);
        .water_title {
          color: #ffff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 36px;
          p {
            font-size: 16px;
            font-weight: 400;
          }
        }
      }
    }
    .main {
      width: 70%;
      height: 100%;
      padding: 20px 10px;
      .main_top {
        display: flex;
        justify-content: space-between;
        height: 71%;
        border-radius: 10px;
        padding-bottom: 12px;
        .live_action {
          width: 55%;
          height: 100%;
          > div {
            width: 100%;
            height: 90%;
            margin-top: 128px;
            background: url(../assets/images/live-action.png) no-repeat;
            background-size: 100% 75%;
          }
        }
        .main_right {
          width: 40%;
          > div {
            height: 45%;
            border-radius: 10px;
            background: rgba(31, 47, 71, 0.5);
            margin-bottom: 10%;
          }
          // 温湿度样式
          .humiture_meter {
            h5 {
              color: #fff;
              margin: 12px 0 6px 32px;
            }
            .humiture_table {
              display: flex;
              justify-content: space-evenly;
              padding: 0 16px 0 15px;
              .table_tittle {
                width: 60px;
                height: 210px;
                background: #1f2f47;
                color: #55aefe;
                border-radius: 5px 0 0 0;
                box-sizing: border-box;
                padding: 42px 15px;
                font-size: 16px;
                text-align: center;
              }
            }
            .el-carousel {
              ul {
                li {
                  button {
                    width: 5px;
                    height: 5px;
                    border-radius: 5px;
                    background-color: rgba(44, 128, 255, 0.3);
                  }
                }
                .is-active {
                  button {
                    background-color: rgba(44, 128, 255, 1);
                  }
                }
              }
            }
          }
          // 警报样式
          .alarm {
            padding-top: 6px;
            h5 {
              color: #fff;
              margin: 12px 0 6px 32px;
            }
            .alarm_list {
              width: 90%;
              margin: 0 auto;
              background: #1f3947;
            }
          }
        }
      }
      // 监控样式
      .video_monitoring {
        height: 24%;
        border-radius: 10px;
        background: rgba(31, 47, 71, 0.5);
        padding-top: 10px;
        p {
          color: #ffffff;
          font-size: 14px;
          margin-left: 32px;
        }
        .el-carousel {
          .el-carousel__container {
            button {
              top: 55%;
              i {
                font-size: 35px;
                color: #33ffff;
              }
            }
          }
          .video_list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            padding: 5px 60px;
            img {
              margin: 10px;
            }
          }
          ul {
            display: none;
          }
        }
      }
    }
  }
}
</style>