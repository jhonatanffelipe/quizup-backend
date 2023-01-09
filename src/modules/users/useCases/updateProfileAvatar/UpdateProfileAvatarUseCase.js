const AppError = require('../../../../shared/infra/http/errors/AppError');
const LocalStorageProvider = require('../../../../shared/providers/StorageProvider/LocalStorageProvider');
const UsersRepository = require('../../infra/knex/repositories/UsersRepository');

class UpdateProfileAvatarUseCase {
  constructor() {
    this.usersRepository = new UsersRepository();
    this.storageProvider = new LocalStorageProvider();
  }

  async execute({ userId, avatarFile }) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Token inválido!', 401);
    }

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar');
    }

    await this.storageProvider.save(avatarFile, 'avatar');

    await this.usersRepository.update({
      id: user.id,
      avatar: avatarFile,
    });
  }
}

module.exports = UpdateProfileAvatarUseCase;
