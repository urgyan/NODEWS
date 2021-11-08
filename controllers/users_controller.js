
const User = require('../models/user');


module.exports.profile = function(req,res){

     res.end('<h1> i am user </h1>');
}


module.exports.signUp = function(req,res){

     return res.render('user_sign_up',{
          title:"codeial | sign up "
          
     });
}

module.exports.signIn =  function (req,res){

     return res.render('user_sign_in',{
          title: "codieal | sign in"
     });
}

// get  the Sign Up Data
module.exports.create = function(req,res){
     if(req.body.password != req.body.confirm_password){
          return res.redirect('back');
     }

     User.findOne({email: req.body.email},function(err,user){
          if(err){console.log('error in finding  user in sign up');return}
          if(!user){
               User.create(req.body, function(err,user){
                    if(err){console.log('error in creating user while  sign up');return}
                    return res.redirect('/users/sign-in');
               });
          }else{
               return res.redirect('back');
          }
     });
}

module.exports.createSession = function(req,res){
     
}