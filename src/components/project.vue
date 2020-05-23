<template>
  <div class="country">
    <img src="../assets/img/country-02.png" class="background" />
    <img src="../assets/img/project.png" class="project-img" />
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
        <div
          class="home-item"
          v-for="(item,index) in home"
          :key="index"
          @click="showhome(index,'up')"
        >
          <img src="../assets/img/home-active.png" class="home-active-img" v-if="item['active']" />
          <div :class="item['active']?'home-content-active':'home-content'">
            <img :src="item['icon']" class="home-icon" />
            <div class="home-text">{{item['text']}}</div>
            <div class="home-data">{{item['data']}}</div>
          </div>
        </div>
        <div class="basicinfo">基础信息</div>
        <div class="info-box">
          <div
            class="info-item"
            v-for="(item,index) in basicInfo"
            :key="index"
            @click="showhome(index,'down')"
          >
            <img src="../assets/img/toplight.png" class="toplight" />
            <img :src="item.status?item.lighticon:item.icon" :class="item.class" />
            <div :class="item.status?'info-text-active':'info-text'">{{item.text}}</div>
          </div>
        </div>
      </div>
      <!-- 下拉框 -->
      <div class="project-position">
        <el-collapse-transition>
          <div class="project-box" v-show="projectshow">
            <img src="../assets/img/project-top.png" class="project-top" />
            <div
              :class="item['active']?'project-active':'project-name'"
              class="project-item"
              v-for="(item,index) in home[1]['projectname']"
              :key="index"
              @mouseover="lightproject(index)"
            >{{item['text']}}</div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
    <!-- basic详情弹框 -->
    <div class="home-detail-box" v-if="dialog['home']['show']">
      <div :class="homeDetailShow?'home-show':'home-hide'">
        <div class="home-detail">
          <div class="home-detail-title">{{homeDetail['title']}}</div>
          <div class="home-detail-item-box">
            <div class="home-detail-item" v-for="(item,index) in homeDetail['data']" :key="index">
              <div class="home-detail-item-title">{{item['title']}}</div>
              <div class="home-detail-item-text">{{item['data']}}</div>
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
// fade/zoom 等
import "element-ui/lib/theme-chalk/base.css";
// collapse 展开折叠
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";
import Vue from "vue";

