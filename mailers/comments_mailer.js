const nodeMailer = require('../config/nodemailer');


// this is another way of exporting  method 


exports.newComment = (comment) => {

    console.log('inside newComment mailer');

    nodeMailer.transporter.sendMail({

        from:'Ladakhchat@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html:'<h1> Yup , your comment is now published !</h1>'
    }, (err, info)=> {

        if(err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message Sent ',info);
        return;
    })
}