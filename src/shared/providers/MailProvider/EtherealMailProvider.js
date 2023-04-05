const nodemailer = require('nodemailer');
const HandlebarsMailTemplateProvider = require('../MailTemplateProvider/HandlebarsMailTemplateProvider');

class EtherealMailProvider {
  client;

  constructor() {
    this.mailTemplateProvider = new HandlebarsMailTemplateProvider();
  }

  async sendMail({ to, from, subject, templateData }) {
    this.client = await nodemailer.createTestAccount().then(async account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      return transporter;
    });

    const html = await this.mailTemplateProvider.parse(templateData);

    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe QuizUp',
        address: from?.email || 'equipe@quizup.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html,
    });

    // eslint-disable-next-line no-console
    console.log('Message sent: %s', message.messageId);
    // eslint-disable-next-line no-console
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

module.exports = EtherealMailProvider;
