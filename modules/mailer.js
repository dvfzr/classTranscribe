var nodemailer = require('nodemailer')
var mailerPass = process.env.MAILER_PASS;
var mailID = process.env.MAILER_ID;

if (!mailerPass) throw "Need a password in environmental variables!";
if (!mailID) throw "Need a gmail address in environmental variables!";

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: mailID,
    pass: mailerPass
  }
});

function sendEmail(to, subject, body) {
  var mailOptions = {
    from: 'Class Transcribe Team <' + mailID + '>',
    to: to,
    subject: subject, 
    text: body
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
}

function progressEmail(netId, className, transcriptionCount) {
  var emailSuffix = '@illinois.edu';
  var subject = className + ' Class Transcribe Progress';
  var body = [
    'Hi,',
    'You have completed ' + transcriptionCount + ' transcriptions for ' + className + '.',
    'If you have any questions/concerns please email ' + mailID + '.',
    'Thank you for participating!',
    'The Class Transcribe Team'
  ].join('\n\n');
  sendEmail(netId + emailSuffix, subject, body);
}

module.exports = {
  sendEmail: sendEmail,
  progressEmail: progressEmail
};
