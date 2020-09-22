<template>
    <div class="layout-content">
        <div class="login">
            <Card class="loginCard">
                <Tabs v-model="loginInfo.tapValue">
                    <TabPane label="登录" name="login">
                        <Form :model="loginInfo" :label-width="80">
                            <img src="../../public/title.png" id="pic" />
                            <p class="tip1" v-show="loginInfo.showtip">{{ loginInfo.tip }}</p>
                            <FormItem class="namebox" label="用户名"><Input type="text" class="name" v-model="loginInfo.userName" /></FormItem>
                            <FormItem label="密码"><Input type="password" class="password" v-model="loginInfo.passWord" /></FormItem>
                            <FormItem><Button class="button" v-on:click="login" type="primary">登录</Button></FormItem>
                        </Form>
                    </TabPane>
                    <TabPane label="注册" name="register">
                        <Form :model="registerInfo" :label-width="80">
                            <FormItem label="用户名">
                                <Input class="name" v-model="registerInfo.userName" placeholder="用户名不能包含数字和字母以外的字符，长度为6-16" />
                            </FormItem>

                            <FormItem label="邮箱"><Input class="password" type="email" v-model="registerInfo.email" /></FormItem>
                            <FormItem label="密码"><Input class="password" type="password" v-model="registerInfo.passWord" /></FormItem>
                            <FormItem label="确认密码"><Input class="password" type="password" v-model="registerInfo.repeat" /></FormItem>
                            <FormItem><Button class="button" v-on:click="sign" type="primary">注册</Button></FormItem>
                        </Form>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';
    export default {
        name: 'Login',
        inject: ['fresh'],

        data() {
            return {
                loginInfo: {
                    tapValue: 'login',
                    userName: '',
                    passWord: ''
                },
                registerInfo: {
                    userName: '',
                    passWord: '',
                    email: '',
                    repeat: ''
                }
            };
        },
        /* beforeCreate() {
            document.querySelector('body').setAttribute('style', 'background-color:#d1cfff');
        },
        beforeDestroy() {
            document.querySelector('body').setAttribute('style', 'background-color:#***');
        },*/
        mounted() {
            console.log('mounted');
            //localStorage.clear();
            if (localStorage.getItem('username') != null) {
                this.$Message.success('用户' + localStorage.getItem('username') + '已验证 自动跳转首页');
                this.goPage();
            }
        },
        methods: {
            goPage: function() {
                    clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                //设置延迟执行
                console.log('ok');
                location.reload();
                this.$router.push({
                    path: '/',
                    query: {}
                });
            }, 1600);

            },
            login: function() {
                if (this.loginInfo.userName == '' || this.loginInfo.passWord == '') {
                    this.$Message.error('请输入用户名和密码');
                } else {
                    axios
                        .get('http://121.36.48.160:8080/api/login', {
                            params: { userName: this.loginInfo.userName, passWord: this.loginInfo.passWord }
                        })
                        .then(res => {
                            if (res.data.code != 200) {
                                this.$Message.error(res.data.message);
                            } else {
                                this.$Message.success('登录成功');
                                localStorage.setItem('uid', res.data.data.accountId);
                                localStorage.setItem('username', this.loginInfo.userName);
                                localStorage.setItem('utype', res.data.data.accountType);
                                this.goPage();
                            }
                        })
                        .catch(function(error) {
                            alert('网络错误 请重试:' + error);
                            this.$Message.error('网络错误 请重试');
                        });
                }
            },
            //注册
            sign: function() {
                if (this.registerInfo.userName == '' || this.registerInfo.passWord == '') {
                    this.$Message.error('用户名和密码不能为空');
                    return;
                }
                if (this.registerInfo.userName.length > 16) {
                    this.$Message.error('用户名太长 请不要超过16个字符');
                    return;
                }
                if (this.registerInfo.userName.length < 6) {
                    this.$Message.error('用户名太短 请不要少于6个字符');
                    return;
                }
                var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
                if(!reg.test(this.registerInfo.email)) {
                    this.$Message.error('请输入合法的邮箱');
                    return;
                }
                var zg = /^[a-zA-Z0-9]{6,16}$/;
                if (!zg.test(this.registerInfo.userName)) {
                    this.$Message.error('用户名包含数字字母以外的非法字符');
                    return;
                } else {
                    if (this.registerInfo.passWord != this.registerInfo.repeat) {
                        this.$Message.error('两次密码输入不一致');
                        return;
                    }
                    axios
                        .post('http://121.36.48.160:8080/api/accounts', {
                            userName: this.registerInfo.userName,
                            email: this.registerInfo.email,
                            passWord: this.registerInfo.passWord
                        })
                        .then(res => {
                            console.log(res.data);
                            if (res.data.code != 200) {
                                this.$Message.error('该用户名已注册！');
                            } else {
                                this.$Message.success('注册成功 转入登录界面');
                                clearTimeout(this.timer);
                                this.timer = setTimeout(() => {
                                    this.registerInfo.passWord = '';
                                    this.registerInfo.userName = '';
                                    this.registerInfo.repeat = '';
                                    this.registerInfo.email = '';
                                    this.loginInfo.tapValue = 'login';
                                }, 1500);
                            }
                        })
                        .catch(function(error) {
                            alert('网络错误 请重试:' + error);
                            this.$Message.error('网络错误 请重试');
                        });
                }
            }
        }
    };
</script>

<style scoped>
    #pic {
        margin-top: 2.5rem;
    }
    .fillWidth {
        position: fixed;
        right: 0;
        bottom: 0;
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        z-index: -100;
        -webkit-filter: grayscale(20%);
    }
    .loginCard {
        width: 40%;
        margin-left: 20%;
        margin-top: 0;
        /*margin-bottom: 11rem;*/
        length: 30%;
    }
    .namebox {
        margin-top: 3rem;
    }
    .name {
        width: 70%;
        margin-left: -15%;
    }
    .password {
        width: 70%;
        margin-left: -15%;
    }
    .tip1 {
        font-weight: bold;
        color: #2365ff;
        margin-top: 1rem;
    }
    .tip {
        font-weight: bold;
        color: #2365ff;
    }
    .hint {
        height: 0.1rem;
        font-weight: bold;
        font-style: italic;
        font-size: 0.0025rem;
        color: #2365ff;
    }
    #tip2 {
        margin-top: 0.875rem;
        margin-left: -4.375rem;
    }
    #teacher {
        margin-left: -4.625rem;
    }
    .button {
        margin-left: -15%;
        width: 70%;
    }
</style>
