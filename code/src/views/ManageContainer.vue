<template>
    <div class="manage-container">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem to="/">管理页</BreadcrumbItem>
                <BreadcrumbItem>管理容器</BreadcrumbItem>
            </Breadcrumb>
            <h2 style="font-weight: bold">管理容器</h2>
        </div>
        <div class="layout-content">
            <Card>

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
        name: "ManageContainer",
        data () {
            return {
                conList: [
                    {
                        name: 'This i',
                        mirror: 'This is ',
                        owner: '9avatar',
                        port: 'This is the this is.'
                    },
                ],
                columns: [
                    {
                        title: 'Name',
                        key: 'name',
                        width: 160,
                    },
                    {
                        title: 'Owner',
                        key: 'owner',
                        width: 160,
                    },
                    {
                        title: 'Mirror',
                        width: 160,
                        key: 'mirror'
                    },
                    {
                        title: 'Port',
                        width: 160,
                        key: 'port'
                    },
                    {
                        title: 'Statu',
                        width: 160,
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
                        owner: 'zyj',
                        mirror: 18,
                        port: 'New York No. 1 Lake Park',
                        statu: 'on'
                    },
                    {
                        name: 'Jim Green',
                        owner: 'zyj',
                        mirror: 24,
                        port: 'London No. 1 Lake Park',
                        statu: 'on'
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>