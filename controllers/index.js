

exports.index=(req,res) => {

    
    res.render('index',{name:req.session.user});
   
}