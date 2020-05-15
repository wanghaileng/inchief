<template>
  <div id="about">
    <div class="top">
      <!-- 顶部导航栏 -->
      <div class="title">
        <h3>实验室检测平台</h3>
        <p></p>
      </div>
      <div class="nav"></div>
    </div>
    <div class="content">
      <!-- 水表电表 -->
      <div class="left">
        <div class="electricity_meter">
          <div class="electricity_charts" ref="electricity_charts" style="width:100%; height:100%"></div>
        </div>
        <div class="water_meter">
          <div class="water_charts" ref="water_charts" style="width:90%; height:90%"></div>
        </div>
      </div>
      <div class="main">
        <div class="main_top">
          <!-- 实景楼层图 -->
          <div class="live_action">
            <h3></h3>
            <div></div>
          </div>
          <!-- 右侧温湿度表及警报列表 -->
          <div class="main_right">
            <div class="humiture_meter">
              <el-carousel :interval="5000000" arrow="never" height="270px">
                <el-carousel-item v-for="item in 5" :key="item">
                  <h5>温湿度情况</h5>
                  <div class="humiture_line"></div>
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
        <!-- 监控数据 -->
        <div class="video_monitoring">
          <p>实时现场监控</p>
          <el-carousel :interval="10000" arrow="always" height="160px">
            <el-carousel-item v-for="item in 3" :key="item">
              <div class="video_list">
                <img src="../assets/images/monitoring_two.png" alt style="width:24%;height:150px" />
                <img src="../assets/images/monitoring_two.png" alt style="width:24%;height:150px" />
                <img src="../assets/images/monitoring_two.png" alt style="width:24%;height:150px" />
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
      electricity: [
        { value: 94, name: "电表一" },
        { value: 43, name: "电表二" },
        { value: 47, name: "电表三" },
        { value: 53, name: "电表四" }
      ],
      // 水表数据
      water: [
        { value: 335, name: "水槽一" },
        { value: 310, name: "水槽二" },
        { value: 234, name: "水槽三" },
        { value: 135, name: "水槽四" },
        { value: 1548, name: "水槽五" }
      ],
      dataAxis: ["29栋一层", "29栋二层", "30栋负一层", "30栋一层", "30栋二层"]
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
      let myCharts = this.$echarts.init(this.$refs.electricity_charts);
      let options = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 0,
          top: 20,
          textStyle: {
            color: "#fff"
          },
          data: ["电表一", "电表二", "电表三", "电表四"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "40%",
            center: ["48%", "60%"],
            label: {
              show: true,
              formatter: "{c}度  占比{d}%"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20"
              }
            },
            data: this.electricity
          }
        ]
      };
      myCharts.setOption(options);
    },
    //绘制水表
    drawWater() {
      let myCharts = this.$echarts.init(this.$refs.water_charts);
      let options = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 0,
          top: 20,
          textStyle: {
            color: "#fff"
          },
          data: ["水槽一", "水槽二", "水槽三", "水槽四", "水槽五"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["25%", "40%"],
            center: ["48%", "80%"],
            label: {
              show: true,
              formatter: "{c}吨  占比{d}%"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
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

<style lang="less" >
#about {
  height: 100%;
  background: url(../assets/images/background_one.png) no-repeat;
  background-size: 100% 100%;
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
        text-align: center;
      }
      .water_meter {
        width: 100%;
        height: 45%;
        border-radius: 10px;
        background: rgba(31, 47, 71, 0.5);
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
        // 实景样式
        .live_action {
          width: 55%;
          height: 100%;
          > div {
            width: 100%;
            height: 90%;
            margin-top: 128px;
            background: url(../assets/images/floor_one.png) no-repeat;
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
          // 报警样式
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