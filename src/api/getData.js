// 获取数据

import http from './fetch';


export const register = (params) => http.post('/user/register', params);       // 注册接口

// export const getUserLoginState = (params) => http.get('/user/currentUser', params);      // 获取用户登录状态接口

// export const receiveTask = (params) => http.postParam('/user/task/take', params);       // 用户领取任务接口
