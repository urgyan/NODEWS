
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream =  rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});


const development = {
    name: 'development',
    asset_path:  './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',

        host: 'smtp.gmail.com',
        port:587,
        secure:false,
    
        auth: {
            user : 'Ladakhchat',
            pass : 'urg#50475Y'  
        }
    },
    google_client_id: "680221469334-o8v5hu43b8fk7oe8ni1viu5m147qkkk4.apps.googleusercontent.com", // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
    google_client_secret: "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", // e.g. _ASDFA%KFJWIASDFASD#FAD-
    google_call_back_url: "http://localhost:8001/users/auth/google/callback",
    jwt_secret: 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }

}


const production =  {
    name: 'production',
    asset_path: process.env.codeial_asset_path,
    session_cookie_key: process.env.codeial_session_cookie_key,
    db: process.env.codeial_db,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.codeial_gmail_username,
            pass: process.env.codeial_gmail_password
        }
    },
    google_client_id: process.env.codeial_google_client_id,
    google_client_secret: process.env.codeial_google_client_secret,
    google_call_back_url: process.env.codeial_google_callback_url,
    jwt_secret: process.env.codeial_jwt_secret,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
  
}



module.exports = eval(process.env.codeial_environment) == undefined ? development : eval(process.env.codeial_environment);