<template>
  <div class="manage-container">
    <div class="layout-breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/">管理页</BreadcrumbItem>
        <BreadcrumbItem>管理容器</BreadcrumbItem>
      </Breadcrumb>
      <h2 style="font-weight: bold">管理容器</h2>
    </div>
    <div class="layout-content">
      <Card>
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
            <Button type="error" size="small" @click="remove(row)">删除</Button>
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
      .get("http://10.128.27.69:8080/containers/all" )
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
          tmpData.id = this.back[i].Id;
          tmpData.status = this.back[i].State;
          this.data.push(tmpData);
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
          width: 160,
        },
        {
          title: "Owner",
          key: "owner",
          width: 160,
        },
        {
          title: "Image",
          width: 160,
          key: "mirror",
        },
        {
          title: "Port",
          width: 160,
          key: "port",
        },
        {
          title: "Status",
          width: 160,
          key: "status",
        },
        {
          title: "Action",
          slot: "action",
          width: 200,
          align: "center",
        },
      ],
      data: [],
    };
  },
};
</script>

<style scoped></style>
