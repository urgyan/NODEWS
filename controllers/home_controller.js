

// code to render home.ejs

// module.exports.home = function(req,res){
    // return res.render('home',{
        // title:"Home"
    // });
// }

// module.exports.action = function(req,res){ }

const Post = require('../models/post');
const User = require('../models/user')
module.exports.home = function(req,res){

    // to show user by populate the user of each post

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path:'user'
        }

    })
    .exec(function(err,posts){

        User.find({}, function(err,users){
            return res.render('home',{
                title:"Codeial | home",
                posts: posts,
                all_users : users
            });

        });
        
    });
}