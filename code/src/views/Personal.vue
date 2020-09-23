<template>
    <div class="personal">
        <div class="layout-content">
            <Card>
                <Tabs active-key="key1">
                    <Tab-pane label="个人信息" key="key1">
                        <span><h3>姓名：{{this.accountInfo.username}}</h3></span><br><br>
                        <span><h3>邮箱：{{this.accountInfo.email}}</h3></span>
                    </Tab-pane>
                    <Tab-pane label="修改信息" key="key2">
                        <i-input placeholder="请输入你的姓名" style="margin: 10px; width: 300px" v-model="this.newInfo.username"></i-input>
                        <br>
                        <i-input placeholder="请输入你的邮箱" style="margin: 10px; width: 300px" v-model="this.newInfo.email"></i-input>
                        <br>
                        <i-button type="primary" @click="changeInfo">确认</i-button>
                    </Tab-pane>
                    <Tab-pane label="修改密码" key="key3">
                        <i-input placeholder="请输入你的旧密码" label="旧密码：" style="margin: 10px; width: 300px"></i-input>
                        <br>
                        <i-input placeholder="请输入你的新密码" label="新密码：" style="margin: 10px; width: 300px"></i-input>
                        <br>
                        <i-input placeholder="请确保两次密码一致" label="确认密码：" style="margin: 10px; width: 300px"></i-input>
                        <br>
                        <i-button type="primary" @click="changePassword">确认</i-button>
                    </Tab-pane>
                </Tabs>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Personal",
        data () {
            return{
                accountInfo : {
                    username : "",
                    email : "",
                    password : "",
                },
                newInfo : {
                    username: "",
                    email: "",
                },
                oldpassword : "",
                password : "",
                password2 : "",
                ismold : false,
            };
        },
        methods: {
            changePassword() {
                if(this.oldpassword.length===0
                    ||this.password.length===0
                    ||this.password2.length===0) {
                    console.log("长度为0，密码不能为空");
                    this.$Message.error("密码不能为空");
                }
                else if(this.password2!=this.password){
                    console.log("两次输入密码不一致");
                    this.$Message.error("两次输入密码不一致");
                }
                else{
                    this.$Message.success("密码更新成功");
                }
            },
            changeInfo() {
                if(this.newInfo.username==null||this.newInfo.email==null){
                    this.$Message.error("用户名或邮箱不能为空");
                }
                else if(this.newInfo.username.length===0||this.newInfo.email.length===0){
                    this.$Message.error("用户名或邮箱不能为空");
                }
                // 判断邮箱合法性
                else {
                    this.$Message.success("修改成功");
                }
            }
        }
    }
</script>

<style scoped>

</style>