/**
* 配置开发环境和线上环境之间的切换
*
*
*/

let baseUrl = ''; //端口

let url = '47.74.245.151:8080'; //本地地址   


if (process.env.NODE_ENV == 'development') { //本地   

    baseUrl = 'http://'+url;

    } else if(process.env.NODE_ENV == 'production') { //线上

    baseUrl = 'http://'+url;
    
}

export {
baseUrl
}