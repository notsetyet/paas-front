<template>
  <div class="servicelist">
    <div class="layout-breadcrumb">
      <Breadcrumb style="float: left">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/">服务页</BreadcrumbItem>
        <BreadcrumbItem>服务列表</BreadcrumbItem>
      </Breadcrumb>
      <h2 style="font-weight: bold">服务列表</h2>
    </div>
    <div class="layout-content">
      <Card style="height: 200px">
        <i-col span="1" offset="1">
          <h5>CPU</h5>
          <br />
          <h5>已使用</h5>
          <p>1000</p>
          <br />
          <h5>总配额</h5>
          <p>10000</p>
        </i-col>
        <i-col span="2" offset="4">
          <i-circle :percent="80" stroke-color="#5cb85c">
            <span class="demo-circle-inner">80%</span>
            <!--  style="font-size:24px" -->
          </i-circle>
        </i-col>
        <i-col span="1" offset="1">
          <h5>内存(MB)</h5>
          <br />
          <h5>已使用</h5>
          <p>1000</p>
          <br />
          <h5>总配额</h5>
          <p>10000</p>
        </i-col>
        <i-col span="2" offset="4">
          <i-circle :percent="80" stroke-color="#5cb85c">
            <span class="demo-circle-inner">80%</span>
            <!--  style="font-size:24px" -->
          </i-circle>
        </i-col>
        <i-col span="1" offset="1">
          <h5>存储(MB)</h5>
          <br />
          <h5>已使用</h5>
          <p>1000</p>
          <br />
          <h5>总配额</h5>
          <p>10000</p>
        </i-col>
        <i-col span="2" offset="4">
          <i-circle :percent="80" stroke-color="#5cb85c">
            <span class="demo-circle-inner">80%</span>
            <!--  style="font-size:24px" -->
          </i-circle>
        </i-col>
      </Card>

      <Card style="margin-top: 30px; ">
        <i-button
          type="primary"
          icon="plus"
          style="float: left"
          @click="tocreate()"
          ><span>新建容器</span></i-button
        ><br /><br />
        <Table border :columns="columns" :data="data">
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button
              type="primary"
              size="small"
              style="margin-right: 5px"
              @click="show(index)"
              >ON/OFF</Button
            >
            <Button type="error" size="small" @click="remove(index)"
              >Delete</Button
            >
          </template>
        </Table>
      </Card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    axios
      .get("http://10.128.27.69:8080/containers/" + localStorage.getItem("uid"))
      .then((res) => {
        console.log(res.data);
        this.back = res.data;
        for (let i = 0; i < this.back.length; i++) {
        //   console.log( this.back[i].Image);
          let tmpData = {};
          tmpData.name = this.back[i].Names[0];
          tmpData.mirror = this.back[i].Image;
        //   console.log('aaa' + " " + this.back[i].Ports.length);
          tmpData.port = [];
          for (let j = 0; j < this.back[i].Ports.length; j++) {
            tmpData.port[j] =
              "{10.251.253.189:" +
              this.back[i].Ports[j].PublicPort +
              "->" +
              this.back[i].Ports[j].PrivatePort +
              "/" +
              this.back[i].Ports[j].Type +
              "}";
          }
          tmpData.status = this.back[i].State;
          this.data.push(tmpData);
          console.log(i + "bbb " + this.back.length);
        }
      });
  },
  data() {
    return {
      indeterminate: true,
      checkAll: false,
      checkAllGroup: ["香蕉", "西瓜"],
      columns: [
        {
          title: "Name",
          key: "name",
          width: 200,
        },
        {
          title: "Image",
          width: 200,
          key: "mirror",
        },
        {
          title: "Port",
          width: 200,
          key: "port",
        },
        {
          title: "Status",
          width: 200,
          key: "status",
        },
        {
          title: "Action",
          slot: "action",
          width: 200,
          align: "center",
        },
      ],
      back: [],
      data: [],
    };
  },
  methods: {
    tocreate() {
      this.$router.push({ path: "/create-container" });
    },
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = ["香蕉", "苹果", "西瓜"];
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange(data) {
      if (data.length === 3) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
  },
};
</script>

<style scoped></style>
