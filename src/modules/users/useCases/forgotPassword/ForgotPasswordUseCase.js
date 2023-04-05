const path = require('path');

const AppError = require('../../../../shared/infra/http/errors/AppError');
const EtherealMailProvider = require('../../../../shared/providers/MailProvider/EtherealMailProvider');
const GoogleMailProvider = require('../../../../shared/providers/MailProvider/GoogleMailProvider');
const UuidProvider = require('../../../../shared/providers/TokenProvider/UuidProvider');
const ResetPasswordTokensRepository = require('../../infra/knex/repositories/ResetPasswordTokensRepository');
const UsersRepository = require('../../infra/knex/repositories/UsersRepository');

class ForgotPasswordUseCase {
  provider = process.env.MAIL_PROVIDER;

  constructor() {
    this.usersRepository = new UsersRepository();
    this.mailProvider = this.provider === 'gmail' ? new GoogleMailProvider() : new EtherealMailProvider();
    this.resetPasswordTokensRepository = new ResetPasswordTokensRepository();
    this.tokenProvider = new UuidProvider();
  }

  async execute({ email }) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário não encontrato.');
    }

    const token = this.tokenProvider.generate();

    await this.resetPasswordTokensRepository.deleteByUserId(user.id);

    await this.resetPasswordTokensRepository.generateToken({ userId: user.id, token });

    if (!token) {
      throw new AppError('Não foi possível realiza a solicitação de troca de senha, por favor contato no suporte.');
    }

    const forgotPasswordTemplate = path.resolve(__dirname, '..', '..', 'views', 'forgotPassword.hbs');

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[QuizUp] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.FRONTEND_APP_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}

module.exports = ForgotPasswordUseCase;
