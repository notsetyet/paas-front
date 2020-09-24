<template>
  <div class="change-password">
    <div class="layout-breadcrumb">
      <Breadcrumb style="float: left">
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/">个人页</BreadcrumbItem>
        <BreadcrumbItem>修改密码</BreadcrumbItem>
      </Breadcrumb>
      <h2 style="font-weight: bold;">修改密码</h2>
    </div>
    <div class="layout-content">
      <Card>
        <i-input
          type="password"
          v-model="oldp"
          placeholder="请输入旧密码..."
          style="width: 300px; margin: 10px"
        ></i-input><br>
        <i-input
          type="password"
          v-model="newp"
          placeholder="请输入新密码..."
          style="width: 300px; margin: 10px"
        ></i-input><br>
        <i-input
          type="password"
          v-model="newpp"
          placeholder="请确认新密码..."
          style="width: 300px; margin: 10px"
        ></i-input>
        <br />
        <Button
          type="primary"
          style="width: 300px; margin: 10px"
          @click="submit()"
          >修改</Button
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
      oldp: '',
      newp: ''
    };
  },

  methods: {
    submit(){
        if (this.newp!=this.newpp){alert("新密码不一致");return;}
        axios
        .post("http://10.251.253.188:8080/user/changePassword/", null, {
          params: {
            id: localStorage.getItem("uid"),
            oldPassword: this.oldp,
            newPassword: this.newp,
          },
        })
        .then((res) => {
          console.log(res);
          this.$Message.success("修改成功");
          this.$router.push({
                    path: '/',
                    query: {}
                });
        });
    }
  },
};
</script>