Vue.component(CollapseTransition.name, CollapseTransition);
export default {
  name: "project",
  data() {
    return {
      note:
        "2020.02.18 <br/> 旭辉聚焦一二线及强三线城市，重点布局华东、华北、华南及中西部四大区域内有人口导入、有产业， 经济发展良好的城市。旭辉持续看好城市群、都市圈的发展， 积极抓住城市化2.0带给行业的机会，坚持城市深耕战略，通过住宅开发、物业服务、精品商业、长租公寓、幼小初高教育等多元业务，为城市美好生活创造无限可能。",
      home: [
        {
          icon: require("../assets/img/homeicon-01.png"),
          text: "项目编号",
          active: false,
          data: "A20190111002SZ",
          detail: {}
        },
        {
          icon: require("../assets/img/homeicon-02.png"),
          text: "项目名称",
          active: false,
          data: "苏州都会上品-一期/五期",
          projectname: [
            { text: "苏州都会上品-一期", active: false },
            { text: "苏州都会上品-二期", active: false },
            { text: "苏州都会上品-三期", active: false },
            { text: "苏州都会上品-四期", active: false },
            { text: "苏州都会上品-五期", active: false }
          ],
          detail: {
            title: "项目名称",
            typeshow: 1,
            data: [
              { title: "备案名", data: "xxxxxx" },
              { title: "曾用名", data: "xxxxxx" }
            ]
          }
        },
        {
          icon: require("../assets/img/projecticon-01.png"),
          text: "城市/区位",
          active: false,
          data: "苏州/xx区",
          detail: {}
        },
        {
          icon: require("../assets/img/projecticon-03.png"),
          text: "产品线",
          active: false,
          data: "H系",
          detail: {}
        },
        {
          icon: require("../assets/img/projecticon-04.png"),
          text: "合作方信息",
          active: false,
          data: "",
          detail: {
            title: "合作方信息",
            typeshow: 1,
            data: [
              { title: "设计操盘", data: "旭辉" },
              { title: "成本操盘", data: "AAA" },
              { title: "成本操盘", data: "AAA" }
            ]
          }
        }
      ],
      projectshow: false,
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
      homeDetailShow: false,
      homeDetail: {},
      basicInfo: [
        {
          icon: require("../assets/img/info-01.png"),
          lighticon: require("../assets/img/info-light-01.png"),
          class: "info-01",
          status: false,
          text: "面积",
          detail: {
            title: "面积",
            typeshow: 1,
            data: [
              { title: "占地面积", data: "XXXX" },
              { title: "容积率", data: "XXXX" },
              { title: "总建面", data: "XXXX" },
              { title: "可售面积", data: "XXXX" },
              { title: "地下面积", data: "XXXX" }
            ]
          }
        },
        {
          icon: require("../assets/img/info-02.png"),
          lighticon: require("../assets/img/info-light-02.png"),
          class: "info-02",
          status: false,
          text: "计划",
          detail: {
            title: "计划",
            typeshow: 1,
            data: [
              { title: "拿地", data: "XXXX" },
              { title: "开盘", data: "XXXX" },
              { title: "竣备", data: "XXXX" },
              { title: "交付", data: "XXXX" }
            ]
          }
        },
        {
          icon: require("../assets/img/info-03.png"),
          lighticon: require("../assets/img/info-light-03.png"),
          class: "info-03",
          status: false,
          text: "团队",
          detail: {
            title: "团队",
            typeshow: 1,
            data: [
              { title: "项目经理", data: "钱大林" },
              { title: "项目设计PM", data: "盛立丰" },
              { title: "项目运营PM", data: "倪志文" },
              { title: "项目工程PM", data: "李超" },
              { title: "项目成本PM", data: "杨扬" }
            ],
            info: [
              { title: "合作方1", data: "XXXX" },
              { title: "合作方2", data: "XXXX" },
              { title: "合作方3", data: "XXXX" },
              { title: "合作方4", data: "XXXX" }
            ]
          }
        },
        // {
        //   icon: require("../assets/img/info-04.png"),
        //   lighticon: require("../assets/img/info-light-04.png"),
        //   class: "info-04",
        //   status: false,
        //   text: "供方",
        //   detail: {
        //     title: "供方",
        //     data: [
        //       { title: "建筑方案", data: "天华" },
        //       { title: "建筑社工图", data: "天华" },
        //       { title: "工程总包", data: "XXXX" },
        //       { title: "景观工程", data: "XXXX" },
        //       { title: "室内工程", data: "XXXX" }
        //     ]
        //   }
        // },
        {
          icon: require("../assets/img/info-05.png"),
          lighticon: require("../assets/img/info-light-05.png"),
          class: "info-05",
          status: false,
          text: "经营",
          detail: {
            title: "经营",
            typeshow: 1,
            data: [
              // { title: "总货值", data: "XXXX" },
              // { title: "总投资", data: "XXXX" },
              { title: "四项成本", data: "XXXX" }
              // { title: "毛利率", data: "XXXX" },
              // { title: "平均售价", data: "XXXX" },
              // { title: "IRR", data: "XXXX" }
            ]
          }
        },
        {
          icon: require("../assets/img/info-06.png"),
          lighticon: require("../assets/img/info-light-06.png"),
          class: "info-06",
          status: false,
          text: "产品",
          detail: {
            title: "产品",
            typeshow: 1,
            data: [
              { title: "业态", data: "大高" },
              { title: "CIFI5/6", data: "CIFI5" },
              { title: "核心配置", data: "全龄社区\n智慧社区" },
              { title: "95", data: "XXX%" },
              { title: "110", data: "XXX%" },
              { title: "118", data: "XXX%" }
            ]
          }
        }
      ]
    };
  },
  created() {},
  methods: {
    lightproject(index) {
      let that = this;
      let projectName = that.home[1]["projectname"];
      let projectItem = document.getElementsByClassName("project-item");
      for (let i = 0; i < projectName.length; i++) {
        projectItem[i].classList.remove("project-prevent");
        if (i == index) {
          projectName[i]["active"] = true;
        } else {
          projectName[i]["active"] = false;
        }
      }
      that.home[1]["projectname"] = projectName;
      if (index > 0) {
        setTimeout(function() {
          projectItem[index - 1].classList.add("project-prevent");
        }, 1);
      }
    },
    showhome(index, type) {
      let that = this;
      if (type == "up") {
        let basicInfo = this.basicInfo;
        for (let i = 0; i < basicInfo.length; i++) {
          basicInfo[i]["status"] = false;
        }
        this.basicInfo = basicInfo;
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
          if (typeof home[index]["detail"]["typeshow"] !== "undefined") {
            that.homeDetailShow = true;
          }
        }, 500);
        this.home = home;
      } else {
        let home = this.home;
        for (let i = 0; i < home.length; i++) {
          home[i]["active"] = false;
        }
        this.home = home;

        let basicInfo = this.basicInfo;
        for (let i = 0; i < basicInfo.length; i++) {
          if (index == i) {
            basicInfo[i]["status"] = true;
          } else {
            basicInfo[i]["status"] = false;
          }
        }
        that.homeDetailShow = false;
        setTimeout(function() {
          that.homeDetail = basicInfo[index]["detail"];
          if (typeof basicInfo[index]["detail"]["typeshow"] !== "undefined") {
            that.homeDetailShow = true;
          }
        }, 500);
        this.basicInfo = basicInfo;
      }
      that.projectshow = that.home[1]["active"];
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
        this.projectshow = false;
        this.homeDetailShow = false;
        for (let item in this.home) {
          this.home[item]["active"] = false;
        }
      }
      this.dialog = dialog;
    },
    checkview(index) {
      if (this.view[index]["active"]) {
        this.view[index]["active"] = false;
      } else {
        this.view[index]["active"] = true;
      }
    },
    getnote() {
      let note = this.$refs.notes.innerText;
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
.project-position {
  position: absolute;
  top: 1.68rem;
  right: 0.2rem;
}
.project-box {
  font-size: 0.12rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 0.3rem;
  background: #071330;
  border: 0.01rem solid #2773e6;
  cursor: pointer;
  background-image: url("../assets/img/project-name.png");
  background-size: contain;
}
.project-top {
  width: 0.1rem;
  height: 0.08rem;
  position: absolute;
  top: -0.07rem;
  right: 0.12rem;
  z-index: 1;
}
.project-name {
  color: rgba(255, 255, 255, 1);
  padding: 0 0.1rem 0 0.13rem;
  margin: 0 0.07rem 0 0.11rem;
  border-bottom: 0.01rem solid #2773e6;
}
.project-name:last-child {
  border-bottom: none;
}
.project-prevent {
  line-height: 0.31rem;
  border-bottom: none;
}
.project-active {
  width: calc(100% - 0.24rem);
  line-height: 0.31rem;
  padding-left: 0.22rem;
  background: rgba(39, 115, 230, 0.2);
  color: #0de5e5;
  border-left: 0.02rem solid #0cd2d3;
}
.basicinfo {
  width: 3.23rem;
  height: 0.12rem;
  margin: 0.26rem auto;
  margin-top: 0.38rem;
  background: url("../assets/img/splitline.png") no-repeat;
  background-size: contain;
  font-size: 0.12rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 0.12rem;
  text-align: center;
}
.project-img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}
.info-box {
  width: 3.1rem;
  min-height: 0.75rem;
  margin: 0 auto;
}
.info-item {
  width: 1.4rem;
  height: 0.48rem;
  background: rgba(3, 12, 32, 0.63);
  border: 0.01rem solid rgba(18, 51, 104, 1);
  float: left;
  margin-right: 0.26rem;
  margin-bottom: 0.09rem;
  position: relative;
  cursor: pointer;
}
.info-item:nth-child(2n) {
  margin-right: 0;
}
.info-item .toplight {
  width: 1.41rem;
  height: 0.11rem;
  position: absolute;
  display: block;
  top: -0.055rem;
  left: 0.005rem;
}
.info-text {
  height: 0.12rem;
  font-size: 0.12rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 0.12rem;
  position: absolute;
  top: 0.18rem;
  left: 0.8rem;
  color: #1f59b3;
}
.info-text-active {
  height: 0.12rem;
  font-size: 0.12rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 0.12rem;
  position: absolute;
  top: 0.18rem;
  left: 0.8rem;
  color: #0eefef;
}
.info-01 {
  width: 0.23rem;
  height: 0.23rem;
  position: absolute;
  top: 0.13rem;
  left: 0.39rem;
}
.info-02 {
  width: 0.23rem;
  height: 0.22rem;
  position: absolute;
  top: 0.13rem;
  left: 0.43rem;
}
.info-03 {
  width: 0.23rem;
  height: 0.19rem;
  position: absolute;
  top: 0.15rem;
  left: 0.38rem;
}
.info-04 {
  width: 0.23rem;
  height: 0.23rem;
  position: absolute;
  top: 0.13rem;
  left: 0.43rem;
}
.info-05 {
  width: 0.23rem;
  height: 0.23rem;
  position: absolute;
  top: 0.13rem;
  left: 0.39rem;
}
.info-06 {
  width: 0.23rem;
  height: 0.24rem;
  position: absolute;
  top: 0.12rem;
  left: 0.43rem;
}

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

  animation: leftshow 1.5s;
  -moz-animation: leftshow 1.5s; /* Firefox */
  -webkit-animation: leftshow 1.5s; /* Safari 和 Chrome */
  -o-animation: leftshow 1.5s; /* Opera */
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
  animation: rightshow 1.5s;
  -moz-animation: rightshow 1.5s; /* Firefox */
  -webkit-animation: rightshow 1.5s; /* Safari 和 Chrome */
  -o-animation: rightshow 1.5s; /* Opera */
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
@keyframes diagramhide {
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
  min-width: 0.7rem;
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
  margin-left: 0.1rem;
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
</style>
