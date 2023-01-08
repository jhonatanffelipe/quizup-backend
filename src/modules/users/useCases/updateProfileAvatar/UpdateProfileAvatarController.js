const UpdateProfileAvatarUseCase = require('./UpdateProfileAvatarUseCase');

class UpdateProfileAvatarController {
  async handle(request, response) {
    const { id } = request.user;
    const avatarFile = request.file?.filename || '';

    const updateProfileAvatarUseCase = new UpdateProfileAvatarUseCase();

    const user = await updateProfileAvatarUseCase.execute({ userId: id, avatarFile });

    return response.json(user);
  }
}

module.exports = UpdateProfileAvatarController;
