const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
var appDir = path.dirname(require.main.filename);

module.exports = async (req, res) => {
  const authNum = Math.random().toString().substr(2, 6);
  let emailTemplete;
  ejs.renderFile(appDir + '/template/authMail.ejs', { authCode: authNum }, (err, data) => {
    if (err) {
      console.log(err);
    }
    emailTemplete = data;
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  });

  const mailOptions = await transporter.sendMail({
    from: `test`,
    to: req.body.email,
    subject: '회원가입을 위한 인증번호를 입력해주세요.',
    html: emailTemplete
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    console.log('Finish sending email : ' + info.response);
    res.send(authNum);
    transporter.close();
  });
};