const nodemailer = require('nodemailer');
const { SMTP_HOST, SMTP_PORT, APP_USER, APP_PASS,  FRONT_ORIGIN } = process.env;

class MailService{
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      service: 'gmail',
      auth: {
        user: APP_USER,
        pass: APP_PASS
      }
    });

  }

// !!!!!! после тестирования заменить почту на user.email
  sendActivationMail(user) {
    this.transporter.sendMail({
      from: APP_USER,
      to: 'eccehomo.memories@gmail.com',
      subject: 'Активация аккаунта на сайте ' + FRONT_ORIGIN,
      text: `Для активации аккаунта перейдите по ссылке: ${user.activationlink}`,
    })
    return(user)
  }
}

module.exports = new MailService;
