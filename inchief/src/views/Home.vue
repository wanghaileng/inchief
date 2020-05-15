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
            <el-tabs type="card" value="day" @tab-click="electrictyClick" style="height: 24px;">
              <el-tab-pane label="日" name="day" class="is-active"></el-tab-pane>
              <el-tab-pane label="周" name="week"></el-tab-pane>
              <el-tab-pane label="月" name="month"></el-tab-pane>
            </el-tabs>
          </div>
          <div
            class="electricity_charts"
            ref="electricity_charts"
            style="margin:auto;width:80%; height:80%;"
          ></div>
        </div>
        <div class="water_meter">
          <div class="water_title">
            <p>水表能耗情况</p>
            <el-tabs type="card" value="day" @tab-click="waterClick" style="height: 24px;">
              <el-tab-pane label="日" name="day"></el-tab-pane>
              <el-tab-pane label="周" name="week"></el-tab-pane>
              <el-tab-pane label="月" name="month"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="water_charts" ref="water_charts" style="margin:auto;width:85%; height:80%;"></div>
        </div>
      </div>
      <div class="main">
        <div class="main_top">
          <!-- 实景图 -->
          <div class="live_action">
            <h3>实验室楼宇展示图</h3>
            <div class="floor_piece">
              <router-link class="lab_one" to="/">
                29栋第1层
                <span></span>
              </router-link>
              <router-link class="lab_two" to="/">
                29栋第2层
                <span></span>
              </router-link>
              <router-link class="lab_three" to="about">
                30栋负1层
                <span></span>
              </router-link>
              <router-link class="lab_four" to="/">
                30栋第1层
                <span></span>
              </router-link>
              <router-link class="lab_five" to="/">
                30栋第2层
                <span></span>
              </router-link>
            </div>
          </div>
          <!-- 温湿度情况 警报列表 -->
          <div class="main_right">
            <div class="humiture_meter">
              <p>温湿度情况</p>
              <el-carousel :interval="5000000" arrow="never" height="240px">
                <el-carousel-item v-for="item in 5" :key="item">
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
              <p>警报列表</p>
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
            <el-carousel-item v-for="item in video_list" :key="item">
              <div class="video_list">
                <img src="item.picUrl" alt style="width:16%;height:65px" />
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
        }
      ],
      // 电表数据
      electricity: {
        day: [5, 8, 6, 7, 10],
        week: [20, 32, 30, 36, 40],
        month: [80, 128, 120, 144, 160]
      },
      // 水表数据
      water: {
        day: [5, 8, 6, 7, 10],
        week: [20, 32, 30, 36, 40],
        month: [80, 128, 120, 144, 160]
      },
      dataAxis: ["29栋一层", "29栋二层", "30栋负一层", "30栋一层", "30栋二层"],
      visible: false,
      video_list: []
    };
  },
  components: {},
  async created() {
    let that = this;
    //发送警报接口
    let ajax = new XMLHttpRequest();
    ajax.open("get", "http://sys.iot.bsdhjbh.com/monitor/alarmList");
    ajax.send();
    ajax.onreadystatechange = function() {
      if (ajax.readyState === 4 && ajax.status === 200) {
        console.log(ajax.responseText);
        that.alarm = ajax.responseText.data;
      }
    };
    //摄像头列表
    ajax = new XMLHttpRequest();
    ajax.open("get", "http://sys.iot.bsdhjbh.com/monitor/cameraList");
    ajax.send();
    ajax.onreadystatechange = function() {
      if (ajax.readyState === 4 && ajax.status === 200) {
        console.log(that.video_list);
        let res = ajax.responseText;
        console.log(res.data);
        if (res.code == 200) {
          that.video_list = ajax.responseText.data;
        }
      }
    };
  },
  mounted() {
    this.drawElectricity(this.electricity.day);
    this.drawWater(this.water.day);
  },
  methods: {
    //绘制电表
    drawElectricity(res) {
      // let vm = this;
      let dataShadow = [];
      let myCharts = this.$echarts.init(this.$refs.electricity_charts);
      myCharts.clear();
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
            data: res
          }
        ]
      };
      myCharts.setOption(options);
    },
    //绘制水表
    drawWater(res) {
      var dataShadow = [];
      let myCharts = this.$echarts.init(this.$refs.water_charts);
      myCharts.clear();
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
            data: res
          }
        ]
      };
      myCharts.setOption(options);
    },
    //电表重绘
    electrictyClick(tab) {
      console.log(tab.name);
      if (tab.name == "day") {
        this.drawElectricity(this.electricity.day);
      }
      if (tab.name == "week") {
        this.drawElectricity(this.electricity.week);
      }
      if (tab.name == "month") {
        this.drawElectricity(this.electricity.month);
      }
    },
    //水表重绘
    waterClick(tab) {
      console.log(tab.name);
      if (tab.name == "day") {
        this.drawWater(this.water.day);
      }
      if (tab.name == "week") {
        this.drawWater(this.water.week);
      }
      if (tab.name == "month") {
        this.drawWater(this.water.month);
      }
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
        //实景样式
        .live_action {
          width: 55%;
          height: 100%;
          h3 {
            color: #fff;
            font-weight: 400;
          }
          > div {
            width: 100%;
            height: 90%;
            margin-top: 100px;
            background: url(../assets/images/live-action.png) no-repeat;
            background-size: 100% 75%;
          }
          .floor_piece {
            position: relative;
            > a {
              position: absolute;
              text-align: center;
              line-height: 70px;
              width: 120px;
              height: 70px;
              color: #fff;
              background: rgba(34, 123, 172, 0.7);
              border-radius: 10px;
              span {
                display: inline-block;
                position: absolute;
                width: 0;
                height: 0;
                border-top: 12px solid rgba(34, 123, 172, 0.7);
                border-right: 8px solid transparent;
                border-bottom: 8px solid transparent;
                border-left: 8px solid transparent;
                bottom: -20px;
                right: 20%;
              }
            }
            .lab_one {
              left: 2%;
              bottom: 42%;
            }
            .lab_two {
              left: 24%;
              top: 26%;
            }
            .lab_three {
              right: 0%;
              top: 24%;
            }
            .lab_four {
              right: 22%;
              top: 30%;
            }
            .lab_five {
              right: 34%;
              top: 10%;
            }
          }
        }
        .main_right {
          width: 40%;
          margin-bottom: 10px;
          > div {
            height: 48%;
            border-radius: 10px;
            background: rgba(31, 47, 71, 0.5);
          }
          // 温湿度样式
          .humiture_meter {
            margin-bottom: 20px;
            padding-top: 6px;
            p {
              font-size: 16px;
              font-weight: 400;
              color: #fff;
              margin: 12px 0 10px 32px;
            }
            .humiture_table {
              display: flex;
              justify-content: space-evenly;
              padding: 0 16px;
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
            p {
              font-size: 16px;
              font-weight: 400;
              color: #fff;
              margin: 12px 0 10px 32px;
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
            align-content: space-between;
            align-items: center;
            padding: 5px 60px;
            img {
              margin: 10px 24px;
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