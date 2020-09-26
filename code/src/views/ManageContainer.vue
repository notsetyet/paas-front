<template>
  <div class="manage-container">
    <div class="layout-breadcrumb">
      <Breadcrumb style="margin-left: 30px; float: left" separator="=>">
        <BreadcrumbItem></BreadcrumbItem>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>管理容器</BreadcrumbItem>
      </Breadcrumb>
      <br><br>
      <h2 style="font-weight: bold">管理容器</h2>
    </div>
    <div class="layout-content">
      <Card style="margin-top: 30px; ">
        <Table border :columns="columns" :data="data">
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
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
            <Button :disabled="row.status=='running'" type="error" size="small" @click="remove(row)">删除</Button>
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
    axios.get("http://10.251.253.188:8080/containers/all").then((res) => {
      console.log(res.data);
      this.back = res.data;
      for (let i = 0; i < this.back.length; i++) {
        //   console.log( this.back[i].Image);

        axios
          .get("http://10.251.253.188:8080/user/getUsername/" + this.back[i].Id)
          .then((res) => {
            let tmpData = {};
            tmpData.own = res.data;
            tmpData.name = this.back[i].Names[0].replace("/","");
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
            tmpData.id = this.back[i].Id;
            tmpData.status = this.back[i].State;
            this.data.push(tmpData);
          });
      }
    });
  },
  name: "ManageContainer",
  data() {
    return {
      conList: [{}],
      columns: [
        {
          title: "Name",
          key: "name",
        },
        {
          title: "Owner",
          key: "own",
        },
        {
          title: "Image",
          key: "mirror",
        },
        {
          title: "Port",
          key: "port",
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
      data: [],
    };
  },
  methods: {
    turnon(r) {
      console.log(r.id);
      axios
        .get("http://10.251.253.188:8080/containers/start/" + r.id)
        .then((res) => {
          console.log(res);
          this.$Message.success("开启成功");
          location.reload();
        });
    },
    turnoff(r, i) {
      console.log(r.id);
      console.log(i);
      axios
        .get("http://10.251.253.188:8080/containers/stop/" + r.id)
        .then((res) => {
          console.log(res);
          this.$Message.success("关闭成功");
          location.reload();
        });
    },
    remove(r) {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaa"+r.id);
      axios
        .get("http://10.251.253.188:8080/containers/remove/" + r.id)
        .then((res) => {
          console.log("bbbbbbbbbbbbbbbb"+res);
          this.$Message.success("删除成功");
          location.reload();
        });
    },
  },
};
</script>

<style scoped></style>
