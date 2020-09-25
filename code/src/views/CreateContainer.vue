<template>
  <div class="create-container">
    <div class="layout-breadcrumb">
      <Breadcrumb style="float: left">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>创建容器</BreadcrumbItem>
      </Breadcrumb>
      <br />
      <h2 style="font-weight: bold;">创建容器</h2>
    </div>
    <div class="layout-content">
      <Card style="margin-top: 30px; ">
        <Steps :current="current">
          <Step title="请选择镜像"></Step>
          <Step title="配置端口"></Step>
        </Steps>
        <div class="step1" v-if="current == 0">
          <Select v-model="image" style="width:300px; margin-top: 10px">
            <i-option
              v-for="item in containerList"
              :key="item.id"
              :value="item.show"
              >{{ item.show }}</i-option
            >
          </Select>
          <br />
          <i-input
            v-model="name"
            placeholder="请输入容器名称..."
            style="width: 300px; margin: 10px"
          ></i-input>
          <br />
          <Button
            type="primary"
            style="width: 300px; margin: 10px"
            @click="modal1 = true"
            >拉取镜像</Button
          >
          <Spin size="large" fix v-if="spinShow"></Spin>
          <Modal
            v-model="modal1"
            title="拉取镜像"
            @on-ok="ok"
            @on-cancel="cancel"
          >
            <i-input
              v-model="value1"
              placeholder="请输入镜像名称..."
              style="width: 300px; margin: 10px"
            ></i-input>
            <i-input
              v-model="value2"
              placeholder="请输入镜像版本..."
              style="width: 300px; margin: 10px"
            ></i-input>
            <Spin size="large" fix v-if="spinShow"></Spin>
          </Modal>
        </div>
        <div class="step2" v-if="current == 1">
          <!--<div class="setting">
                        <span>配置类型：</span>
                        <ButtonGroup>
                            <Button>计算优化型</Button>
                            <Button>内存优化型</Button>
                            <Button>存储优化型</Button>
                        </ButtonGroup>
                    </div>
                    <div class="setting">
                        <span>配置性能：</span>
                        <ButtonGroup>
                            <Button>低</Button>
                            <Button>中</Button>
                            <Button>高</Button>
                        </ButtonGroup>
                    </div>
                    <div class="CPU-ability">
                        <span>CPU配额(mCores)：</span>
                        <Slider style="width: 300px;" :value="this.coreValue" :tip-format="format1"></Slider>
                    </div>
                    <div class="CPU-ability">
                        <span>内存配额(MiB)：</span>
                        <Slider style="width: 300px" :value="this.localStorageValue" :tip-format="format2"></Slider>
                    </div>
                    <div class="CPU-ability">
                        <span>存储配额(MiB)：</span>
                        <Slider style="width: 300px" :value="this.storageValue" :tip-format="format3"></Slider>
                    </div>
                    <Divider></Divider>-->
          <div class="port">
            <i-input
              v-model="port"
              placeholder="开放端口"
              style="width: 300px; margin: 10px"
            ></i-input>
            <br />
            <h4>已添加端口：{{ ports }}</h4>
            <i-button style="width: 150px; margin: 20px" @click="addport()"
              >Add</i-button
            >
            <!--<i-button style="width: 150px; margin: 20px" @click="showport()"
              >显示已添加端口</i-button
            >-->
          </div>
          <Divider></Divider>
          <div class="open">
          <template>
            <h4>是否开启终端</h4><i-switch v-model="switch1" />
          </template>
          </div>
        </div>
        <br>
        <i-button
          type="primary"
          @click="previous"
          v-if="current != 0"
          style="margin-right: 10px"
          >上一步</i-button
        >
        <i-button type="primary" @click="next" v-if="current != 1"
          >下一步</i-button
        >
        <i-button type="primary" v-if="current == 1" @click="submit()"
          >完成创建</i-button
        >
      </Card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    axios.get("http://10.251.253.188:8080/images/all").then((res) => {
      console.log("1");
      console.log(res.data);
      this.back = res.data;

      for (var i = 0; i < this.back.length; i++) {
        let tmp = {};
        console.log(this.back[i].Id);
        tmp.id = this.back[i].Id;
        tmp.show = this.back[i].RepoTags[0];
        this.containerList.push(tmp);
      }
      console.log("2");
      console.log(this.containerList);
    });
    this.fresh();
  },
  data() {
    return {
      switch1: false,
      spinShow: false,
      modal1: false,
      value1: "",
      value2: "",
      current: 0,
      back: [],
      containerList: [],
      image: "",
      name: "",
      port: "",
      ports: [],
      values: "",
      coreValue: 0,
      localStorageValue: 0,
      storageValue: 0,
    };
  },

  methods: {
    ok() {
      console.log(this.value1);
      this.spinShow = true;
      axios
        .post("http://10.251.253.188:8080/images/pull/", null, {
          params: {
            imageName: this.value1,
            tag: this.value2,
          },
        })
        .then((res) => {
          console.log(res);
          this.$Message.success("拉取成功");
          this.spinShow = false;
          location.reload();
        });
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    submit() {
      axios
        .post(
          "http://10.251.253.188:8080/containers/create/" +
            localStorage.getItem("uid"),
          {
            image: this.image,
            name: this.name,
            ports: this.ports,
            isTerminalOpen: this.switch1,
          }
        )
        .then((res) => {
          console.log(res.data);
          this.$Message.success("创建成功");
        });
    },
    addport() {
      if (this.port == "") {
        alert("端口号不能为空");
        return;
      }
      let tmpData = this.port;
      this.ports.push(tmpData);
      this.$Message.success("添加成功");
    },
    showport() {
      alert(this.ports);
    },
    next() {
      if (this.current == 3) {
        this.current = 0;
      } else {
        this.current += 1;
      }
    },
    previous() {
      if (this.current != 0) {
        this.current -= 1;
      } else {
        console.log("previous false");
      }
    },
    continueAdd() {
      this.current = 0;
      this.fresh();
    },
    fresh() {},
    format1(val) {
      return 100 * val;
    },
    format2(val) {
      return 100 * val;
    },
    format3(val) {
      return 100 * val;
    },
  },
};
</script>

<style scoped>
.setting {
  margin: 10px;
}
.CPU-ability {
  display: flex;
  justify-content: center;
}
</style>
