const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user');

// module.exports.create = async function(req, res){

//     try {
//         let post = await Post.create({
//             content: req.body.content,
//             user: req.user._id
        
//         });
        
//         if(req.xhr){
//             return res.status(200).json({
//                 data: {
//                     post: post
//                 },
//                 message:"Post Created!"
//             });
//         }

//         req.flash('success','Post published !');
//         return res.redirect('back');
//     } catch (err) {

     
//         req.flash('error',err);
//         return res.redirect('back');
//     }
   
// }

module.exports.create = async function(req,res)
{
    console.log(req.body);
   let post = await Post.create({
        content: req.body.content,
        user: req.user._id                                                           // if error is something that canot read the property and you write the right code means syantatically correct then put it into the ''colon
    })
    
      let posting =  await Post.findById(post.id)
                    
            .populate('user');

           
             
          if(req.xhr){ 
            return res.status(200).json({
             data: {
                 posting:posting
             },
             message: "post created!"
            })
        }
      
    
        // end of the ajax request
        if(err)
        {
            console.log('error at the posting the post',err);
            return;
        }
        
        res.redirect('back');
  
      
}


module.exports.destroy = async function(req,res){

    try {

        let post = await Post.findById(req.params.id);

        // .id means converting object id into string 

        if(post.user == req.user.id){

            post.remove();

           await Comment.deleteMany({post: req.params.id});
           
           if(req.xhr){
               return res.status(200).json({
                   data: {
                       post_id:req.params.id
                   },
                   message:"Post deleted "
               })
           }
           req.flash('success','Post and associated comments deleted');

           return res.redirect('back');       
        
        }else{


            req.flash('error','You cannot delete this post ');

            return res.redirect('back');
        }


        
    } catch (err) {

        req.flash('error',err);
        return;
    }
   
}
