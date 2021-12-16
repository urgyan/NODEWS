const nodemailer = require('nodemailer');

const ejs = require('ejs');
const path = require('path');
const { relative } = require('path');
const env = require('./environment');
// this part defines how to communication take part 
// this part send the mail

let transporter = nodemailer.createTransport(env.smtp);

//  it defines the in mailers of views
let renderTemplate = (data, relativePath) => {  // relative path from where mail being send

    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err,template){

            if(err){ console.log('error in rendering the template',err); return;}

            mailHTML = template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}