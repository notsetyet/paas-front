<template>
  <div class="my-course-admin">
    <div class="layout-breadcrumb">
      <Breadcrumb style="margin-left: 30px;margin-top: 30px; float: left">
        <BreadcrumbItem></BreadcrumbItem>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>我的课程</BreadcrumbItem>
      </Breadcrumb>
      <br /><br /><br />
      <h2 style="font-weight: bold;text-align:center">我的课程</h2>
    </div>
    <Card title="已创建课程">
      <Table border :columns="columns" :data="data">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action"
          ><!--slot-scope="{ row, index }"-->
          <Button type="primary" size="small" :to="'/courseinfo-admin/'+row.id"
            >详情</Button
          >
        </template>
      </Table>
    </Card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  // inject:['fresh'],
  mounted() {
      axios.get("http://10.251.253.188:8080/courses/getAll").then((res) => {
          console.log(res.data)
      this.data=res.data;
    });
  },
  data() {
    return {
      columns: [
        {
          title: "CID",
          key: "id",
        },  
        {
          title: "Name",
          key: "name",
        },
        {
          title: "Teacher",
          key: "teacher",
        },
        {
          title: "Introduce",
          key: "info",
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
  },
};
</script>

<style scoped>
.manage-user {
  margin-top: 10px;
  margin-left: 25%;
  width: 50%;
}
</style>
