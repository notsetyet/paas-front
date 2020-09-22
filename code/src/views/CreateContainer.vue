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
                    <Step title="选择镜像"></Step>
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