
const User = require('../models/user');


module.exports.profile = function(req,res){

     User.findById(req.params.id, function(err,user){
          return res.render('user_profile',{
               title:"User Profile",
               profile_user: user
           });

          
     });
     
 }

module.exports.update = function(req,res){

     if(req.user.id == req.params.id){
          User.findByIdAndUpdate(req.params.id,req.body, function(err,user){
             return res.redirect('back');
          });
     }else{
          return res.status(401).send('Unauthorised');
     }
}

module.exports.signUp = function(req,res){

     if(req.isAuthenticated()){
          return res.redirect('/users/profile');
     }

     return res.render('user_sign_up',{
          title:"codeial | sign up "
          
     });
}

module.exports.signIn =  function (req,res){

     
     if(req.isAuthenticated()){
          return res.redirect('/users/profile');
     }

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


// sign in and create a session for the user
module.exports.createSession = function(req,res){
     console.log('4');
     return res.redirect('/');
}


// for sign out

module.exports.destroySession = function(req,res){
     req.logout();

     return res.redirect('/');
}