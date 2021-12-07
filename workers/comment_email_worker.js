const queue = require('../config/kue');

const commentMailer = require('../mailers/comments_mailer');
// below email stands for name of queue it should be same create queue
queue.process('emails',function(job,done){          // job.data contains the data ie comment in this case:
    console.log('emails worker is processing a job',job.data);

    commentMailer.newComment(job.data);
    done();
});