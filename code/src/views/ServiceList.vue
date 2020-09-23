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
                    <h5>CPU</h5><br>
                    <h5>已使用</h5>
                    <p>1000</p><br>
                    <h5>总配额</h5>
                    <p>10000</p>
                </i-col>
                <i-col span="2" offset="4">
                    <i-circle :percent="80" stroke-color="#5cb85c">
                        <span class="demo-circle-inner">80%</span>
                        <!--  style="font-size:24px" -->
                    </i-circle>
                </i-col>
                <i-col span="1" offset="1">
                    <h5>内存(MB)</h5><br>
                    <h5>已使用</h5>
                    <p>1000</p><br>
                    <h5>总配额</h5>
                    <p>10000</p>
                </i-col>
                <i-col span="2" offset="4">
                    <i-circle :percent="80" stroke-color="#5cb85c">
                        <span class="demo-circle-inner">80%</span>
                        <!--  style="font-size:24px" -->
                    </i-circle>
                </i-col>
                <i-col span="1" offset="1">
                    <h5>存储(MB)</h5><br>
                    <h5>已使用</h5>
                    <p>1000</p><br>
                    <h5>总配额</h5>
                    <p>10000</p>
                </i-col>
                <i-col span="2" offset="4">
                    <i-circle :percent="80" stroke-color="#5cb85c">
                        <span class="demo-circle-inner">80%</span>
                        <!--  style="font-size:24px" -->
                    </i-circle>
                </i-col>
            </Card>

            <Card style="margin-top: 30px; ">
                <i-button type="primary" icon="plus" style="float: left" @click="tocreate()"><span>新建容器</span></i-button><br><br>
                <Table border :columns="columns" :data="data">
                <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">ON/OFF</Button>
                <Button type="error" size="small" @click="remove(index)">Delete</Button>
                </template>
                </Table>
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
                checkAllGroup: ['香蕉', '西瓜'],
                columns: [
                    {
                        title: 'Name',
                        key: 'name',
                        width: 200,
                    },
                    {
                        title: 'Mirror',
                        width: 200,
                        key: 'mirror'
                    },
                    {
                        title: 'Port',
                        width: 200,
                        key: 'port'
                    },
                    {
                        title: 'Statu',
                        width: 200,
                        key: 'statu'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 200,
                        align: 'center'
                    }
                ],
                data: [
                    {
                        name: 'John Brown',
                        mirror: 18,
                        port: 'New York No. 1 Lake Park',
                        statu: 'on'
                    },
                    {
                        name: 'Jim Green',
                        mirror: 24,
                        port: 'London No. 1 Lake Park',
                        statu: 'on'
                    }
                ]
            }
        },
        methods: {
            tocreate(){
                this.$router.push({ path: "/create-container" });
            },
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