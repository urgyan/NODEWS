
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
    session_cookie_key: process.env.codeial_session_cookie_key,
    db: 'codeial_development',
    smtp: {
        service: 'gmail',

        host: 'smtp.gmail.com',
        port:587,
        secure:false,
    
        auth: {
            user : process.env.codeial_gmail_username,
            pass : process.env.codeial_gmail_password 
        }
    },
    google_client_id: process.env.codeial_google_client_id, // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
    google_client_secret: process.env.codeial_google_client_secret, // e.g. _ASDFA%KFJWIASDFASD#FAD-
    google_call_back_url: "http://localhost:8001/users/auth/google/callback",
    
    jwt_secret: process.env.codeial_jwt_secret,
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
// module.exports = production;