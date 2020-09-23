<template>
    <div class="servicelist">
        <div class="layout-breadcrumb">
            <Breadcrumb style="float: left">
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/">服务页</BreadcrumbItem>
                <BreadcrumbItem>服务列表</BreadcrumbItem>
            </Breadcrumb>
            <h2 style="font-weight: bold">服务列表</h2>
        </div>
        <div class="layout-content">
            <Card style="height: 200px">
                <i-col span="1" offset="1">
                    <h4>CPU</h4><br>
                    <h4>CPU</h4><br>
                    <h4>CPU</h4>
                </i-col>
                <i-col span="6" offset="4">
                    <Circle :percent="80" stroke-color="#5cb85c">
                        <span class="demo-circle-inner">80%</span>
                        <!--  style="font-size:24px" -->
                    </Circle>
                </i-col>
            </Card>

            <Card style="margin-top: 30px; ">
                <i-button type="primary" icon="plus" style="float: left"><span>新建容器</span></i-button><br><br>
                <h3 style="float: left;">已选择0项</h3><br><br>
                <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;float: left">
                    <Checkbox
                            :indeterminate="indeterminate"
                            :checked="checkAll"
                            @click.prevent="handleCheckAll">全选</Checkbox>
                </div>
                <Checkbox-group :model.sync="checkAllGroup" @on-change="checkAllGroupChange" style="margin-top: 20px;float: left">
                    <Checkbox value="香蕉"></Checkbox>
                    <Checkbox value="苹果"></Checkbox>
                    <Checkbox value="西瓜"></Checkbox>
                </Checkbox-group>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                indeterminate: true,
                checkAll: false,
                checkAllGroup: ['香蕉', '西瓜']
            }
        },
        methods: {
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = ['香蕉', '苹果', '西瓜'];
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === 3) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            }
        }
    }
</script>

<style scoped>

</style>