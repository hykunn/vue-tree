<template>
    <el-container>
        <div class="Header">
        </div>
        <el-container>
            <div class="aside1">
            </div>
            <div class="aside2">
                <Aside style="padding: 10px"/>
            </div>
            <div class="main1">
                <div class="main2">
                </div>
            </div>
        </el-container>
    </el-container>
</template>

<script>
    // import Aside from '../components/aside.vue'
    import Aside from "@/components/aside";
    export default {
        name: "Main",
        components: {Aside},
        // data () {
        //     return {
        //         htmlHeight: {
        //             height: '300'
        //         }
        //     }
        // },
        // methods: {
        //     getHtmlHeight () {
        //         let htmlHeight = window.innerHeight - 64 + 'px'
        //         this.$set(this.htmlHeight, 'height', htmlHeight)
        //     }
        // },
        // mounted () {
        //     this.getHtmlHeight()
        // }
    }
</script>

<style scoped>

    .Header{
        width:100%;
        height:64px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 12px 0px rgba(0,21,41,0.12);
        position: fixed;
        z-index: 99;
    }
    .aside1{
        margin-top: 64px;
        /*width:100px;*/
        /*background:linear-gradient(283deg,rgba(88,132,251,1) 0%,rgba(126,201,188,1) 80%,rgba(240,255,0,1) 100%);*/
        /*position: fixed;*/
        /*height: calc(100vh - 64px);*/
    }
    .aside2{
        margin-top: 64px;
        margin-left: 100px;
        width:250px;
        height: calc(100vh - 64px);
        position: fixed;
        background:rgba(255,255,255,1);
    }
    .main1{
        width: 100%;
        background:rgba(240,242,245,1);
        margin-top: 64px;
        margin-left: 350px;
    }
    .main2{
        display: block;
        /*height: 80%;*/
        margin: 24px 24px 30px 24px;
        background-color: #fff;
    }
    .homelogo{
        width: 36px;
        height: 40px;
        margin: 12px 12px 12px 32px ;
    }
    .hometitle{
        position: absolute;
        margin: 23px 0 17px 0;
        height:24px;
        font-size:18px;
        font-family:AliHYAiHei;
        color:rgba(74,74,74,1);
        letter-spacing:2px;
        line-height:24px;
    }
    .headRight{
        display: flex;
        position: absolute;
        right: 38px;
        top:0;
    }
    .bell {
        margin: 24px 26px;
    }
    .avatar{
        margin: 20px 8px 20px 0;
    }
    .user{
        margin: 21px 0;
        line-height: 28px;
    }
</style>
