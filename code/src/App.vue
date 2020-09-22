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
    border-radius: 4px;
    overflow: hidden;
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

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.layout-menu-left {
    background: #464c5b;
}

.layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
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
    transition: width .2s ease-in-out;
}
</style>
<template>
<div id="app">
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu active-key="1" theme="dark" width="auto">
                    <div class="layout-logo-left"></div>
                    <Submenu key="1">
                        <template slot="title">
                            <Icon type="ios-navigate" :size="iconSize"></Icon>
                            服务页
                        </template>
                        <Menu-item key="1-1" to="service-list">服务列表</Menu-item>
                        <Menu-item key="1-1" to="create-container">创建容器</Menu-item>
                    </Submenu>
                    <Submenu key="2">
                        <template slot="title">
                            <Icon type="ios-navigate" :size="iconSize"></Icon>
                            管理页
                        </template>
                        <Menu-item key="2-1" to="manage-container">管理容器</Menu-item>
                    </Submenu>
                </Menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <i-button type="text" @click="toggleClick" style="float: left">
                        <Icon type="ios-people" size="32"></Icon>
                    </i-button>
                    <!--            无法显示-->
                    <Button to="/login" v-if="uid==null">登录/注册</Button>
                    <Button to="/login" v-if="uid!=null">{{this.username}}</Button>
                </div>
                <router-view />
                <div class="layout-copy">
                    2020-2020 &copy; PAAS
                </div>
            </i-col>
        </Row>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            spanLeft: 5,
            spanRight: 19,
            username: "",
            uid: ""
        }
    },
    computed: {
        iconSize() {
            return this.spanLeft === 5 ? 14 : 24;
        }
    },
    methods: {
        toggleClick() {
            if (this.spanLeft === 5) {
                this.spanLeft = 2;
                this.spanRight = 22;
            } else {
                this.spanLeft = 5;
                this.spanRight = 19;
            }
        }
    }
}
</script>
