const nodemailer = require('nodemailer');

const HandlebarsMailTemplateProvider = require('../MailTemplateProvider/HandlebarsMailTemplateProvider');

class GoogleMailProvider {
  client;

  pass = process.env.GMAIL_PASSWORD;

  user = process.env.GMAIL_USER;

  constructor() {
    this.mailTemplateProvider = new HandlebarsMailTemplateProvider();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });
    this.client = transporter;
  }

  async sendMail({ to, from, templateData, subject }) {
    await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Turtle Quiz',
        address: from?.email || 'equipe@turtlesys.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}

module.exports = GoogleMailProvider;
