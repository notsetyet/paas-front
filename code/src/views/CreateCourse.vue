<template>
  <div class="create-course">
    <div class="layout-breadcrumb">
      <Breadcrumb style="margin-left: 30px;margin-top: 30px; float: left">
        <BreadcrumbItem></BreadcrumbItem>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem>创建课程</BreadcrumbItem>
      </Breadcrumb>
      <br /><br /><br />
      <h2 style="font-weight: bold;text-align:center">创建课程</h2>
    </div>
    <div class="layout-content">
      <Card style="margin-top: 30px; ">
        <i-input
          v-model="name"
          placeholder="请输入课程名称..."
          style="width: 300px; margin: 10px"
        ></i-input>
        <br />
        <i-input
          v-model="teacher"
          placeholder="请输入教师姓名..."
          style="width: 300px; margin: 10px"
        ></i-input>
        <br />
        <i-input
          type="textarea"
          v-model="introduce"
          placeholder="请输入课程简介..."
          style="width: 300px; margin: 10px"
        ></i-input>
        <br />

        <i-button type="primary" @click="submit()">完成创建</i-button>
      </Card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
  },
  data() {
    return {
      indeterminate: true,
      checkAll: false,
      checkAllGroup: [],
      studentList: ["www", "qqq", "ddd", "xxx"],
      introduce: "",
      name: "",
      teacher: "",
      ports: [],
      localStorageValue: 0,
      storageValue: 0,
    };
  },

  methods: {
    submit() {
      axios.post("http://10.251.253.188:8080/courses/create",{
            name: this.name,
            teacher: this.teacher,
            info: this.introduce,
          }).then((res) => {
      console.log(res.data);
      alert("创建成功");
    });
    },
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

<style scoped></style>
