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
                <i-button type="primary">下一步</i-button>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CreateContainer"
    }
</script>

<style scoped>

</style>