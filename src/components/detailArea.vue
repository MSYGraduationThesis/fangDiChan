<template>
  <div class="country">
    <img src="../assets/img/country-02.png" class="background" />
    <img src="../assets/img/area.png" class="area-img" />
    <div class="goproject-box">
      <div class="goproject-item-1" @click="goproject()"></div>
      <div class="goproject-item-2" @click="goproject()"></div>
      <div class="goproject-item-3" @click="goproject()"></div>
      <div class="goproject-item-4" @click="goproject()"></div>
      <div class="goproject-item-5" @click="goproject()"></div>
      <div class="goproject-item-6" @click="goproject()"></div>
      <div class="goproject-item-7" @click="goproject()"></div>
    </div>
    <img src="../assets/img/country-01.png" class="header-img" />
    <div class="side-btn side-01" @click="openDialog('home')">
      <img src="../assets/img/home.png" class="icon-01" />
      <span>BASIC</span>
    </div>
    <div class="side-btn side-02 left-show" @click="openDialog('note')">
      <img src="../assets/img/note.png" class="icon-03" />
      <span>NOTE</span>
    </div>
    <div class="side-btn side-03 left-show" @click="openDialog('eye')">
      <img src="../assets/img/eye.png" class="icon-02" />
      <span>VIEW</span>
    </div>
    <div class="side-btn side-04 left-show" @click="openDialog('ring')">
      <img src="../assets/img/ring.png" class="icon-04" />
      <span>预警</span>
    </div>
    <img src="../assets/img/footer.png" class="footer-img" />
    <img src="../assets/img/building.png" class="tool-01" />
    <img src="../assets/img/money.png" class="tool-02" />
    <img src="../assets/img/person.png" class="tool-03" />
    <!-- basic弹框 -->
    <div class="home-box" v-if="dialog['home']['block']">
      <div :class="dialog['home']['show']?'home':'home-hidden'">
        <div class="home-item" v-for="(item,index) in home" :key="index" @click="showhome(index)">
          <img src="../assets/img/home-active.png" class="home-active-img" v-if="item['active']" />
          <div :class="item['active']?'home-content-active':'home-content'">
            <img :src="item['icon']" class="home-icon" />
            <div class="home-text">{{item['text']}}</div>
            <div class="home-data">{{item['data']}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- basic详情弹框 -->
    <div class="home-detail-box" v-if="dialog['home']['show']">
      <div :class="homeDetailShow?'home-show':'home-hide'">
        <div :class="homeDetail['typeshow'] == 2?'diagram-detail':'home-detail'">
          <div v-if="homeDetail['typeshow'] == 1">
            <div class="home-detail-title">{{homeDetail['title']}}</div>
            <div class="home-detail-item-box">
              <div class="home-detail-item" v-for="(item,index) in homeDetail['data']" :key="index">
                <div class="home-detail-item-title">{{item['title']}}</div>
                <div class="home-detail-item-text">{{item['data']}}</div>
              </div>
            </div>
          </div>
          <div v-else-if="homeDetail['typeshow'] == 3" class="home-diagram-item-box">
            <div class="home-detail-title">{{homeDetail['title']}}</div>
            <div id="diagram-item"></div>
          </div>
          <div v-else-if="homeDetail['typeshow'] == 2">
            <div class="diagram-box" v-for="(item,index) in homeDetail['manydiagram']" :key="index">
              <p class="diagram-title">{{item['title']}}</p>
              <div :id="item['id']" :style="{ zIndex: 100-index }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- note 弹框-->
    <div class="note-box" v-if="dialog['note']['block']">
      <div :class="dialog['note']['show']?'note-dialog-show':'note-dialog-hide'" @keyup="getnote()">
        <div class="note-dialog-arrow"></div>
        <p contenteditable="true" class="edit-note" ref="notes">
          <el-scrollbar style="height:100%;">
            <span v-html="note"></span>
          </el-scrollbar>
        </p>
      </div>
    </div>
    <!-- VIEW 弹框-->
    <div class="eye-box" v-if="dialog['eye']['block']">
      <div :class="dialog['eye']['show']?'eye-dialog':'eye-dialog-hide'">
        <div class="eye-dialog-arrow"></div>
        <div class="eye-direction">
          <div class="eye-direction-item">上 下</div>
          <div class="eye-direction-item">前 右</div>
          <div class="eye-direction-item">等轴视图</div>
        </div>
        <div class="eye-item" v-for="(item,index) in view" :key="index" @click="checkview(index)">
          <span :class="item['active']?'eye-item-active':'eye-item-normal'">{{item['text']}}</span>
        </div>
      </div>
    </div>
    <!-- 预警 -->
    <div class="ring-box" v-if="dialog['ring']['block']">
      <div :class="dialog['ring']['show']?'ring-dialog':'ring-dialog-hide'">
        <div class="ring-item">
          <div class="ring-item-back"></div>
          <div class="ring-light"></div>
          <div class="ring-text">示范区开放延迟30天</div>
        </div>
        <div class="ring-item">
          <div class="ring-item-back"></div>
          <div class="ring-light"></div>
          <div class="ring-text">单车位面积超限额0.3m2/个</div>
        </div>
        <div class="ring-dialog-arrow"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailArea",
  data() {
    return {
      note:
        "2020.02.18 <br/> 旭辉聚焦一二线及强三线城市，重点布局华东、华北、华南及中西部四大区域内有人口导入、有产业， 经济发展良好的城市。旭辉持续看好城市群、都市圈的发展， 积极抓住城市化2.0带给行业的机会，坚持城市深耕战略，通过住宅开发、物业服务、精品商业、长租公寓、幼小初高教育等多元业务，为城市美好生活创造无限可能。",
      home: [
        {
          icon: require("../assets/img/homeicon-01.png"),
          text: "项目数量",
          active: false,
          data: "25",
          detail: {
            title: "项目数量",
            typeshow: 1,
            data: [
              { title: "在建项目", data: "xxxxxx" },
              { title: "已交付项目", data: "xxxxxx" },
              { title: "拿地数量", data: "xxxxxx" },
              { title: "合作项目", data: "xxxxxx" }
            ]
          }
        },
        {
          icon: require("../assets/img/homeicon-02.png"),
          text: "土储信息",
          active: false,
          data: "",
          detail: {
            title: "土储信息",
            typeshow: 1,
            data: [
              { title: "合作", data: "xxxxxx" },
              { title: "招/挂", data: "xxxxxx" },
              { title: "收购", data: "xxxxxx" }
            ]
          }
        },
        {
          icon: require("../assets/img/homeicon-03.png"),
          text: "产品线构成",
          active: false,
          data: "",
          detail: {
            title: "产品线构成",
            typeshow: 3,
            diagram: [{ title: "合作", data: "xxxxxx" }]
          }
        },
        {
          icon: require("../assets/img/homeicon-04.png"),
          text: "面积",
          active: false,
          data: "",
          detail: {
            title: "面积",
            typeshow: 1,
            data: [
              { title: "总开发", data: "xxxxxx" },
              { title: "总占地", data: "xxxxxx" },
              { title: "总可售", data: "xxxxxx" },
              { title: "总持有", data: "xxxxxx" },
              { title: "总滞金", data: "xxxxxx" }
            ]
          }
        },
        {
          icon: require("../assets/img/homeicon-05.png"),
          text: "计划",
          active: false,
          data: "",
          detail: {}
        },
        {
          icon: require("../assets/img/homeicon-06.png"),
          text: "经营",
          active: false,
          typeshow: 1,
          data: "",
          detail: {}
        },
        {
          icon: require("../assets/img/homeicon-07.png"),
          text: "产品",
          active: false,
          data: "",
          detail: {
            typeshow: 2,
            manydiagram: [
              { title: "业态", id: "diagram-item-1" },
              { title: "示范区", id: "diagram-item-2" },
              { title: "大区", id: "diagram-item-3" },
              { title: "户型配比", id: "diagram-item-4" },
              { title: "室内", id: "diagram-item-5" },
              { title: "景观", id: "diagram-item-6" }
            ]
          }
        }
      ],
      dialog: {
        home: { block: false, show: false },
        note: { block: false, show: false },
        eye: { block: false, show: false },
        ring: { block: false, show: false }
      },
      view: [
        { text: "大高", active: false },
        { text: "小高", active: false },
        { text: "洋房", active: false },
        { text: "进度视角", active: false },
        { text: "营销视角", active: false },
        { text: "区位地图", active: false },
        { text: "竞品看板", active: false }
      ],
      homeDetailShow:false,
      homeDetail: {}
    };
  },
  created() {},
  methods: {
    showhome(index) {
      let that = this;
      let home = this.home;
      for (let i = 0; i < home.length; i++) {
        if (i == index) {
          home[i]["active"] = true;
        } else {
          home[i]["active"] = false;
        }
      }
      that.homeDetailShow = false;
      setTimeout(function() {
        that.homeDetail = home[index]["detail"];
        if(typeof home[index]["detail"]['typeshow'] !== "undefined"){
          that.homeDetailShow = true;
        }
      }, 500);
      that.home = home;
      if (home[2]["active"]) {
        setTimeout(function() {
          that.drawLine();
        }, 500);
      }
      if (home[6]["active"]) {
        setTimeout(function() {
          that.drawpies();
        }, 500);
      }
    },

    openDialog(index) {
      let dialog = this.dialog;
      dialog[index]["block"] = true;
      for (let item in dialog) {
        if (item == index) {
          dialog[index]["show"] = !dialog[index]["show"];
        } else {
          dialog[item]["show"] = false;
        }
      }
      if (!dialog["home"]["show"]) {
        this.homeDetail = {};
        this.homeDetailShow = false;
        for(let item in this.home){
          this.home[item]['active'] = false;
        }
      }
      this.dialog = dialog;
    },
    checkview(index) {
      console.log(index);
      if (this.view[index]["active"]) {
        this.view[index]["active"] = false;
      } else {
        this.view[index]["active"] = true;
      }
    },
    getnote() {
      let note = this.$refs.notes.innerText;
    },
    goproject() {
      this.$router.push({ name: "project" });
    },
    drawLine() {
      var img = new Image(); //新建对象
      img.src = require("../assets/img/innercircle.png");
      // 基于准备好的dom，初始化echarts实例255 226   452
      let myChart = this.$echarts.init(document.getElementById("diagram-item"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: " {b}<br/>区域 : {c}  ({d}%)",
          borderColor: "#1C51A6",
          borderWidth: 1,
          backgroundColor: "rgba(12, 20, 48, 0.8)"
        },
        graphic: [
          {
            type: "image",
            top: "middle",
            left: "center",
            style: {
              image: img,
              width: 50,
              height: 50
            }
          }
        ],
        legend: {
          orient: "horizontal",
          right: "10%",
          top: "middle",
          width: 60,
          itemWidth: 10,
          itemHeight: 10,
          data: [
            {
              icon: "circle",
              name: "T",
              textStyle: { color: "#fff", lineHeight: 28 }
            },
            {
              icon: "circle",
              name: "G",
              textStyle: { color: "#fff", lineHeight: 28 }
            },
            {
              icon: "circle",
              name: "H",
              textStyle: { color: "#fff", lineHeight: 28 }
            },
            {
              icon: "circle",
              name: "L",
              textStyle: { color: "#fff", lineHeight: 28 }
            }
          ]
        },
        series: [
          {
            name: "产品线构成",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: "T", itemStyle: { color: "#16EDEE" } },
              { value: 310, name: "H", itemStyle: { color: "#16EE71" } },
              { value: 234, name: "G", itemStyle: { color: "#FBAC03" } },
              { value: 135, name: "L", itemStyle: { color: "#1878F5" } }
            ]
          }
        ]
      });
    },
    goarea() {
      this.$router.push({ name: "detailArea" });
    },
    drawpies() {
      let that = this;
      var img = new Image(); //新建对象
      img.src = require("../assets/img/innercircle.png");
      //基于准备好的dom，初始化echarts实例
      let diagram_a = that.$echarts.init(
        document.getElementById("diagram-item-1")
      );
      // 绘制图表
      diagram_a.setOption({
        tooltip: {
          trigger: "item",
          formatter: "业态 <br/>{b}: {c} ({d}%)",
          borderColor: "#1C51A6",
          borderWidth: 1,
          backgroundColor: "rgba(12, 20, 48, 0.8)"
        },
        graphic: [
          {
            type: "image",
            top: "middle",
            left: "center",
            style: {
              image: img,
              width: 50,
              height: 50
            }
          }
        ],
        legend: {
          orient: "horizontal",
          right: "2%",
          top: "middle",
          itemWidth: 10,
          itemHeight: 10,
          width: 100,
          data: [
            {
              icon: "circle",
              name: "大高",
              textStyle: { color: "#fff", lineHeight: 28 }
            },
            {
              icon: "circle",
              name: "小高",
              textStyle: { color: "#fff", lineHeight: 28 }
            },
            {
              icon: "circle",
              name: "洋房",
              textStyle: { color: "#fff", lineHeight: 28 }
            },
            {
              icon: "circle",
              name: "别墅",
              textStyle: { color: "#fff", lineHeight: 28 }
            }
          ]
        },
        series: [
          {
            name: "产品线构成",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: "大高", itemStyle: { color: "#16EDEE" } },
              { value: 310, name: "小高", itemStyle: { color: "#16EE71" } },
              { value: 234, name: "洋房", itemStyle: { color: "#FBAC03" } },
              { value: 135, name: "别墅", itemStyle: { color: "#1878F5" } }
            ]
          }
        ]
      });
      let diagram_b = that.$echarts.init(
        document.getElementById("diagram-item-2")
      );
      // 绘制图表
      diagram_b.setOption({
        tooltip: {
          trigger: "item",
          formatter: "示范区 <br/>{b}: {c} ({d}%)",
          borderColor: "#1C51A6",
          borderWidth: 1,
          backgroundColor: "rgba(12, 20, 48, 0.8)"
        },
        graphic: [
          {
            type: "image",
            top: "middle",
            left: "center",
            style: {
              image: img,
              width: 50,
              height: 50
            }
          }
        ],
        legend: {
          orient: "horizontal",
          right: "2%",
          top: "middle",
          itemWidth: 10,
          itemHeight: 10,
          width: 100,
          data: [
            {
              icon: "circle",
              name: "大高",
              textStyle: { color: "#fff", lineHeight: 28 }
            },
            {
              icon: "circle",
              name: "小高",
              textStyle: { color: "#fff", lineHeight: 28 }
            },
            {
              icon: "circle",
              name: "洋房",
              textStyle: { color: "#fff", lineHeight: 28 }
            },
            {
              icon: "circle",
              name: "别墅",
              textStyle: { color: "#fff", lineHeight: 28 }
            }
          ]
        },
        series: [
          {
            name: "产品线构成",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: "大高", itemStyle: { color: "#16EDEE" } },
              { value: 310, name: "小高", itemStyle: { color: "#16EE71" } },
              { value: 234, name: "洋房", itemStyle: { color: "#FBAC03" } },
              { value: 135, name: "别墅", itemStyle: { color: "#1878F5" } }
            ]
          }
        ]
      });
      let diagram_c = that.$echarts.init(
        document.getElementById("diagram-item-3")
      );
      // 绘制图表
      diagram_c.setOption({
        tooltip: {
          trigger: "item",
          formatter: "大区 <br/>{b}: {c} ({d}%)",
          borderColor: "#1C51A6",
          borderWidth: 1,
          backgroundColor: "rgba(12, 20, 48, 0.8)"
        },
        graphic: [
          {
            type: "image",
            top: "middle",
            left: "center",
            style: {
              image: img,
              width: 50,
              height: 50
            }
          }
        ],
        legend: {
          orient: "horizontal",
          right: "2%",
          top: "middle",
          itemWidth: 10,
          itemHeight: 10,
          width: 100,
          data: [
            {
              icon: "circle",
              name: "大高",
              textStyle: { color: "#fff", lineHeight: 28 }
            },
            {
              icon: "circle",
              name: "小高",
              textStyle: { color: "#fff", lineHeight: 28 }
            },
            {
              icon: "circle",
              name: "洋房",
              textStyle: { color: "#fff", lineHeight: 28 }
            },
            {
              icon: "circle",
              name: "别墅",
              textStyle: { color: "#fff", lineHeight: 28 }
            }
          ]
        },
        series: [
          {
            name: "产品线构成",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: "大高", itemStyle: { color: "#16EDEE" } },
              { value: 310, name: "小高", itemStyle: { color: "#16EE71" } },
              { value: 234, name: "洋房", itemStyle: { color: "#FBAC03" } },
              { value: 135, name: "别墅", itemStyle: { color: "#1878F5" } }
            ]
          }
        ]
      });
      let diagram_d = that.$echarts.init(
        document.getElementById("diagram-item-4")
      );
      // 绘制图表
      diagram_d.setOption({
        tooltip: {
          trigger: "item",
          formatter: "户型配比 <br/>{b}: {c} ({d}%)",
          borderColor: "#1C51A6",
          borderWidth: 1,
          backgroundColor: "rgba(12, 20, 48, 0.8)"
        },
        graphic: [
          {
            type: "image",
            top: "middle",
            left: "center",
            style: {
              image: img,
              width: 50,
              height: 50
            }
          }
        ],
        legend: {
          orient: "vertical", //垂直显示
          right: "5%",
          top: "middle",
          itemWidth: 10,
          itemHeight: 10,
          width: 300,
          data: [
            {
              icon: "circle",
              name: "≤95m",
              textStyle: { color: "#fff", lineHeight: 6 }
            },
            {
              icon: "circle",
              name: "95-100m",
              textStyle: { color: "#fff", lineHeight: 6 }
            },
            {
              icon: "circle",
              name: "100-105m",
              textStyle: { color: "#fff", lineHeight: 6 }
            },
            {
              icon: "circle",
              name: "105-120m",
              textStyle: { color: "#fff", lineHeight: 6 }
            },
            {
              icon: "circle",
              name: "≥120m",
              textStyle: { color: "#fff", lineHeight: 6 }
            }
          ]
        },
        series: [
          {
            name: "产品线构成",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: "≤95m", itemStyle: { color: "#16EDEE" } },
              { value: 135, name: "105-120m", itemStyle: { color: "#1878F5" } },
              { value: 310, name: "95-100m", itemStyle: { color: "#FBAC03" } },
              { value: 234, name: "100-105m", itemStyle: { color: "#16EE71" } },
              { value: 135, name: "≥120m", itemStyle: { color: "#1878F5" } }
            ]
          }
        ]
      });
      let diagram_e = that.$echarts.init(
        document.getElementById("diagram-item-5")
      );
      // 绘制图表
      diagram_e.setOption({
        tooltip: {
          trigger: "item",
          formatter: "室内 <br/>{b}: {c} ({d}%)",
          borderColor: "#1C51A6",
          borderWidth: 1,
          backgroundColor: "rgba(12, 20, 48, 0.8)"
        },
        graphic: [
          {
            type: "image",
            top: "middle",
            left: "center",
            style: {
              image: img,
              width: 50,
              height: 50
            }
          }
        ],
        legend: {
          orient: "vertical", //垂直显示
          right: "5%",
          top: "middle",
          itemWidth: 10,
          itemHeight: 10,
          width: 300,
          data: [
            {
              icon: "circle",
              name: "无精装",
              textStyle: { color: "#fff", lineHeight: 6 }
            },
            {
              icon: "circle",
              name: "800元m",
              textStyle: { color: "#fff", lineHeight: 6 }
            },
            {
              icon: "circle",
              name: "1000元m",
              textStyle: { color: "#fff", lineHeight: 6 }
            },
            {
              icon: "circle",
              name: "1200元m",
              textStyle: { color: "#fff", lineHeight: 6 }
            }
          ]
        },
        series: [
          {
            name: "室内",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: "无精装", itemStyle: { color: "#16EDEE" } },
              { value: 310, name: "800元m", itemStyle: { color: "#FBAC03" } },
              { value: 234, name: "1000元m", itemStyle: { color: "#16EE71" } },
              { value: 135, name: "1200元m", itemStyle: { color: "#1878F5" } }
            ]
          }
        ]
      });
      let diagram_f = that.$echarts.init(
        document.getElementById("diagram-item-6")
      );
      // 绘制图表
      diagram_f.setOption({
        tooltip: {
          trigger: "item",
          formatter: "景观 <br/>{b}: {c} ({d}%)",
          borderColor: "#1C51A6",
          borderWidth: 1,
          backgroundColor: "rgba(12, 20, 48, 0.8)"
        },
        graphic: [
          {
            type: "image",
            top: "middle",
            left: "center",
            style: {
              image: img,
              width: 50,
              height: 50
            }
          }
        ],
        legend: {
          orient: "vertical", //垂直显示
          right: "3%",
          top: "middle",
          itemWidth: 10,
          itemHeight: 10,
          width: 300,
          data: [
            {
              icon: "circle",
              name: "<750",
              textStyle: { color: "#fff", lineHeight: 6 }
            },
            {
              icon: "circle",
              name: "750-800",
              textStyle: { color: "#fff", lineHeight: 6 }
            },
            {
              icon: "circle",
              name: "800-1000",
              textStyle: { color: "#fff", lineHeight: 6 }
            },
            {
              icon: "circle",
              name: "1000-1200",
              textStyle: { color: "#fff", lineHeight: 6 }
            },
            {
              icon: "circle",
              name: ">1200",
              textStyle: { color: "#fff", lineHeight: 6 }
            }
          ]
        },
        series: [
          {
            name: "景观",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: "<750", itemStyle: { color: "#16EDEE" } },
              {
                value: 135,
                name: "1000-1200",
                itemStyle: { color: "#1878F5" }
              },
              { value: 310, name: "750-800", itemStyle: { color: "#FBAC03" } },
              { value: 234, name: "800-1000", itemStyle: { color: "#16EE71" } },

              { value: 135, name: ">1200", itemStyle: { color: "#1878F5" } }
            ]
          }
        ]
      });
    }
  }
};
</script>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.country {
  width: 100%;
  min-width: 1366px;
  position: relative;
  height: 100vh;
  min-height: 10.8rem;
  overflow: hidden;
}
.country .background {
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  z-index: -1;
}
.header-img {
  width: 17rem;
  height: 1.1rem;
  margin: 0 auto;
  display: block;
}
.side-btn {
  width: 1.97rem;
  height: 0.63rem;
  background: url("../assets/img/border.png") no-repeat;
  background-size: cover;
  cursor: pointer;
}
.side-01 {
  position: absolute;
  left: 0.28rem;
  top: 1.48rem;
  animation: leftshow 1s;
  -moz-animation: leftshow 1s; /* Firefox */
  -webkit-animation: leftshow 1s; /* Safari 和 Chrome */
  -o-animation: leftshow 1s; /* Opera */
}
.side-02 {
  position: absolute;
  right: 0.28rem;
  top: 1.48rem;
}
.side-03 {
  position: absolute;
  right: 0.28rem;
  top: 2.44rem;
}
.side-04 {
  position: absolute;
  right: 0.28rem;
  top: 3.34rem;
}
.left-show {
  animation: rightshow 1s;
  -moz-animation: rightshow 1s; /* Firefox */
  -webkit-animation: rightshow 1s; /* Safari 和 Chrome */
  -o-animation: rightshow 1s; /* Opera */
}
@keyframes leftshow {
  from {
    left: -2rem;
    opacity: 0;
  }
  to {
    left: 0.28rem;
    opacity: 1;
  }
}
@keyframes rightshow {
  from {
    right: -2rem;
    opacity: 0;
  }
  to {
    right: 0.28rem;
    opacity: 1;
  }
}
@keyframes homeshow {
  from {
    top: -7.39rem;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
@keyframes homehide {
  from {
    top: 0;
    opacity: 1;
  }
  to {
    top: -7.39rem;
    opacity: 0;
  }
}
@keyframes noteshow {
  from {
    right: -4.53rem;
    opacity: 0;
  }
  to {
    right: 0.24rem;
    opacity: 1;
  }
}
@keyframes notehide {
  from {
    right: 0.24rem;
    opacity: 1;
  }
  to {
    right: -4.53rem;
    opacity: 0;
  }
}
@keyframes eyeshow {
  from {
    right: -2.29rem;
    opacity: 0;
  }
  to {
    right: 0.39rem;
    opacity: 1;
  }
}
@keyframes eyehide {
  from {
    right: 0.39rem;
    opacity: 1;
  }
  to {
    right: -2.29rem;
    opacity: 0;
  }
}

@keyframes ringshow {
  from {
    right: -3.22rem;
    opacity: 0;
  }
  to {
    right: 0.33rem;
    opacity: 1;
  }
}
@keyframes ringhide {
  from {
    right: 0.33rem;
    opacity: 1;
  }
  to {
    right: -3.22rem;
    opacity: 0;
  }
}

@keyframes diagramshow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes homedetailshow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes homedetailhide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.side-btn span {
  margin-left: 0.7rem;
  font-size: 0.2rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 0.63rem;
  display: block;
  text-align: center;
  width: 0.7rem;
}
.icon-01 {
  width: 0.32rem;
  height: 0.31rem;
  display: block;
  float: left;
  margin-top: 0.17rem;
  margin-left: 0.36rem;
}
.icon-02 {
  width: 0.34rem;
  height: 0.29rem;
  display: block;
  float: left;
  margin-top: 0.17rem;
  margin-left: 0.36rem;
}
.icon-03 {
  width: 0.31rem;
  height: 0.32rem;
  display: block;
  float: left;
  margin-top: 0.17rem;
  margin-left: 0.36rem;
}
.icon-04 {
  width: 0.3rem;
  height: 0.35rem;
  display: block;
  float: left;
  margin-top: 0.17rem;
  margin-left: 0.36rem;
}
.china-img {
  width: 11.54rem;
  height: 8.28rem;
  position: absolute;
  top: 0.95rem;
  left: calc(50% - 5.77rem);
}
.area-img {
  width: 5.43rem;
  height: 6.43rem;
  position: absolute;
  top: 1.83rem;
  left: calc(50% - 2.715rem);
}
.footer-img {
  width: 15.87rem;
  height: 1.09rem;
  position: absolute;
  bottom: 0;
  left: calc(50% - 7.935rem);
}
.tool-01 {
  width: 1.95rem;
  height: 1.49rem;
  position: absolute;
  bottom: 0;
  left: 6.14rem;
  cursor: pointer;
}
.tool-02 {
  width: 1.841rem;
  height: 1.68rem;
  position: absolute;
  bottom: 0;
  left: 9.13rem;
  cursor: pointer;
}
.tool-03 {
  width: 1.95rem;
  height: 1.49rem;
  position: absolute;
  bottom: 0;
  right: 5.39rem;
  cursor: pointer;
}
.home-box {
  width: 3.47rem;
  height: 7.39rem;
  position: absolute;
  top: 2.23rem;
  left: 0.23rem;
  overflow: hidden;
}
.home {
  width: 3.47rem;
  height: 6.64rem;
  background: url("../assets/img/home-border.png") no-repeat;
  background-size: contain;
  padding-top: 0.75rem;
  animation: homeshow 1s;
  -moz-animation: homeshow 1s; /* Firefox */
  -webkit-animation: homeshow 1s; /* Safari 和 Chrome */
  -o-animation: homeshow 1s; /* Opera */
  position: absolute;
  top: 0;
  left: 0;
}
.home-hidden {
  width: 3.47rem;
  height: 6.64rem;
  background: url("../assets/img/home-border.png") no-repeat;
  background-size: contain;
  padding-top: 0.75rem;
  animation: homehide 0.5s;
  -moz-animation: homehide 0.5s; /* Firefox */
  -webkit-animation: homehide 0.5s; /* Safari 和 Chrome */
  -o-animation: homehide 0.5s; /* Opera */
  position: absolute;
  top: -7.39rem;
  left: 0;
}
.home-item {
  width: 3.22rem;
  height: 0.44rem;
  position: relative;
  margin-left: 0.11rem;
  cursor: pointer;
}
.home-content {
  width: 3.12rem;
  height: 0.33rem;
  background: rgba(7, 19, 48, 1);
  position: relative;
  float: left;
  margin-left: 0.06rem;
  margin-top: 0.06rem;
}
.home-content-active {
  width: 3.12rem;
  height: 0.33rem;
  position: relative;
  float: left;
  margin-left: 0.06rem;
  margin-top: 0.06rem;
}
.home-item .home-icon {
  width: 0.2rem;
  height: 0.2rem;
  display: block;
  float: left;
  margin-top: 0.07rem;
  margin-left: 0.08rem;
}
.home-text {
  font-size: 0.12rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  float: left;
  margin-left: 0.11rem;
  line-height: 0.33rem;
}

.home-data {
  font-size: 0.12rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  float: right;
  margin-right: 0.21rem;
  line-height: 0.33rem;
}
.home-content-active .home-text {
  color: rgba(14, 239, 239, 1);
}
.home-content-active .home-data {
  color: rgba(14, 239, 239, 1);
}
.home-active-img {
  width: 100%;
  height: 100%;
  position: absolute;
}

.home-detail-box {
  width: 11.54rem;
  height: 8.28rem;
  position: absolute;
  top: 0.95rem;
  left: 3.85rem;
  overflow: hidden;
}
.home-show {
  opacity: 1;
  animation: homedetailshow 1s;
  -moz-animation: homedetailshow 1s; /* Firefox */
  -webkit-animation: homedetailshow 1s; /* Safari 和 Chrome */
  -o-animation: homedetailshow 1s; /* Opera */
}
.home-hide {
  opacity: 0;
  animation: homedetailhide 0.5s;
  -moz-animation: homedetailhide 0.5s; /* Firefox */
  -webkit-animation: homedetailhide 0.5s; /* Safari 和 Chrome */
  -o-animation: homedetailhide 0.5s; /* Opera */
}
.home-detail {
  width: 4.29rem;
  height: 2.65rem;
  position: absolute;
  top: 3.87rem;
  left: 1.4rem;
  background: url("../assets/img/home-detail.png") no-repeat;
  background-size: contain;
  animation: diagramshow 1s;
  -moz-animation: diagramshow 1s; /* Firefox */
  -webkit-animation: diagramshow 1s; /* Safari 和 Chrome */
  -o-animation: diagramshow 1s; /* Opera */
}
.diagram-detail {
  width: 7.95rem;
  height: 5.01rem;
  background: url("../assets/img/manydiagram.png") no-repeat;
  background-size: contain;
  padding-top: 0.43rem;
  padding-left: 0.53rem;
  position: absolute;
  top: 2.38rem;
  left: 1.23rem;
  animation: diagramshow 1s;
  -moz-animation: diagramshow 1s; /* Firefox */
  -webkit-animation: diagramshow 1s; /* Safari 和 Chrome */
  -o-animation: diagramshow 1s; /* Opera */
}
.home-detail-title {
  width: 1rem;
  text-align: center;
  font-size: 0.18rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(14, 239, 239, 1);
  line-height: 0.1rem;
  position: absolute;
  top: 0.33rem;
  left: calc(50% - 0.5rem);
}
.home-detail-item-box {
  width: 3.71rem;
  height: 1.69rem;
  float: left;
  margin-left: 0.58rem;
  margin-top: 0.96rem;
}
.home-diagram-item-box {
  width: 5rem;
  height: 1.65rem;
  float: right;
  margin-top: 0.7rem;
  margin-right: 0.38rem;
}
#diagram-item {
  width: 100%;
  height: 100%;
}
.home-detail-item {
  width: 1.855rem;
  height: 0.14rem;
  float: left;
  margin-bottom: 0.21rem;
}
.home-detail-item-title {
  width: 0.75rem;
  font-size: 0.14rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(254, 255, 255, 1);
  line-height: 0.14rem;
  float: left;
}
.home-detail-item-text {
  width: 0.9rem;
  font-size: 0.14rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(39, 114, 228, 1);
  line-height: 0.14rem;
  float: left;
}

.note-box {
  width: 4.53rem;
  height: 3.45rem;
  position: absolute;
  top: 1.36rem;
  right: 2.32rem;
  overflow: hidden;
}
.note-box > div {
  position: absolute;
  top: 0;
  width: 4.29rem;
  height: 3.45rem;
  background: url("../assets/img/note-border.png") no-repeat;
  background-size: contain;
  font-size: 0.12rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(254, 255, 255, 1);
  line-height: 0.31rem;
}
.note-dialog-show {
  right: 0.24rem;
  animation: noteshow 1s;
  -moz-animation: noteshow 1s; /* Firefox */
  -webkit-animation: noteshow 1s; /* Safari 和 Chrome */
  -o-animation: noteshow 1s; /* Opera */
}
.note-dialog-hide {
  right: -4.53rem;
  animation: notehide 0.5s;
  -moz-animation: notehide 0.5s; /* Firefox */
  -webkit-animation: notehide 0.5s; /* Safari 和 Chrome */
  -o-animation: notehide 0.5s; /* Opera */
}
.edit-note {
  width: 3.36rem;
  height: 2.25rem;
  overflow: hidden;
  margin: 0.56rem auto;
  padding: 0;
}
.note-dialog-arrow {
  width: 0.34rem;
  height: 0.36rem;
  position: absolute;
  top: 0.27rem;
  left: 4.25rem;
  background: url("../assets/img/dialog-arrow.png") no-repeat;
  background-size: contain;
}

.eye-box {
  width: 2.29rem;
  min-height: 4.22rem;
  position: absolute;
  top: 2.33rem;
  right: 2.32rem;
  overflow: hidden;
}
.eye-dialog {
  width: 1.85rem;
  min-height: 4.22rem;
  position: absolute;
  top: 0;
  right: 0.39rem;
  animation: eyeshow 1s;
  -moz-animation: eyeshow 1s; /* Firefox */
  -webkit-animation: eyeshow 1s; /* Safari 和 Chrome */
  -o-animation: eyeshow 1s; /* Opera */
}
.eye-dialog-hide {
  width: 1.85rem;
  min-height: 4.22rem;
  position: absolute;
  top: 0;
  right: -2.29rem;
  opacity: 0;
  animation: eyehide 0.5s;
  -moz-animation: eyehide 0.5s; /* Firefox */
  -webkit-animation: eyehide 0.5s; /* Safari 和 Chrome */
  -o-animation: eyehide 0.5s; /* Opera */
}
.eye-dialog-arrow {
  width: 0.34rem;
  height: 0.36rem;
  position: absolute;
  top: 0.22rem;
  left: 1.95rem;
  background: url("../assets/img/dialog-arrow.png") no-repeat;
  background-size: contain;
}
.eye-direction {
  width: 1.85rem;
  height: 0.86rem;
  background: url("../assets/img/eye-big-border.png") no-repeat;
  background-size: contain;
  padding-top: 0.1rem;
  cursor: pointer;
}
.eye-direction-item {
  width: 100%;
  text-align: center;
  font-size: 0.16rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 0.26rem;
}
.eye-item {
  width: 1.85rem;
  height: 0.33rem;
  background: url("../assets/img/eye-little.png") no-repeat;
  background-size: contain;
  margin-top: 0.11rem;
  font-size: 0.16rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 0.33rem;
  text-align: center;
  cursor: pointer;
}
.eye-item-normal {
  color: rgba(255, 255, 255, 1);
}
.eye-item-active {
  color: #0eefef;
}

.ring-box {
  width: 3.22rem;
  height: 2.45rem;
  position: absolute;
  top: 3.16rem;
  right: 2.32rem;
  overflow: hidden;
}
.ring-dialog-arrow {
  width: 0.34rem;
  height: 0.36rem;
  position: absolute;
  top: 0.27rem;
  left: 2.88rem;
  background: url("../assets/img/dialog-arrow.png") no-repeat;
  background-size: contain;
}
.ring-box > div {
  width: 2.89rem;
  height: 2.45rem;
  position: absolute;
  top: 0;
  background: url("../assets/img/ring-border.png") no-repeat;
  background-size: contain;
}
.ring-dialog {
  right: 0.33rem;
  opacity: 1;
  animation: ringshow 1s;
  -moz-animation: ringshow 1s; /* Firefox */
  -webkit-animation: ringshow 1s; /* Safari 和 Chrome */
  -o-animation: ringshow 1s; /* Opera */
}
.ring-dialog-hide {
  right: -3.22rem;
  opacity: 0;
  animation: ringhide 0.5s;
  -moz-animation: ringhide 0.5s; /* Firefox */
  -webkit-animation: ringhide 0.5s; /* Safari 和 Chrome */
  -o-animation: ringhide 0.5s; /* Opera */
}
.ring-item {
  width: 2.31rem;
  height: 0.33rem;
  float: left;
  position: relative;
  margin-bottom: 0.17rem;
  margin-left: 0.29rem;
}
.ring-item:nth-child(1) {
  margin-top: 0.59rem;
}
.ring-item-back {
  width: 2.31rem;
  height: 0.33rem;
  background: #2773e6;
  opacity: 0.21;
  position: absolute;
}
.ring-light {
  width: 0.25rem;
  height: 0.25rem;
  float: left;
  background: url("../assets/img/ring-light.png") no-repeat;
  background-size: contain;
  margin-left: 0.07rem;
  margin-top: 0.04rem;
}
.ring-text {
  height: 0.33rem;
  font-size: 0.12rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #2465cb;
  line-height: 0.33rem;
  float: left;
  margin-left: 0.08rem;
}
.diagram-box {
  width: 2.55rem;
  height: 2.26rem;
  position: relative;
  /* overflow: hidden; */
  float: left;
}
.diagram-box:nth-child(3n) {
  margin-right: 0;
}
.diagram-title {
  background: url("../assets/img/diagram-title.png") no-repeat;
  background-size: cover;
  width: 1.14rem;
  height: 0.28rem;
  padding-left: 0.19rem;
  font-size: 0.18rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 0.28rem;
  margin: 0;
}
.diagram-box > div {
  position: absolute;
  left: -1.48rem;
  top: 0.28rem;
  width: 4rem;
  height: 1.6rem;
}
.goarea-box {
  width: 11.54rem;
  height: 8.28rem;
  position: absolute;
  top: 0.95rem;
  left: calc(50% - 5.77rem);
}
.goarea-item-1 {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 4.5rem;
  left: 4.8rem;
  cursor: pointer;
}
.goarea-item-2 {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 5.05rem;
  left: 7.1rem;
  cursor: pointer;
}
.goarea-item-3 {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 2.55rem;
  left: 8.85rem;
  cursor: pointer;
}
.goproject-box {
  width: 11.54rem;
  height: 8.28rem;
  position: absolute;
  top: 0.95rem;
  left: calc(50% - 5.77rem);
}
.goproject-item-1 {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 4.5rem;
  left: 4.8rem;
  cursor: pointer;
}
.goproject-item-2 {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 5.05rem;
  left: 7.1rem;
  cursor: pointer;
}
.goproject-item-3 {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 2.55rem;
  left: 8.85rem;
  cursor: pointer;
}
.goproject-box {
  width: 5.43rem;
  height: 6.43rem;
  position: absolute;
  top: 1.83rem;
  left: calc(50% - 2.715rem);
}
.goproject-item-1 {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 2.58rem;
  left: 1.8rem;
  cursor: pointer;
}
.goproject-item-2 {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 1rem;
  left: 2.6rem;
  cursor: pointer;
}
.goproject-item-3 {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 1.17rem;
  left: 4.6rem;
  cursor: pointer;
}
.goproject-item-4 {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 3.38rem;
  left: 1.75rem;
  cursor: pointer;
}
.goproject-item-5 {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 3.67rem;
  left: 2.85rem;
  cursor: pointer;
}
.goproject-item-6 {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 4.52rem;
  left: 0.64rem;
  cursor: pointer;
}
.goproject-item-7 {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 5.3rem;
  left: 2.58rem;
  cursor: pointer;
}
</style>
