<template>
    <div class="personal">
        <div class="layout-content">
            <Card>
                <Tabs active-key="key1">
                    <Tab-pane label="个人信息" key="key1">
                        <span><h3>姓名：{{this.username}}</h3></span><br><br>
                        <span><h3>邮箱：{{this.email}}</h3></span>
                    </Tab-pane>
                    <Tab-pane label="修改信息" key="key2">
                        <i-input placeholder="请输入你的姓名" style="margin: 10px; width: 300px"></i-input>
                        <br>
                        <i-input placeholder="请输入你的邮箱" style="margin: 10px; width: 300px"></i-input>
                        <br>
                        <i-button type="primary">确认</i-button>
                    </Tab-pane>
                    <Tab-pane label="修改密码" key="key3">
                        <i-input placeholder="请输入你的旧密码" label="旧密码：" style="margin: 10px; width: 300px"></i-input>
                        <br>
                        <i-input placeholder="请输入你的新密码" label="新密码：" style="margin: 10px; width: 300px"></i-input>
                        <br>
                        <i-input placeholder="请确保两次密码一致" label="确认密码：" style="margin: 10px; width: 300px"></i-input>
                        <br>
                        <i-button type="primary">确认</i-button>
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
                username : "",
                email : ""
            };
        },
    }
</script>

<style scoped>

</style>