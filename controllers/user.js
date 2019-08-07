

// mysql数据库连接
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'test'
});

//对密码进行md5加密存储（在服务器端进行md5加密意味着在通信中采用明文传输，容易被抓包，后续改进改为在前端进行md5加密）
var crypto = require('crypto');

function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}




















//登录注册的状态交给前端判断
//const user = require('../modles/user');
//本部分采用原生sql语句，存在sql注入，上线建议采用waf
exports.login_get=(req,res) => {   res.render('login');};

exports.login_post=(req,res) => { 
    
    var name=req.body.username;
    var pwd =cryptPwd(req.body.password);
    var selectSQL = "select username,password from users where username = '"+name+"' and password = '"+pwd+"'";
    connection.query(selectSQL,function (err, result) {
        if(err){
         console.log('[login ERROR] - ',err.message);
         return;
        }
        if (result=='') {
            req.flash('flash_error_message',"帐号密码错误");
            res.redirect('/users/login');
            //如果登录失败就给客户端返回0
        }
        else
        {
            req.session.user = name;
            // 跳转到主页
            
           req.flash("登录成功");//如果登录成功给客户端返回1
            return res.redirect('/');
        }
    } );
}

    
var flash = require('connect-flash');

//此为注册部分，注册状态交给前端ejs判断。
exports.sign_get=(req,res) => { res.render('sign');};

exports.sign_post=(req,res) => {
    var name=req.body.name;
    var pwd=cryptPwd(req.body.password);
    var sqlname="select * from users where username = '"+name+"'";
    connection.query(sqlname,function(err,result)
    {
        if(err) {console.log('[login ERROR]-',err.message); return;}
        if(result==''){ 
            var sqlsign="insert into users values ('"+name+"','"+pwd+"')";
            connection.query(sqlsign,function(err,result)
            {
                if(err){
                    console.log('error',err.message);
                    req.flash('flash_error_message','注册失败');
                    return res.redirect('/users/sign');
                }
                else{
                    req.flash('注册成功');
                    return res.redirect('/users/login');
                }

            
            });
        }
        else{
        req.flash('flash_error_message','此用户名已被占用，请更换');
        return res.redirect('/users/sign');
        }
    });

    
    

};

