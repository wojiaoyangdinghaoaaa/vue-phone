<template>

    <div class="cantain">
        <div class="header">
          <i class="iconfont" @click="goHome">&#xe646;</i>
          <div class="headerText">页面错误</div>
      </div>
        <div class="content">
            <img :src="errorImg" class="indexImg"/>
        </div>
    </div>

</template>

<script>

import img from '../../static/json/image.json';

export default {
    data () {
        return {
            errorImg:img.error,
        }
    },
    methods: {
        goHome(){
            this.$router.push({path:'/'});
        }
    }
}
</script>


<style scoped>

.cantain{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}
.header{
    height: 46px;
    width: 100%;
    position: relative;
    background: #f5f5f5;
}
.header i{
    position: absolute;
    top: 9px;
    left: 15px;
    font-size: 26px;
    color: #707070;
}
.headerText{
    height: 100%;
    width: 100%;
    font-size: 17px;
    text-align: center;
    line-height: 46px;
}
.content{
    width: 100%;
    flex: 1;
    overflow: auto;
    /* padding: 14px 15px 0;
    box-sizing: border-box; */
}
.indexImg{
    width: 100%;
}

</style>

