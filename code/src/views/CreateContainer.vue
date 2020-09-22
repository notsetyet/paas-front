<template>
    <div class="create-container">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/">服务页</BreadcrumbItem>
                <BreadcrumbItem>创建容器</BreadcrumbItem>
            </Breadcrumb>
            <h2 style="font-weight: bold">创建容器</h2>
        </div>
        <div class="layout-content">
            <Card>
                <Steps :current="current">
                    <Step title="请选择镜像">
                        <i-select :model.sync="model1" style="width:300px">
                            <i-option v-for="item in containerList" :key="item.label" :value="item.name">{{ item.label }}</i-option>
                        </i-select>
                        <i-input :value.sync="values" placeholder="请输入镜像名称..." style="width: 300px"></i-input>
                    </Step>
                    <Step title="配置端口及配额"></Step>
                    <Step title="配置环境变量"></Step>
                    <Step title="完成"></Step>
                </Steps>
                <i-button type="primary" @click="next">下一步</i-button>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
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
                values: ''
            };
        },

        methods: {
            next () {
                if (this.current == 3) {
                    this.current = 0;
                } else {
                    this.current += 1;
                }
            }
        }
    }
</script>

<style scoped>

</style>