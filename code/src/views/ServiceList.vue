<template>
  <div class="servicelist">
    <div class="layout-breadcrumb">
      <Breadcrumb style="margin-left: 30px;margin-top: 30px; float: left">
        <BreadcrumbItem></BreadcrumbItem>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>服务列表</BreadcrumbItem>
      </Breadcrumb>
      <br><br><br>
      <h2 style="font-weight: bold">服务列表</h2>
    </div>
    <div class="layout-content">
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
          <template slot-scope="{ row }" slot="port">
            <p v-for="(pt, index) in row.port" :key="index">
            <a :href="row.href[index]">{{pt}}</a>
            </p>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Spin size="large" fix v-if="spinShow"></Spin>
            <Button
              v-if="row.status=='running'"
              type="error"
              size="small"
              style="margin-right: 5px"
              @click="turnoff(row,index)"
              >关闭</Button
            >
            <Button
              v-if="row.status!='running'"
              type="primary"
              size="small"
              style="margin-right: 5px"
              @click="turnon(row)"
              >开启</Button
            >
            <Button :disabled="row.status=='running'" type="error" size="small" @click="remove(row)"
              >删除</Button
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
      .get("http://10.251.253.188:8080/containers/" + localStorage.getItem("uid"))
      .then((res) => {
        console.log(res.data);
        this.back = res.data;
        for (let i = 0; i < this.back.length; i++) {
        //   console.log( this.back[i].Image);
          let tmpData = {};
          tmpData.name = this.back[i].Names[0].replace("/","");
          tmpData.mirror = this.back[i].Image;
        //   console.log('aaa' + " " + this.back[i].Ports.length);
          tmpData.port = [];
          tmpData.href = [];
          for (let j = 0; j < this.back[i].Ports.length; j++) {
            tmpData.port[j] =
              "{10.251.253.189:" +
              this.back[i].Ports[j].PublicPort +
              "->" +
              this.back[i].Ports[j].PrivatePort +
              "/" +
              this.back[i].Ports[j].Type +
              "}";
            tmpData.href[j]="http://10.251.253.189:" +this.back[i].Ports[j].PublicPort;
          }
          tmpData.id = this.back[i].Id;
          tmpData.status = this.back[i].State;
          this.data.push(tmpData);
        }
      });
  },
  data() {
    return {
      spinShow: false,
      columns: [
        {
          title: "Name",
          key: "name",
        },
        {
          title: "Image",
          key: "mirror",
        },
        {
          title: "Port",
          slot: "port",
        },
        {
          title: "Status",
          key: "status",
        },
        {
          title: "Action",
          slot: "action",
          align: "center",
        },
      ],
      back: [],
      data: [],
    };
  },
  methods: {
    turnon(r){
      console.log(r.id);
      axios
      .get("http://10.251.253.188:8080/containers/start/" + r.id)
      .then((res) => {
        console.log(res);
        this.$Message.success("开启成功");
        location.reload();
      })
    },
    turnoff(r,i){
      console.log(i);
      this.spinShow=true;
      axios
      .get("http://10.251.253.188:8080/containers/stop/" + r.id)
      .then((res) => {
        console.log(res);
        this.$Message.success("关闭成功");
        this.spinShow=false;
        location.reload();
      })
    },
    remove(r){
      console.log(r.id);
      this.spinShow=true;
      axios
      .get("http://10.251.253.188:8080/containers/remove/" + r.id)
      .then((res) => {
        console.log(res);
        this.$Message.success("删除成功");
        this.spinShow=false;
        location.reload();
      })
    },
    tocreate() {
      this.$router.push({ path: "/create-container" });
    },
    
  },
};
</script>

<style scoped></style>
