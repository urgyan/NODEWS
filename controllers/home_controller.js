// code to render home.ejs

// module.exports.home = function(req,res){
    // return res.render('home',{
        // title:"Home"
    // });
// }

// module.exports.action = function(req,res){ }

const Post = require('../models/post');

module.exports.home = function(req,res){

    // to show user by populate the user of each post

    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title:"Codeial | home",
            posts: posts
        });
    });
}