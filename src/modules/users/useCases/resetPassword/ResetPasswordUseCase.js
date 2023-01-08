const AppError = require('../../../../shared/infra/http/errors/AppError');
const MomentDateProvider = require('../../../../shared/providers/DateProvider/MomentDateProvider');
const BCryptProvider = require('../../../../shared/providers/HashProvider/BCryptProvider');
const ResetPasswordTokensRepository = require('../../infra/knex/repositories/ResetPasswordTokensRepository');
const UsersRepository = require('../../infra/knex/repositories/UsersRepository');
const UsersTokensRepository = require('../../infra/knex/repositories/UsersTokensRepository');

class ResetPasswordUseCase {
  constructor() {
    this.usersRepository = new UsersRepository();
    this.resetPasswordTokensRepository = new ResetPasswordTokensRepository();
    this.usersTokensRepository = new UsersTokensRepository();
    this.dateProvider = new MomentDateProvider();
    this.hashProvider = new BCryptProvider();
  }

  async execute({ token, password, confirmPassword }) {
    const resetPasswordToken = await this.resetPasswordTokensRepository.findByToken(token);

    if (!resetPasswordToken) {
      throw new AppError('O link para alterar a senha é inválido.', 400);
    }

    const generatedTo = this.dateProvider.compareInHours(new Date(), resetPasswordToken?.createdAt);

    if (generatedTo > 2) {
      throw new AppError('O link para alterar a senha expirou.', 400);
    }

    if (password !== confirmPassword) {
      throw new AppError(
        'Nova senha informada não é iguail a confirmação, por favor verifique e tente novamente.',
        400,
      );
    }

    const user = await this.usersRepository.findById(String(resetPasswordToken.user?.id));

    if (!user) {
      throw new AppError('Usuário não encontrado.', 400);
    }

    const passwordHashed = await this.hashProvider.hashPassword(password);

    user.password = passwordHashed;

    await this.usersRepository.update(user);

    await this.resetPasswordTokensRepository.deleteByUserId(String(user.id));
    await this.usersTokensRepository.deleteByUserId(String(user.id));
  }
}

module.exports = ResetPasswordUseCase;
