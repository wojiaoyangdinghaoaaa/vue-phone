<template>
	<div class="home">
		<!-- <button type="primary" @click="getContacts">获取联系人1</button>
		<div  v-for="(item,index) in list" :key="index">
		    <div>{{item.displayName}}</div>
				<div v-for="(subitem,idx) in item.phoneNumbers" :key="idx">
				    <div>{{subitem.value}}</div>
				</div>
		</div> -->

		<div class="indexBig" @click="goLogin">
			<img :src="indexImg" class="indexImg"/>
			<div class="logBtn">
				<i class="iconfont">&#xe638;</i>
				<span>本机号码一键登录</span>
			</div>
		</div>
	</div>
</template>
 
<script>
import { Dialog } from 'vant';
import Vue from 'vue';
import img from '../../static/json/image.json';

Vue.use(Dialog);

	var Contacts
	export default {
		data() {
			return {
				indexImg:img.index,
				list: []
			}
		}, 
		methods: {
			getContacts() {
				// var that = this
				// 获取通讯录对象
				plus.contacts.getAddressBook( plus.contacts.ADDRESSBOOK_PHONE, ( addressbook )=>{
					uni.showToast({
					    title: '获取通讯录对象成功',
					    duration: 2000
					})
					console.log('获取通讯录对象成功')
					console.log(addressbook)
					// 查找联系人
					addressbook.find(["displayName","phoneNumbers"],(contacts)=>{
						uni.showToast({
						    title: '获取联系人成功',
						    duration: 2000
						})
						alert('获取联系人成功')
						console.log(JSON.stringify(contacts))
						this.list = contacts
					}, ()=>{
						uni.showToast({
						    title: '获取联系人失败',
						    duration: 2000
						})
					},{multiple:true});
				}, ( e )=>{
					uni.showToast({
					    title: '获取通讯录对象失败:' + e.message,
					    duration: 2000
					})
				});
			},
			goLogin(){
				this.$router.push({path:'/Login'});
			}
		}
	}
</script>

<style scoped>

.home{
	width: 100%;
    height: 100%;
}

.indexBig{
	width: 100%;
	height: 100%;
	position: relative;
}
.indexImg{
    width: 100%;
	height: 100%;
}
.logBtn{
	border: 1px solid #fff;
    border-radius: 20px;
    padding: 0px 70px;
    color: #fff;
    position: absolute;
    bottom: 5%;
    left: 50%;
    margin-left: -142PX;
	font-size: 13px;
	overflow: hidden;
}
.logBtn>i{
	font-size: 30px;
	color: #fff;
	margin-bottom: -2px;
	float: left;
}
.logBtn>span{
	letter-spacing: 1px;
	float: left;
	margin-top: 9px;
}
</style>