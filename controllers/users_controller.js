
const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile = function(req,res){

     User.findById(req.params.id, function(err,user){
          return res.render('user_profile',{
               title:"User Profile",
               profile_user: user
           });

          
     });
     
 }

module.exports.update = async function(req,res){

     // if(req.user.id == req.params.id){
     //      User.findByIdAndUpdate(req.params.id,req.body, function(err,user){
     //         return res.redirect('back');
     //      });
     // }else{
     //      return res.status(401).send('Unauthorised');
     // }

     if(req.user.id == req.params.id){

          try {

               let user = await User.findById(req.params.id);
               User.uploadedAvatar(req,res,function(err){
                    if(err){console.log('****Multer erros:',err)}

                    user.name = req.body.name;
                    user.email = req.body.email;

                    if(req.file){

                         if(user.avatar){

                              if(fs.existsSync(path.join(__dirname, '..',user.avatar )  ) ){

                                   fs.unlinkSync(path.join(__dirname, '..',user.avatar ))


                              }

                         }

                         // this is saving the path of uploaded file in the avatar filed in user
                         user.avatar = User.avatarPath + '/' + req.file.filename;
                    }

                    user.save();
                    return res.redirect('back');

               });

               
          } catch (err) {
               
               req.flash('error',err);
               return res.redirect('back');
          }
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
     req.flash('success', 'Logged in Successfully');
     return res.redirect('/');
}


// for sign out

module.exports.destroySession = function(req,res){
     req.logout();
     console.log('logout');
     req.flash('success', 'You have logged out !');

     return res.redirect('/');
}