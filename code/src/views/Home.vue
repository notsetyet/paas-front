<template>
    <div class="home">
<!--        <Card>-->
<!--            <img src="../../public/timg.jpg" id="pic" />-->
<!--        </Card>-->
        <Cell>
            <img src="../../public/timg.jpg" id="pic" />
            <h1>Welcome to PAAS of BUAA</h1>
            <p>某小组的云平台</p>
        </Cell>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>
.home {
    background-color: white;
    margin-top: 20px;
}
#pic {
        margin-top: 2.5rem;
    }
</style>