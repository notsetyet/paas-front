<template>
  <div class="courseinfo">
    <div class="layout-breadcrumb">
      <Breadcrumb style="margin-left: 30px;margin-top: 30px; float: left">
        <BreadcrumbItem></BreadcrumbItem>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/my-course">我的课程</BreadcrumbItem>
        <BreadcrumbItem>课程详情</BreadcrumbItem>
      </Breadcrumb>
      <br /><br /><br />
      <h2 style="font-weight: bold;text-align:center">课程详情</h2>
    </div>
    <Card>
      <CellGroup style="text-align: left;">
        <Cell :title="'课程名称：' + courseInfo.name" />
        <Cell :title="'开课教师：' + courseInfo.teacher" />
        <Collapse>
          <Panel name="1">
            课程简介
            <p slot="content">{{ courseInfo.info }}</p>
          </Panel>
        </Collapse>
      </CellGroup>
    </Card>
    <Card>
      <Table border :columns="columns" :data="data">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="port">
          <p v-for="(pt, index) in row.port" :key="index">
            <a :href="row.href[index]">{{ pt }}</a>
          </p>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Spin size="large" fix v-if="spinShow"></Spin>
          <Button
            v-if="row.status == 'running'"
            type="error"
            size="small"
            style="margin-right: 5px"
            @click="turnoff(row, index)"
            >关闭</Button
          >
          <Button
            v-if="row.status != 'running'"
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="turnon(row)"
            >开启</Button
          >
          <Button
            :disabled="row.status == 'running'"
            type="error"
            size="small"
            @click="remove(row)"
            >删除</Button
          >
        </template>
      </Table>
    </Card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  mounted() {
    axios.get("http://10.251.253.188:8080/courses/" + this.cid).then((res) => {
      console.log(res.data);
      this.courseInfo = res.data;
    });
    axios
      .get("http://10.251.253.188:8080/containers/course/"+this.cid+"/" + localStorage.getItem("uid"))
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
      cid: this.$route.params.id,
      value1: "",
      modal1: false,
      value3: false,
      courseInfo: "",
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
    
  },
};
</script>

<style scoped></style>
