<template>
  <div id="app">
    <div class="layout" :class="{ 'layout-hide-text': spanLeft < 5 }">
      <Row type="flex" style="height: 100vw;">
        <i-col :span="spanLeft" class="layout-menu-left">
          <Menu
                  active-key="1"
                  theme="dark"
                  width="auto"
          >
            <div class="layout-logo-left"></div>
            <Submenu  key="1" name="1"><!--v-if="uid != null" -->
              <template slot="title">
                <Icon type="ios-navigate" :size="iconSize"></Icon>
                服务页
              </template>
              <Menu-item name="sl" key="1-1" to="/service-list"><Icon type="ios-list"></Icon>服务列表</Menu-item>
              <Menu-item name="cc" key="1-2" to="/create-container"><Icon type="ios-add" />创建容器</Menu-item>
            </Submenu>
            <Submenu  key="2" name="2"><!--v-if="uid != null && utype == 0" -->
              <template slot="title">
                <Icon type="ios-navigate" :size="iconSize"></Icon>
                管理页
              </template>
              <Menu-item name="mc" key="2-1" to="/manage-container"><Icon type="md-apps" />管理容器</Menu-item>
            </Submenu>
            <Menu-item name="lr" v-if="uid == null" to="/login">登陆注册</Menu-item>
            <Submenu v-if="uid != null" key="3" name="3">
              <template slot="title">
                <Icon type="ios-person" :size="iconSize"></Icon>
                {{ this.username }}
              </template>
              <Menu-item name="lo" key="3-1" @click.native="logout"><Icon type="ios-log-out" />注销</Menu-item>
              <Menu-item name="cp" key="3-2" to="/changepassword"><Icon type="md-create" />修改密码</Menu-item>
            </Submenu>
          </Menu>
        </i-col>
        <i-col :span="spanRight" style="height: 100%">
          <div class="layout-header">
            <i-button type="text" @click.native="toggleClick" style="float: left">
              <Icon type="ios-code" size="32"></Icon>
            </i-button>
          </div>
          <router-view />
          <!--          <div class="layout-copy">-->
          <!--            2020-2020 &copy; PAAS-->
          <!--          </div>-->
        </i-col>
      </Row>
    </div>

  </div>
</template>

<script>
  export default {
    mounted() {
      this.fresh();
    },
    data() {
      return {
        spanLeft: 5,
        spanRight: 19,
        username: "123",
        uid: 1,
        utype: 1,
      };
    },
    computed: {
      iconSize() {
        return this.spanLeft === 5 ? 14 : 24;
      },
    },
    methods: {
      logout() {
        localStorage.clear();
        this.$Message.success("注销成功 跳转回首页");
        this.$router.push({ path: "/" });
        this.fresh();
      },
      fresh() {
        this.uid = localStorage.getItem("uid");
        this.username = localStorage.getItem("username");
        this.utype = localStorage.getItem("utype");
        console.log("type:" + this.utype);
        if (this.uid != null) this.$Message.success("欢迎回来！" + this.username);
      },
      toggleClick() {
        if (this.spanLeft === 5) {
          this.spanLeft = 2;
          this.spanRight = 22;
        } else {
          this.spanLeft = 5;
          this.spanRight = 19;
        }
        console.log('span'+this.spanLeft);
      },
    },
  };
</script>

<style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    /*border-radius: 4px;*/
    overflow: hidden;
    width: 100%;
    height: 100vw;
    padding: 0;
    margin: 0;
  }
  .layout-breadcrumb {
    padding: 10px 15px 0;
  }
  .layout-content {
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main {
    padding: 10px;
  }
  /*.layout-copy {*/
  /*  text-align: center;*/
  /*  color: #9ea7b4;*/
  /*  !*position: absolute;*!*/
  /*}*/
  .layout-menu-left {
    background: #464c5b;
    height: 100%;
  }
  .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }
  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .layout-ceiling-main a {
    color: #9ba7b5;
  }
  .layout-hide-text .layout-text {
    display: none;
  }
  .ivu-col {
    transition: width 0.2s ease-in-out;
  }
</style>