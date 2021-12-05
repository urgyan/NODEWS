const nodemailer = require('nodemailer');

const ejs = require('ejs');
const path = require('path');
const { relative } = require('path');

// this part defines how to communication take part 
// this part send the mail
let transporter = nodemailer.createTransport({

    service: 'gmail',

    host: 'smtp.gmail.com',
    port:587,
    secure:false,

    auth: {
        user : 'Ladakhchat',
        pass : 'urg#50475Y'  
    }

});

//  it defines the in mailers of views
let renderTemplate = (data, relativePath) => {  // relative path from where mail being send

    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err,template){

            if(err){ console.log('error in rendering the template'); return;}

            mailHTML = template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}