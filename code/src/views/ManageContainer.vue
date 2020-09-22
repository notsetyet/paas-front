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

            <CellGroup style="text-align: left;">
            <Cell v-for="(con, index) in conList" :key="index" :title="con.name 
            +' | '
            + con.mirror
            +' | '
            + con.owner
            +' | '
            + con.port">
                <Button type="primary" slot="extra" style="margin-left: 10px;" >进入容器</Button>
                <Button type="error" slot="extra" style="margin-left: 10px;">删除</Button>
            </Cell>
            </CellGroup>

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
                ]
            }
        }
    }
</script>

<style scoped>

</style>