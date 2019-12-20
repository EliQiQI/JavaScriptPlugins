//引用一个系统模块http
const http = require('http');
//引用文件系统fs
const fs = require('fs');
//引入查询字符串queryString
const querystring=require('querystring');
//直接处理解析url
const urlLib=require('url');
//fs.readFile(文件名,回调函数);
// fs.readFile('./client/index.html',function(err,data){
//     if(err){
//         console.log('读取失败');
//     }else{
//         console.log(data.toString());
//     }

// });
//fs.writeFile();
// fs.writeFile('bbb.txt','sasas',function(err){

// });


let server = http.createServer(function (req, res) {
    
    //这样预存的是post数据    
    var str='';
     //先判断是不是get出来的数据
    if (req.url.indexOf('?')>-1){
        console.log(req.url);
        //这样得到的query直接就是下面的GET
            console.log(urlLib.parse(req.url,true).query);
        // console.log(urlLib.parse(req.url).pathname);

        //用querystring还是必须通过问号做切割的
        //因为querystring处理的是user=123&pwd=123格式的
            // let arr=req.url.split('?');
            // let GET=querystring.parse(arr[1]);
            // console.log(GET);
        //
        res.write('ok');
        res.end();
    }else if(req.method==='POST'){
        //这样得到的是POST方式的
        req.on('data',function(data){
            str+=data;
        });
        req.on('end',function(){
            let POST=querystring.parse(str);
            //判断事件类型
            console.log(POST.type);
            //这里判断POST数据的类型,以做不同处理
            switch(POST.type){
                case 'register':
                    //TODO:执行注册函数
                    console.log('执行注册函数的地方');
                    console.log(POST);
                    break;
                case 'login':
                    //TODO:执行登录函数
                    console.log('执行登录函数的地方');
                    console.log(POST);
                    break;
            }
        })
        res.end();
    }
    else {
        //这样传入的是文件格式
        var file_name = './client' + req.url;
        if (req.url === '/') {
            console.log('首页被打开了');
            file_name = './client/index.html';
        }
        fs.readFile(file_name, function (err, data) {
            if (err) {
                res.write('404')
            } else {
                res.write(data);
            }
            res.end();
        });
    }


    // switch(req.url){
    //     default:
    //         res.write('404');
    // }


});

//监听---等着
server.listen(4250);
console.log('服务开启,将占用本地4250端口');
//80 web
//110 邮件
//3306 数据库
//后台 是被浏览器请求的 
//req 是浏览器请求
//res 响应



//get和post方式  
/*
商品编号---通过get方式请求
账户(注册,登录)---通过post方式请求
*/