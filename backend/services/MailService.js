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

// !!!!!! после тестирования заменить почту на user.email во всех рассылках

  sendActivationMail(user) {
    const mailtext = `
    <body>
      <table style="color:#394650; max-width: 420px; width: 100%; font-family: Verdana, Geneva, sans-serif; margin: 0 auto;">
        <tbody>
          <tr>
            <td>
              <h1 style="font-size:26px; margin: 20px 0;">Здравствуйте, ${user.name}!</h1>
            </td>
          </tr>
          <tr>
            <td>
              <p style="color:#394650; font-size:16px">Вы стали зарегистрированным пользователем HomUnion. Мы рады приветствовать вас в нашем сообществе людей, которые любят свою семью и интересуются ее историей! Впереди вас ждет много интересного!</p>
              <p style="color:#394650; font-size:16px">Для активации аккаунта перейдите по ссылке:
              <a target="_blank" style="display: block; margin-top: 10px; max-width: 420px; width: 100%; border-radius: 5px; font-size:16px; background-color: #D89540; color:#E7E6E9; text-decoration:none; text-align: center; padding: 10px; box-shadow: 5px 5px 5px #394650" href="${user.activationlink}">Подтвердить email</a>
              </p>
            </td>
          </tr>
          <tr>
            <td>
                <p style="font-size:12px">Вы получили это письмо, потому что кто-то оставил ваш адрес для регистрации на сайте ${FRONT_ORIGIN}</p>
                <p style="font-size:12px">Пожалуйста, не отвечайте на данное сообщение. Рассылка осуществляется автоматически. Если вы не регистрировались на сайте HomUnion, просто проигнорируйте данное письмо.</p>
            </td>
          </tr>
          <tr>
        </tbody>
      </table>
    </body>
  `
// !!!!!! после тестирования заменить почту на user.email
    this.transporter.sendMail({
      from: APP_USER,
      to: 'eccehomo.memories@gmail.com',
      subject: 'Активация аккаунта на сайте HomUnion',
      html: mailtext
    })
    return(user)
  }


  sendRefreshPassMail(user) {
    const mailtext = `
    <body>
      <table style="color:#394650; max-width: 420px; width: 100%; font-family: Verdana, Geneva, sans-serif; margin: 0 auto;">
        <tbody>
          <tr>
            <td>
              <h1 style="font-size:26px; margin: 20px 0;">Здравствуйте, ${user.name}!</h1>
            </td>
          </tr>
          <tr>
            <td>
              <p style="color:#394650; font-size:16px">Вы запросили сброс пароля на сайте HomUnion. Если вы этого не делали, рекомендуем проверить надежность установленнного пароля и изменить его в настройках пользователя на сайте. </p>
              <p style="color:#394650; font-size:16px">Для сброса пароля перейдите по ссылке:
              <a target="_blank" style="display: block; margin-top: 10px; max-width: 420px; width: 100%; border-radius: 5px; font-size:16px; background-color: #D89540; color:#E7E6E9; text-decoration:none; text-align: center; padding: 10px; box-shadow: 5px 5px 5px #394650" href="${user.refreshlink}">Сбросить пароль</a>
              </p>
            </td>
          </tr>
          <tr>
            <td>
                <p style="font-size:12px">Вы получили это письмо, потому что зарегистрированы на сайте ${FRONT_ORIGIN}</p>
                <p style="font-size:12px">Пожалуйста, не отвечайте на данное сообщение. Рассылка осуществляется автоматически.</p>
            </td>
          </tr>
          <tr>
        </tbody>
      </table>
    </body>
  `
// !!!!!! после тестирования заменить почту на user.email
    this.transporter.sendMail({
      from: APP_USER,
      to: 'eccehomo.memories@gmail.com',
      subject: 'Восстановленние пароля на сайте HomUnion',
      html: mailtext
    })
    return(user)
  }


}

module.exports = new MailService;
