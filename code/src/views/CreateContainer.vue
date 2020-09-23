<template>
    <div class="create-container">
        <div class="layout-breadcrumb">
            <Breadcrumb style="float: left">
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/">服务页</BreadcrumbItem>
                <BreadcrumbItem>创建容器</BreadcrumbItem>
            </Breadcrumb>
            <h2 style="font-weight: bold; float: left">创建容器</h2>
        </div>
        <div class="layout-content">
            <Card>
                <Steps :current="current">
                    <Step title="请选择镜像"></Step>
                    <Step title="配置端口及配额"></Step>
                    <Step title="配置环境变量"></Step>
                    <Step title="完成"></Step>
                </Steps>
                <div class="step1" v-if="current==0">
                    <i-select :model.sync="model1" style="width:300px; margin-top: 10px">
                        <i-option v-for="item in containerList" :key="item.label" :value="item.name">{{ item.label }}</i-option>
                    </i-select>
                    <br>
                    <i-input :value.sync="values" placeholder="请输入镜像名称..." style="width: 300px; margin: 10px"></i-input>
                </div>
                <div class="step2" v-if="current==1">
                    <div class="setting">
                        <span>配置类型：</span>
                        <ButtonGroup>
                            <Button>计算优化型</Button>
                            <Button>内存优化型</Button>
                            <Button>存储优化型</Button>
                        </ButtonGroup>
                    </div>
                    <div class="setting">
                        <span>配置性能：</span>
                        <ButtonGroup>
                            <Button>低</Button>
                            <Button>中</Button>
                            <Button>高</Button>
                        </ButtonGroup>
                    </div>
                    <div class="CPU-ability">
                        <span>CPU配额(mCores)：</span>
                        <Slider style="width: 300px;" :value="this.coreValue" :tip-format="format1"></Slider>
                    </div>
                    <div class="CPU-ability">
                        <span>内存配额(MiB)：</span>
                        <Slider style="width: 300px" :value="this.localStorageValue" :tip-format="format2"></Slider>
                    </div>
                    <div class="CPU-ability">
                        <span>存储配额(MiB)：</span>
                        <Slider style="width: 300px" :value="this.storageValue" :tip-format="format3"></Slider>
                    </div>
                    <Divider></Divider>
                    <div class="port">
                        <span>开放端口：<i-input :value.sync="values" placeholder="80" style="width: 300px; margin: 10px"></i-input></span>
                        <br>
                        <span><i-input :value.sync="values" placeholder="443" style="width: 300px; margin: 10px"></i-input></span>
                        <br>
                        <span><i-input :value.sync="values" placeholder="端口" style="width: 300px; margin: 10px"></i-input></span>
                        <br>
                        <i-button style="width: 300px; margin: 20px">Add</i-button>
                    </div>
                </div>
                <div class="step3" v-if="current==2">
                    <i-input :value.sync="values" placeholder="环境变量" style="width: 300px; margin: 10px"></i-input>
                    <br>
                    <i-input type="textarea" placeholder="值" style="width: 300px"></i-input>
                    <br>
                    <i-button type="error" style="width: 300px;margin: 10px">删除</i-button>
                    <Divider></Divider>
                    <i-button style="width: 300px; margin: 20px">Add</i-button>
                </div>
                <div class="step4" v-if="current==3">
                    <span><h1>操作成功</h1><br></span>
                    <i-button type="primary" style="margin: 10px" @click="continueAdd">继续创建</i-button>
                    <i-button to="service-list">查看服务列表</i-button>
                </div>
                <i-button type="primary" @click="previous" v-if="current!=0" style="margin-right: 10px">上一步</i-button>
                <i-button type="primary" @click="next" v-if="current!=3">下一步</i-button>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.fresh();
        },
        data() {
            return{
                current:0,
                containerList: [
                    {
                        name: 'beijing',
                        label: '北京市'
                    },
                ],
                model1: '',
                values: '',
                coreValue: 0,
                localStorageValue: 0,
                storageValue: 0,
            };
        },

        methods: {
            next () {
                if (this.current == 3) {
                    this.current = 0;
                } else {
                    this.current += 1;
                }
            },
            previous () {
                if (this.current != 0) {
                    this.current -= 1;
                } else {
                    console.log('previous false')
                }
            },
            continueAdd () {
                this.current=0;
                this.fresh();
            },
            fresh () {

            },
            format1 (val) {
                return 100*val;
            },
            format2 (val) {
                return 100*val;
            },
            format3 (val) {
                return 100*val;
            },
        }
    }
</script>

<style scoped>
    .setting{
        margin: 10px;
    }
    .CPU-ability{
        display: flex;
        justify-content: center;
    }
</style>