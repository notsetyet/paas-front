<template>
  <div class="courseinfo-admin">
    <div class="layout-breadcrumb">
      <Breadcrumb style="margin-left: 30px;margin-top: 30px; float: left">
        <BreadcrumbItem></BreadcrumbItem>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/my-course-admin">我的课程</BreadcrumbItem>
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
      <br />
      <i-button type="primary" @click="showstudent" style="margin-right: 10px"
        >学生名单</i-button
      >
      <i-button type="primary" @click="value3 = true" style="margin-right: 10px"
        >导入学生</i-button
      >
      <i-button type="primary" :to="'/create-containers/'+cid" style="margin-right: 10px"
        >创建容器</i-button
      >
      <Drawer
        title="导入学生"
        v-model="value3"
        width="720"
        :mask-closable="false"
        :styles="styles"
      >
        <div
          style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;"
        >
          <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll"
            >全选</Checkbox
          >
        </div>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
          <Checkbox
            v-for="(student, index) in studentList"
            :key="index"
            :label="student"
          >{{student.username}}</Checkbox>
        </CheckboxGroup>
        <Divider></Divider>
        <i-button type="primary" @click="addstudent">导入学生</i-button>
      </Drawer>
    </Card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  mounted() {
    axios
      .get("http://10.251.253.188:8080/courses/" + this.cid)
      .then((res) => {
        console.log(res.data);
        this.courseInfo = res.data;
      });
    axios.get("http://10.251.253.188:8080/user/getAll/"+this.cid).then((res) => {
      console.log(res.data);
      this.studentList = res.data;
    });
  },
  data() {
    return {
      indeterminate:true,
      cid: this.$route.params.id,
      value1: "",
      modal1: false,
      value3: false,
      checkAll: false,
      checkAllGroup: [],
      studentList: ["www", "qqq", "ddd", "xxx"],
      courseInfo: "",
    };
  },

  methods: {
    showstudent(){
      let tmp='';
      axios.get("http://10.251.253.188:8080/user/getByCourse/"+this.cid).then((res) => {
      console.log(res.data);
      for (var i=0;i<res.data.length;i++){
        tmp+=res.data[i].username;
        if (i!=res.data.length-1)
        tmp+=",";
      }
      alert(tmp)
    });
    },
      create(){
          axios.post("http://10.251.253.188:8080/courses/createContainer/"+this.cid).then((res) => {
          console.log(res.data);
          alert("添加成功")
    });
      },
    addstudent() {
      console.log(this.checkAllGroup);
      let str=[];
      for (var i=0;i<this.checkAllGroup.length;i++){
          str.push(this.checkAllGroup[i].id);
      }
      console.log(str);
      axios
        .post("http://10.251.253.188:8080/courses/addStudents/"+this.cid, {
          students: str
        })
        .then((res) => {
          console.log(res.data);
          alert("添加成功")
        });
    },
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = this.studentList;
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange(data) {
      if (data.length === this.studentList.length) {
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
