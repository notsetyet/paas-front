<template>
  <div id="app">

    <div class="nav">
      <Row>
        <i-col span="8">
          <Menu :theme="theme2">
            <Menu-item style="font-size: x-large">云平台</Menu-item>
            <Submenu key="1">
              <template slot="title">
                <Icon type="ios-paper"></Icon>
                服务页
              </template>
              <Menu-item key="1-1" to="/servece-list">服务列表</Menu-item>
              <Menu-item key="1-2">创建容器</Menu-item>
            </Submenu>
            <Submenu key="2">
              <template slot="title">
                <Icon type="ios-people"></Icon>
                课程页
              </template>
              <Menu-item key="2-1">课程列表</Menu-item>
            </Submenu>
            <Submenu key="3">
              <template slot="title">
                <Icon type="stats-bars"></Icon>
                管理页
              </template>
              <Menu-item key="3-1">监控页</Menu-item>
              <Menu-item key="3-2">用户管理</Menu-item>
              <Menu-item key="3-3">镜像管理</Menu-item>
              <Menu-item key="3-4">容器管理</Menu-item>
            </Submenu>
          </Menu>
        </i-col>

        <i-col span="15" offset="0">
          <Menu style="width: 100%">
            <Menu-item to="/login" v-if="uid == null" style="float: right" name="1-1">登录/注册</Menu-item>
            <Menu-item v-if="uid != null" style="float: right" name="1-2">{{this.username}}</Menu-item>
          </Menu>
        </i-col>
      <br>
      </Row>
    </div>
    <router-view />
  </div>
</template>

<script>

export default {
  mounted(){
    this.fresh();
  },
  data () {
    return {
      theme2: 'light',
      username: "",
      uid: ""
    }
  },
  methods:{
    fresh() {
      this.uid = localStorage.getItem("uid");
      this.username = localStorage.getItem("username");
      if (this.uid != null) this.$Message.success("欢迎回来！" + this.username);
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f0f8ff;
}
</style>
